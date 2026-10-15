import { useCallback, useEffect, useRef, useState } from 'react';

export type Kind = 'daily' | 'lab';
export type Rec = { kind: Kind; date: string; data: Record<string, any>; updatedAt: number };
type State = { records: Record<string, Rec>; url: string; token: string; lastSync: number };

const KEY = 'tamgiamcan:health';
const empty: State = { records: {}, url: '', token: '', lastSync: 0 };
const k = (kind: Kind, date: string) => `${kind}|${date}`;

export const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const load = (): State => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...empty, ...JSON.parse(raw) };
  } catch {}
  return empty;
};

// Bản ghi mới hơn (updatedAt lớn hơn) thắng
const merge = (local: Record<string, Rec>, incoming: Rec[]) => {
  const out = { ...local };
  for (const r of incoming || []) {
    const key = k(r.kind, r.date);
    if (!out[key] || r.updatedAt > out[key].updatedAt) out[key] = r;
  }
  return out;
};

export function useHealthStore() {
  const [s, setS] = useState<State>(load);
  const [status, setStatus] = useState('');
  const [rev, setRev] = useState(0); // tăng khi người dùng sửa dữ liệu -> kích hoạt tự đồng bộ
  const ref = useRef(s);
  ref.current = s;

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {}
  }, [s]);

  const get = (kind: Kind, date: string) => {
    const r = s.records[k(kind, date)];
    return r && !r.data.deleted ? r.data : undefined;
  };

  const list = (kind: Kind) =>
    Object.values(s.records)
      .filter((r) => r.kind === kind && !r.data.deleted)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((r) => ({ date: r.date, ...r.data }));

  const upsert = (kind: Kind, date: string, patch: Record<string, any>) => {
    setS((p) => {
      const old = p.records[k(kind, date)];
      const data = { ...(old && !old.data.deleted ? old.data : {}), ...patch };
      return { ...p, records: { ...p.records, [k(kind, date)]: { kind, date, data, updatedAt: Date.now() } } };
    });
    setRev((n) => n + 1);
  };

  const remove = (kind: Kind, date: string) => {
    setS((p) => ({
      ...p,
      records: { ...p.records, [k(kind, date)]: { kind, date, data: { deleted: true }, updatedAt: Date.now() } }
    }));
    setRev((n) => n + 1);
  };

  const setConn = (url: string, token: string) => setS((p) => ({ ...p, url: url.trim(), token: token.trim() }));

  const sync = useCallback(async () => {
    const { url, token, records } = ref.current;
    if (!url || !token) return setStatus('Chưa cài đặt đồng bộ (URL + mã khóa).');
    setStatus('Đang đồng bộ...');
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // tránh preflight CORS
        body: JSON.stringify({ token, records: Object.values(records) })
      });
      const j = await res.json();
      if (j.error) throw new Error(j.error);
      setS((p) => ({ ...p, records: merge(p.records, j.records), lastSync: Date.now() }));
      setStatus('Đã đồng bộ ' + new Date().toLocaleTimeString('vi-VN'));
    } catch (e: any) {
      setStatus('Lỗi đồng bộ: ' + (e?.message || e) + ' (dữ liệu vẫn được giữ trên máy)');
    }
  }, []);

  // Đồng bộ khi mở app và 2 giây sau mỗi lần sửa
  useEffect(() => {
    if (!ref.current.url || !ref.current.token) return;
    const t = setTimeout(sync, rev === 0 ? 300 : 2000);
    return () => clearTimeout(t);
  }, [rev, sync]);

  const exportJson = () => JSON.stringify({ app: 'tamgiamcan', records: Object.values(s.records) }, null, 2);

  const importJson = (text: string) => {
    const j = JSON.parse(text);
    if (!Array.isArray(j.records)) throw new Error('File không đúng định dạng');
    setS((p) => ({ ...p, records: merge(p.records, j.records) }));
    setRev((n) => n + 1);
    return j.records.length as number;
  };

  const clearLocal = () => {
    setS((p) => ({ ...empty, url: p.url, token: p.token }));
  };

  return { url: s.url, token: s.token, status, get, list, upsert, remove, setConn, sync, exportJson, importJson, clearLocal };
}

export type HealthStore = ReturnType<typeof useHealthStore>;
