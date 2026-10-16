import React from 'react';
import {
  Utensils,
  Coffee,
  Calendar,
  Activity,
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Salad
} from 'lucide-react';
import Card3D from './Card3D';

interface DiningTableProps {
  onSelectPlate: (plateId: '30days' | 'office_dining' | 'builder' | 'tracker') => void;
  dishCount: number;
  targetCalories: number;
}

export default function DiningTable({
  onSelectPlate,
  dishCount,
  targetCalories
}: DiningTableProps) {
  const plates = [
    {
      id: '30days' as const,
      name: `Thư Viện ${dishCount} Món Dễ Nấu`,
      subtitle: 'Đĩa Món Chính & Thực Đơn 30 Ngày',
      desc: 'Món ăn thuần Việt nấu 5 - 30 phút. Phân nhóm đạm cá, gà, bò, nấm, đậu phụ. Tự động quy đổi calo theo cơ thể.',
      badge: 'MỚI • 110 MÓN',
      badgeColor: 'bg-emerald-500 text-white shadow-emerald-500/30',
      icon: Calendar,
      themeColor: 'from-emerald-500/10 via-teal-500/5 to-white',
      borderColor: 'border-emerald-200 hover:border-emerald-400',
      accentText: 'text-emerald-700',
      dishIllustration: '🍲',
      dishHighlights: ['Rau củ tươi & đạm nạc', '4 bữa chuẩn calo', 'Nấu nhanh tiện lợi'],
      actionLabel: 'Mở Đĩa Thư Viện Món'
    },
    {
      id: 'office_dining' as const,
      name: 'Ăn Vặt Công Sở & Hàng Quán',
      subtitle: 'Khay Bento Ăn Xế & Mẹo Gọi Món Ngoài',
      desc: 'Giải pháp chống đói 16h chiều không làm tăng mỡ gan. Mẹo order giảm 250 – 450 kcal khi ăn ngoài cùng đồng nghiệp.',
      badge: 'HOT • ORDER HACK',
      badgeColor: 'bg-amber-500 text-slate-950 shadow-amber-500/30 font-black',
      icon: Coffee,
      themeColor: 'from-amber-500/10 via-orange-500/5 to-white',
      borderColor: 'border-amber-200 hover:border-amber-400',
      accentText: 'text-amber-800',
      dishIllustration: '🍱',
      dishHighlights: ['Hạt, sữa hạt & cà phê', 'Hack quán bún / phở', 'Bù trừ bữa tối'],
      actionLabel: 'Mở Khay Ăn Vặt & Quán'
    },
    {
      id: 'builder' as const,
      name: 'Tự Lắp Ghép Bữa Ăn & Đèn Giao Thông',
      subtitle: 'Đĩa Ăn 4 Ngăn Chuẩn Y Khoa',
      desc: 'Tự chọn món ghép thành thực đơn chuẩn calo. Kèm cẩm nang Đèn Xanh (ăn tự do) - Đèn Vàng - Đèn Đỏ cần kiêng kỵ.',
      badge: `MỤC TIÊU ${targetCalories} KCAL`,
      badgeColor: 'bg-teal-500 text-white shadow-teal-500/30',
      icon: Utensils,
      themeColor: 'from-sky-500/10 via-teal-500/5 to-white',
      borderColor: 'border-sky-200 hover:border-sky-400',
      accentText: 'text-teal-800',
      dishIllustration: '🥗',
      dishHighlights: ['Đĩa chia 4 ngăn Macro', 'Thanh đo Calo tức thì', 'Đèn Giao Thông Gan'],
      actionLabel: 'Mở Đĩa Tự Lắp Ghép'
    },
    {
      id: 'tracker' as const,
      name: 'Nhật Ký & Theo Dõi Sức Khỏe',
      subtitle: 'Khay Chỉ Số Y Khoa Của Tôi',
      desc: 'Biểu đồ diễn tiến cân nặng, ghi nhận men gan ALT / AST / GGT, huyết áp, đường huyết đói và 2 cột mốc vàng phục hồi mỡ gan.',
      badge: 'Y KHOA & TIẾN ĐỘ',
      badgeColor: 'bg-indigo-500 text-white shadow-indigo-500/30',
      icon: Activity,
      themeColor: 'from-indigo-500/10 via-sky-500/5 to-white',
      borderColor: 'border-indigo-200 hover:border-indigo-400',
      accentText: 'text-indigo-800',
      dishIllustration: '📋',
      dishHighlights: ['Theo dõi cân nặng', 'Chỉ số men gan ALT/AST', '2 Cột mốc phục hồi'],
      actionLabel: 'Mở Khay Theo Dõi'
    }
  ];

  return (
    <section className="relative w-full py-4 space-y-6">
      {/* Khung Bàn Ăn Lớn 3D Tabletop */}
      <div className="dining-table-surface rounded-[2.5rem] p-6 sm:p-10 border-2 border-white/90 shadow-2xl overflow-hidden relative">
        {/* Trang trí hoa văn bàn ăn & Ánh đèn Spotlight trung tâm */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-b from-white/80 via-emerald-100/30 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Tiêu đề Bàn Ăn */}
        <div className="relative text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/10 border border-emerald-600/20 text-emerald-800 text-xs font-bold mb-3">
            <Salad className="w-4 h-4 text-emerald-600" />
            <span>BÀN ĂN DINH DƯỠNG 3D • NUTRI-TABLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Chọn Một Đĩa Ăn Để Mở & Thao Tác
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Mỗi đĩa ăn trên bàn đại diện cho một phân hệ chăm sóc gan và giảm cân. Nhấp chuột vào đĩa bất kỳ để mở ra xem chi tiết!
          </p>
        </div>

        {/* 4 Chiếc Đĩa Ăn 3D Trên Bàn (2x2 Grid) */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plates.map((plate) => {
            const Icon = plate.icon;
            return (
              <Card3D
                key={plate.id}
                maxTilt={8}
                scale={1.02}
                onClick={() => onSelectPlate(plate.id)}
                className={`cursor-pointer plate-3d p-6 sm:p-7 flex flex-col justify-between group ${plate.borderColor}`}
              >
                <div>
                  {/* Hàng trên cùng của đĩa: Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">
                      {plate.dishIllustration}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-sm ${plate.badgeColor}`}
                    >
                      {plate.badge}
                    </span>
                  </div>

                  {/* Lòng đĩa (Plate Inner Well) */}
                  <div className="plate-inner-well bg-gradient-to-br from-white/95 to-slate-50/90 rounded-2xl p-4 sm:p-5 mb-4 space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {plate.subtitle}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {plate.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {plate.desc}
                    </p>

                    {/* Điểm nhấn nổi bật trên đĩa */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {plate.dishHighlights.map((hl, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 text-slate-700 flex items-center gap-1 shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nút Nhấc Đĩa / Mở Đĩa */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-emerald-600" /> Nhấp để mở phần này
                  </span>
                  <button className="flex items-center gap-1.5 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 rounded-xl shadow-md group-hover:shadow-lg group-hover:translate-x-1 transition-all">
                    <span>{plate.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Thanh Mẹo Bàn Ăn bên dưới */}
        <div className="relative mt-10 max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-200/60 flex items-center justify-center gap-2 text-xs text-emerald-950 text-center shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Mẹo:</strong> Bạn có thể mở bất kỳ đĩa ăn nào và dùng thanh điều hướng đĩa trên cùng để chuyển đĩa nhanh bất cứ lúc nào!
          </span>
        </div>
      </div>
    </section>
  );
}
