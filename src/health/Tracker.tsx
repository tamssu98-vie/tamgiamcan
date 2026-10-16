import React, { useEffect, useState } from 'react';
import { todayStr, HealthStore } from './store';

const STEPS_TARGET = 8000;
const num = (v: any) => (v === '' || v === undefined || v === null || isNaN(Number(v)) ? undefined : Number(v));
const card = 'bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-950/5 border border-white/80 p-5 sm:p-6 space-y-4';
const input = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400';
const btn = 'px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700';
const btn2 = 'px-3 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200';

// Ngưỡng tham khảo người lớn (đơn vị mmol/L như phiếu xét nghiệm phổ biến ở VN). Hãy theo kết luận của bác sĩ.
const LABS = [
  { key: 'alt', label: 'ALT (GPT)', unit: 'U/L', max: 40 },
  { key: 'ast', label: 'AST (GOT)', unit: 'U/L', max: 40 },
  { key: 'ggt', label: 'GGT', unit: 'U/L', max: 55 },
  { key: 'tg', label: 'Triglyceride', unit: 'mmol/L', max: 1.7 },
  { key: 'chol', label: 'Cholesterol TP', unit: 'mmol/L', max: 5.2 },
  { key: 'ldl', label: 'LDL-C', unit: 'mmol/L', max: 3.4 },
  { key: 'hdl', label: 'HDL-C', unit: 'mmol/L', min: 1.0 },
  { key: 'glucose', label: 'Đường huyết đói', unit: 'mmol/L', max: 5.6 },
  { key: 'hba1c', label: 'HbA1c', unit: '%', max: 5.7 }
];
const labOk = (l: any, v: number) => (l.max !== undefined ? v <= l.max : v >= l.min);

// Biểu đồ đường đơn giản bằng SVG
function LineChart({ pts, refs = [], unit }: { pts: { date: string; y: number }[]; refs?: { y: number; label: string; color: string }[]; unit: string }) {
  if (pts.length < 2) return <p className="text-sm text-slate-500">Cần ít nhất 2 lần ghi để vẽ biểu đồ.</p>;
  const W = 600, H = 190, P = 34;
  const t = pts.map((p) => new Date(p.date).getTime());
  const t0 = t[0], t1 = t[t.length - 1] || t0 + 1;
  const ys = [...pts.map((p) => p.y), ...refs.map((r) => r.y)];
  const lo = Math.min(...ys) - 0.5, hi = Math.max(...ys) + 0.5;
  const X = (v: number) => P + ((v - t0) / (t1 - t0 || 1)) * (W - 2 * P);
  const Y = (v: number) => H - P - ((v - lo) / (hi - lo || 1)) * (H - 2 * P);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {refs.map((r) => (
        <g key={r.label}>
          <line x1={P} x2={W - P} y1={Y(r.y)} y2={Y(r.y)} stroke={r.color} strokeDasharray="5 4" />
          <text x={W - P} y={Y(r.y) - 3} fontSize="10" textAnchor="end" fill={r.color}>{r.label}</text>
        </g>
      ))}
      <polyline fill="none" stroke="#059669" strokeWidth="2.5" points={pts.map((p, i) => `${X(t[i])},${Y(p.y)}`).join(' ')} />
      {pts.map((p, i) => (
        <circle key={p.date} cx={X(t[i])} cy={Y(p.y)} r="3.5" fill="#059669"><title>{`${p.date}: ${p.y} ${unit}`}</title></circle>
      ))}
      <text x={X(t[0])} y={Y(pts[0].y) - 8} fontSize="11" fill="#334155">{pts[0].y}</text>
      <text x={X(t[t.length - 1])} y={Y(pts[pts.length - 1].y) - 8} fontSize="11" textAnchor="end" fontWeight="bold" fill="#334155">{pts[pts.length - 1].y} {unit}</text>
      <text x={P} y={H - 8} fontSize="10" fill="#94a3b8">{pts[0].date}</text>
      <text x={W - P} y={H - 8} fontSize="10" textAnchor="end" fill="#94a3b8">{pts[pts.length - 1].date}</text>
    </svg>
  );
}

const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : undefined);
const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

type Props = {
  store: HealthStore;
  targetCalories: number;
  milestone1Weight: number;
  milestone2Weight: number;
  builder: { kcal: number; protein: number; carb: number; fat: number };
};

