import React, { useMemo, useState } from 'react';
import { DISHES, MEAL_LABEL, TAG_LABEL, Meal, Tag } from './data/dishes';

import Card3D from './components/Card3D';

const chip = (on: boolean) =>
  `px-3 py-1.5 rounded-xl text-xs font-bold transition ${on ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`;
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();

// Thư viện món: lọc theo bữa, nhóm đạm, tìm theo tên hoặc nguyên liệu
export default function Recipes() {
  const [meal, setMeal] = useState<Meal | 'all'>('all');
  const [tag, setTag] = useState<Tag | 'all'>('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'default' | 'kcal' | 'time'>('default');

  const list = useMemo(() => {
    const k = norm(q.trim());
    const out = DISHES.filter(
      (d) =>
        (meal === 'all' || d.meal === meal) &&
        (tag === 'all' || d.tag === tag) &&
        (!k || norm(d.name + ' ' + d.ing.join(' ')).includes(k))
    );
    if (sort === 'kcal') out.sort((a, b) => a.kcal - b.kcal);
    if (sort === 'time') out.sort((a, b) => a.time - b.time);
    return out;
  }, [meal, tag, q, sort]);

  return (
    <section className="space-y-5">
      <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/80 p-5 space-y-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800">Thư viện {DISHES.length} món dễ nấu & healthy</h2>
          <p className="text-xs text-slate-500">
            Nguyên liệu chợ/siêu thị Việt Nam, nấu 5-30 phút. Số liệu tính cho 1 khẩu phần/1 người, mang tính ước tính; hãy điều chỉnh theo mục tiêu calo của bạn.
          </p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm món hoặc nguyên liệu (ví dụ: gà, cá rô phi, nấm...)"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <div className="flex flex-wrap gap-1.5">
          <button className={chip(meal === 'all')} onClick={() => setMeal('all')}>Tất cả bữa</button>
          {(Object.keys(MEAL_LABEL) as Meal[]).map((m) => (
            <button key={m} className={chip(meal === m)} onClick={() => setMeal(m)}>{MEAL_LABEL[m]}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button className={chip(tag === 'all')} onClick={() => setTag('all')}>Mọi nhóm đạm</button>
          {(Object.keys(TAG_LABEL) as Tag[]).map((t) => (
            <button key={t} className={chip(tag === t)} onClick={() => setTag(t)}>{TAG_LABEL[t]}</button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>{list.length} món</span>
          <label className="flex items-center gap-1.5">
            Sắp xếp:
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border border-slate-200 rounded-lg px-2 py-1">
              <option value="default">Mặc định</option>
              <option value="kcal">Ít calo trước</option>
              <option value="time">Nấu nhanh trước</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {list.map((d) => (
          <Card3D key={d.id} maxTilt={6} className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 flex flex-col gap-2.5 hover:border-emerald-400 transition-all shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{MEAL_LABEL[d.meal]}</span>
              <span className="text-xs font-extrabold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">{d.kcal} kcal</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 leading-snug">{d.name}</h3>
            <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-3">
              <span>⏱ {d.time} phút</span>
              <span>Đạm {d.p}g</span>
              <span>Carb {d.c}g</span>
              <span>Béo {d.f}g</span>
            </div>
            <div className="text-xs text-slate-600 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100">
              <strong className="text-slate-700">Nguyên liệu: </strong>
              {d.ing.join(' • ')}
            </div>
          </Card3D>
        ))}
        {list.length === 0 && <p className="text-sm text-slate-500">Không có món nào khớp bộ lọc.</p>}
      </div>
    </section>
  );
}