export default function Tracker({ store, targetCalories, milestone1Weight, milestone2Weight, builder }: Props) {
  const [date, setDate] = useState(todayStr());
  const [f, setF] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState('');
  const [labDate, setLabDate] = useState(todayStr());
  const [lf, setLf] = useState<Record<string, string>>({});
  const [conn, setConn] = useState({ url: store.url, token: store.token });
  const [msg, setMsg] = useState('');

  const day = store.get('daily', date);
  useEffect(() => {
    const d = store.get('daily', date) || {};
    setF({
      weight: d.weight ?? '', steps: d.steps ?? '', note: d.note ?? ''
    });
  }, [date]); // eslint-disable-line

  const set = (key: string, v: string) => setF((p) => ({ ...p, [key]: v }));

  const save = () => {
    store.upsert('daily', date, {
      weight: num(f.weight), steps: num(f.steps), note: f.note || ''
    });
    setSaved('Đã lưu ' + new Date().toLocaleTimeString('vi-VN'));
  };


  const saveBuilder = () => {
    store.upsert('daily', date, { kcal: builder.kcal, protein: builder.protein, carb: builder.carb, fat: builder.fat });
    setSaved(`Đã lưu bữa đang dựng (${builder.kcal} kcal) vào ${date}`);
  };

  const days = store.list('daily') as any[];
  const withKey = (key: string) => days.filter((d) => num(d[key]) !== undefined).map((d) => ({ date: d.date, y: Number(d[key]) }));
  const weights = withKey('weight');

  // Tuần này (7 ngày gần nhất) so với tuần trước
  const inRange = (from: number, to: number) => days.filter((d) => d.date <= daysAgo(from) && d.date > daysAgo(to));
  const wk = inRange(0, 7), prev = inRange(7, 14);
  const wAvg = avg(wk.map((d) => d.weight).filter((v) => v !== undefined));
  const pAvg = avg(prev.map((d) => d.weight).filter((v) => v !== undefined));
  const stepDays = wk.filter((d) => (d.steps || 0) >= STEPS_TARGET).length;
  const kcalAvg = avg(wk.map((d) => d.kcal).filter((v) => v !== undefined));
  const last7 = Array.from({ length: 7 }, (_, i) => daysAgo(6 - i)).map((dt) => days.find((d) => d.date === dt) || { date: dt });

  const labs = (store.list('lab') as any[]).slice().reverse();
  const saveLab = () => {
    const data: Record<string, any> = { note: lf.note || '' };
    LABS.forEach((l) => (data[l.key] = num(lf[l.key])));
    store.upsert('lab', labDate, data);
    setLf({});
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([store.exportJson()], { type: 'application/json' }));
    a.download = `tamgiamcan-${todayStr()}.json`;
    a.click();
  };
  const upload = (file?: File) => {
    if (!file) return;
    file.text().then((t) => {
      try { setMsg(`Đã nhập ${store.importJson(t)} bản ghi.`); } catch (e: any) { setMsg('Lỗi: ' + e.message); }
    });
  };

  return (
    <section className="space-y-6">
      {/* Nhật ký ngày */}
      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-extrabold text-slate-800">Nhật ký sức khỏe</h2>
          <input type="date" value={date} max={todayStr()} onChange={(e) => e.target.value && setDate(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            ['weight', 'Cân nặng (kg)'], ['steps', `Bước chân (mục tiêu ${STEPS_TARGET})`]
          ].map(([key, label]) => (
            <label key={key} className="text-xs font-semibold text-slate-600 space-y-1 block">
              {label}
              <input type="number" inputMode="decimal" step="any" value={f[key] ?? ''} onChange={(e) => set(key, e.target.value)} className={input} />
            </label>
          ))}
        </div>
        <label className="text-xs font-semibold text-slate-600 space-y-1 block">
          Ghi chú / cảm nhận
          <textarea rows={2} value={f.note ?? ''} onChange={(e) => set('note', e.target.value)} className={input} />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button className={btn} onClick={save}>Lưu ngày {date}</button>
          <button className={btn2} onClick={saveBuilder} title="Lấy tổng calo của bữa đang dựng ở tab 3">
            Lưu bữa đang dựng ({builder.kcal} kcal) vào ngày này
          </button>
          {saved && <span className="text-xs text-emerald-700">{saved}</span>}
        </div>
        {day?.kcal !== undefined && (
          <p className="text-sm text-slate-600">
            Đã ăn: <b>{day.kcal} kcal</b> / mục tiêu {targetCalories} (đạm {day.protein}g, carb {day.carb}g, béo {day.fat}g)
          </p>
        )}
      </div>

      {/* Nhìn lại tuần */}
      <div className={card}>
        <h2 className="text-lg font-extrabold text-slate-800">Tuần vừa qua</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div className="bg-slate-50 rounded-xl p-3">Cân TB<br /><b className="text-lg">{wAvg ? wAvg.toFixed(1) + ' kg' : '—'}</b>
            <div className="text-xs text-slate-500">{wAvg && pAvg ? `${wAvg - pAvg > 0 ? '+' : ''}${(wAvg - pAvg).toFixed(1)} kg so với tuần trước` : ''}</div></div>
          <div className="bg-slate-50 rounded-xl p-3">Đủ bước<br /><b className="text-lg">{stepDays}/7 ngày</b></div>
          <div className="bg-slate-50 rounded-xl p-3">Calo TB ăn vào<br /><b className="text-lg">{kcalAvg ? Math.round(kcalAvg) : '—'}</b>
            </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500">
          {last7.map((d: any) => {
            const ps = Math.min(100, ((d.steps || 0) / STEPS_TARGET) * 100);
            return (
              <div key={d.date} className="space-y-1">
                <div className="h-16 flex items-end justify-center gap-1">
                  <div className="w-3 bg-amber-400 rounded-t" style={{ height: ps * 0.6 + 'px' }} title={`Bước ${d.steps || 0}`} />
                </div>
                {d.date.slice(5)}
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500">Cột cam: bước chân (so với mục tiêu).</p>
      </div>

      {/* Biểu đồ */}
      <div className={card}>
        <h2 className="text-lg font-extrabold text-slate-800">Cân nặng</h2>
        <LineChart pts={weights} unit="kg" refs={[
          { y: milestone1Weight, label: `Mốc -5%: ${milestone1Weight}kg`, color: '#d97706' },
          { y: milestone2Weight, label: `Mốc -10%: ${milestone2Weight}kg`, color: '#2563eb' }
        ]} />
      </div>

      {/* Xét nghiệm */}
      <div className={card}>
        <h2 className="text-lg font-extrabold text-slate-800">Xét nghiệm gan & mỡ máu</h2>
        <p className="text-xs text-slate-500">Ngưỡng chỉ để tham khảo (người lớn); hãy theo kết luận của bác sĩ. Bỏ trống chỉ số không có.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <label className="text-xs font-semibold text-slate-600 space-y-1 block">Ngày xét nghiệm
            <input type="date" value={labDate} max={todayStr()} onChange={(e) => e.target.value && setLabDate(e.target.value)} className={input} /></label>
          {LABS.map((l) => (
            <label key={l.key} className="text-xs font-semibold text-slate-600 space-y-1 block">{l.label} ({l.unit})
              <input type="number" inputMode="decimal" step="any" value={lf[l.key] ?? ''} onChange={(e) => setLf((p) => ({ ...p, [l.key]: e.target.value }))} className={input} /></label>
          ))}
        </div>
        <input placeholder="Ghi chú (nơi khám, siêu âm gan...)" value={lf.note ?? ''} onChange={(e) => setLf((p) => ({ ...p, note: e.target.value }))} className={input} />
        <button className={btn} onClick={saveLab}>Lưu kết quả xét nghiệm</button>
        {labs.length === 0 && <p className="text-sm text-slate-500">Chưa có kết quả nào.</p>}
        <div className="overflow-x-auto">
          {labs.length > 0 && (
            <table className="w-full text-xs">
              <thead><tr className="text-left text-slate-500"><th className="py-1 pr-2">Ngày</th>{LABS.map((l) => <th key={l.key} className="px-1">{l.label.split(' ')[0]}</th>)}<th /></tr></thead>
              <tbody>
                {labs.map((r: any) => (
                  <tr key={r.date} className="border-t border-slate-100">
                    <td className="py-1 pr-2 font-semibold whitespace-nowrap">{r.date}</td>
                    {LABS.map((l) => {
                      const v = r[l.key];
                      return <td key={l.key} className={`px-1 ${v === undefined ? 'text-slate-300' : labOk(l, v) ? 'text-emerald-700' : 'text-rose-600 font-bold'}`}>{v ?? '–'}</td>;
                    })}
                    <td><button className="text-slate-400 hover:text-rose-600" onClick={() => confirm('Xóa kết quả ngày ' + r.date + '?') && store.remove('lab', r.date)}>Xóa</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Cài đặt */}
      <div className={card}>
        <h2 className="text-lg font-extrabold text-slate-800">Đồng bộ & sao lưu</h2>
        <p className="text-xs text-slate-500">Dữ liệu luôn lưu trên máy này. Dán URL Apps Script + mã khóa để đồng bộ Google Sheets giữa điện thoại và máy tính.</p>
        <input placeholder="URL ứng dụng web (https://script.google.com/macros/s/.../exec)" value={conn.url} onChange={(e) => setConn({ ...conn, url: e.target.value })} className={input} />
        <input type="password" placeholder="Mã khóa (TOKEN)" value={conn.token} onChange={(e) => setConn({ ...conn, token: e.target.value })} className={input} />
        <div className="flex flex-wrap gap-2 items-center">
          <button className={btn} onClick={() => { store.setConn(conn.url, conn.token); setTimeout(store.sync, 50); }}>Lưu & đồng bộ</button>
          <button className={btn2} onClick={download}>Xuất file JSON</button>
          <label className={btn2 + ' cursor-pointer'}>Nhập file JSON
            <input type="file" accept="application/json" className="hidden" onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
          <button className={btn2} onClick={() => confirm('Xóa toàn bộ dữ liệu trên thiết bị này? (Dữ liệu trên Sheet không bị xóa)') && store.clearLocal()}>Xóa dữ liệu trên máy</button>
        </div>
        {(store.status || msg) && <p className="text-xs text-slate-600">{store.status} {msg}</p>}
      </div>
    </section>
  );
}
