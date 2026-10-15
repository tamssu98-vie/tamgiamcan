import React, { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  HeartPulse,
  Scale,
  Flame,
  Droplets,
  Utensils,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Calculator,
  Calendar,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  RefreshCw,
  Search,
  ChevronRight,
  Coffee,
  Fish,
  Wheat,
  Salad,
  Award,
  Clock,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  Hand,
  TrendingDown,
  ShoppingBag,
  Briefcase,
  Store,
  CheckSquare,
  Square,
  Zap,
  LayoutGrid,
  List,
  MessageSquareQuote,
  ArrowLeftRight
} from 'lucide-react';

// ==========================================
// 1. DỮ LIỆU THỰC PHẨM THUẦN VIỆT (Tính trên 1 khẩu phần chuẩn)
// ==========================================
const FOOD_DATABASE = [
  // Nhóm Tinh Bột Hấp Thu Chậm (Carbs)
  {
    id: 'c1',
    name: 'Cơm gạo lứt / gạo lứt trộn',
    category: 'carb',
    unit: '1 lưng bát (110g chín)',
    grams: 110,
    kcal: 125,
    carb: 26,
    protein: 2.8,
    fat: 1.0,
    fiber: 2.2,
    tag: 'Khuyên dùng'
  },
  {
    id: 'c2',
    name: 'Khoai lang luộc / hấp',
    category: 'carb',
    unit: '1 củ vừa (150g)',
    grams: 150,
    kcal: 130,
    carb: 30,
    protein: 2.4,
    fat: 0.2,
    fiber: 4.5,
    tag: 'Khuyên dùng'
  },
  {
    id: 'c4',
    name: 'Bún gạo lứt / Phở gạo lứt',
    category: 'carb',
    unit: '120g bún tươi (1 tô vừa)',
    grams: 120,
    kcal: 135,
    carb: 29,
    protein: 3.0,
    fat: 0.8,
    fiber: 2.0,
    tag: 'Khuyên dùng'
  },
  {
    id: 'c5',
    name: 'Bánh mì nguyên cám / Đen',
    category: 'carb',
    unit: '2 lát (65g)',
    grams: 65,
    kcal: 160,
    carb: 28,
    protein: 6.0,
    fat: 2.2,
    fiber: 4.0,
    tag: 'Tiện lợi'
  },
  {
    id: 'c6',
    name: 'Ngô (Bắp) ngọt luộc',
    category: 'carb',
    unit: '1 bắp vừa (120g hạt)',
    grams: 120,
    kcal: 115,
    carb: 25,
    protein: 3.8,
    fat: 1.4,
    fiber: 3.2,
    tag: 'Giàu xơ'
  },
  {
    id: 'c7',
    name: 'Cơm trắng (Ăn sau rau & đạm)',
    category: 'carb',
    unit: '1 lưng bát nhỏ (100g)',
    grams: 100,
    kcal: 130,
    carb: 28.5,
    protein: 2.6,
    fat: 0.3,
    fiber: 0.4,
    tag: 'Ăn vừa phải'
  },

  // Nhóm Đạm Nạc (Proteins)
  {
    id: 'p1',
    name: 'Ức gà phi lê (luộc / áp chảo)',
    category: 'protein',
    unit: '100g thịt sống (~1 lòng bàn tay)',
    grams: 100,
    kcal: 165,
    carb: 0,
    protein: 31.0,
    fat: 3.6,
    fiber: 0,
    tag: 'Đạm nạc vàng'
  },
  {
    id: 'p2',
    name: 'Cá thu (áp chảo / sốt cà)',
    category: 'protein',
    unit: '100g phi lê',
    grams: 100,
    kcal: 195,
    carb: 1.5,
    protein: 21.0,
    fat: 12.0,
    fiber: 0,
    tag: 'Giàu Omega-3'
  },
  {
    id: 'p3',
    name: 'Cá rô phi / Cá lóc hấp',
    category: 'protein',
    unit: '120g thịt cá',
    grams: 120,
    kcal: 150,
    carb: 0,
    protein: 28.0,
    fat: 3.5,
    fiber: 0,
    tag: 'Dễ tiêu hóa'
  },
  {
    id: 'p4',
    name: 'Đậu phụ trắng (luộc / hấp / sốt cà)',
    category: 'protein',
    unit: '1.5 bìa (150g)',
    grams: 150,
    kcal: 120,
    carb: 3.0,
    protein: 13.5,
    fat: 6.5,
    fiber: 1.5,
    tag: 'Tốt cho gan'
  },
  {
    id: 'p5',
    name: 'Tôm sú / Tôm thẻ / Mực ống hấp',
    category: 'protein',
    unit: '100g thịt tôm/mực',
    grams: 100,
    kcal: 99,
    carb: 0.2,
    protein: 24.0,
    fat: 0.3,
    fiber: 0,
    tag: 'Ít calo'
  },
  {
    id: 'p6',
    name: 'Trứng gà luộc',
    category: 'protein',
    unit: '1 quả (55g)',
    grams: 55,
    kcal: 78,
    carb: 0.6,
    protein: 6.5,
    fat: 5.3,
    fiber: 0,
    tag: 'Giàu Choline'
  },
  {
    id: 'p7',
    name: 'Thịt thăn heo / Thăn bò nạc',
    category: 'protein',
    unit: '100g thịt sống',
    grams: 100,
    kcal: 145,
    carb: 0,
    protein: 22.0,
    fat: 6.0,
    fiber: 0,
    tag: 'Tối đa 3 bữa/tuần'
  },
  {
    id: 'p8',
    name: 'Sữa đậu nành không đường',
    category: 'protein',
    unit: '1 ly (250ml)',
    grams: 250,
    kcal: 85,
    carb: 4.0,
    protein: 7.5,
    fat: 4.0,
    fiber: 1.5,
    tag: 'Đạm thực vật'
  },
  {
    id: 'p9',
    name: 'Sữa chua Hy Lạp / Không đường',
    category: 'protein',
    unit: '1 hộp (100g)',
    grams: 100,
    kcal: 65,
    carb: 4.5,
    protein: 6.0,
    fat: 2.5,
    fiber: 0,
    tag: 'Tốt cho đường ruột'
  },

  // Nhóm Rau Xanh & Trái Cây Ít Ngọt (Veggies & Fiber)
  {
    id: 'v1',
    name: 'Bông cải xanh (Súp lơ) luộc / hấp',
    category: 'veggie',
    unit: '1 đĩa vừa (200g)',
    grams: 200,
    kcal: 68,
    carb: 13.0,
    protein: 5.5,
    fat: 0.7,
    fiber: 5.2,
    tag: 'Giải độc gan'
  },
  {
    id: 'v2',
    name: 'Rau cải xanh / Cải bó xôi / Cải thìa',
    category: 'veggie',
    unit: '1 bát tô rau (200g)',
    grams: 200,
    kcal: 46,
    carb: 7.2,
    protein: 4.5,
    fat: 0.6,
    fiber: 4.8,
    tag: 'Khuyên dùng'
  },
  {
    id: 'v3',
    name: 'Rau muống / Đậu cô ve / Su su luộc',
    category: 'veggie',
    unit: '1 đĩa vừa (200g)',
    grams: 200,
    kcal: 54,
    carb: 10.0,
    protein: 4.0,
    fat: 0.4,
    fiber: 5.4,
    tag: 'Giàu chất xơ'
  },
  {
    id: 'v4',
    name: 'Canh bầu / Bí đao',
    category: 'veggie',
    unit: '1 bát canh (200g cái)',
    grams: 200,
    kcal: 36,
    carb: 7.5,
    protein: 1.6,
    fat: 0.2,
    fiber: 3.5,
    tag: 'Thanh nhiệt'
  },
  {
    id: 'v5',
    name: 'Salad dưa chuột, cà chua, xà lách & nấm',
    category: 'veggie',
    unit: '1 tô trộn (200g)',
    grams: 200,
    kcal: 42,
    carb: 8.0,
    protein: 2.5,
    fat: 0.4,
    fiber: 4.0,
    tag: 'Ăn đầu bữa'
  },
  {
    id: 'v6',
    name: 'Ổi giòn / Bưởi da xanh / Táo xanh',
    category: 'veggie',
    unit: '150g (1 quả ổi / 3 múi bưởi)',
    grams: 150,
    kcal: 60,
    carb: 14.5,
    protein: 1.2,
    fat: 0.2,
    fiber: 4.2,
    tag: 'Ít đường Fructose'
  },

  // Nhóm Chất Béo Tốt & Đồ Uống Hỗ Trợ (Healthy Fats)
  {
    id: 'f1',
    name: 'Dầu ô liu Extra Virgin / Dầu cải',
    category: 'fat',
    unit: '1 muỗng cà phê (5g - trộn/nấu)',
    grams: 5,
    kcal: 45,
    carb: 0,
    protein: 0,
    fat: 5.0,
    fiber: 0,
    tag: 'Giảm viêm gan'
  },
  {
    id: 'f2',
    name: 'Hạt hạnh nhân / Óc chó / Hạt điều mộc',
    category: 'fat',
    unit: '15g (~10-12 hạt)',
    grams: 15,
    kcal: 90,
    carb: 3.0,
    protein: 3.2,
    fat: 7.8,
    fiber: 1.8,
    tag: 'Vitamin E & Omega-3'
  },
  {
    id: 'f3',
    name: 'Quả bơ sáp tươi',
    category: 'fat',
    unit: '1/3 quả vừa (60g)',
    grams: 60,
    kcal: 96,
    carb: 5.0,
    protein: 1.2,
    fat: 8.8,
    fiber: 4.0,
    tag: 'Glutathione'
  },
  {
    id: 'f4',
    name: 'Cà phê đen nguyên chất không đường',
    category: 'fat',
    unit: '1 tách (150ml)',
    grams: 150,
    kcal: 5,
    carb: 1.0,
    protein: 0.2,
    fat: 0,
    fiber: 0,
    tag: 'Bảo vệ tế bào gan'
  }
];

// ==========================================
// 3. DỮ LIỆU MÓN ĂN VẶT VĂN PHÒNG CHUẨN GAN NHIỄM MỠ
// ==========================================
const BASE_SNACKS = [
  {
    id: 's1',
    name: 'Cà phê đen nguyên chất không đường (Americano / Đen đá)',
    category: 'drink',
    portion: '1 tách / ly (150 - 200ml)',
    kcal: 5,
    carb: 1,
    protein: 0.2,
    fat: 0,
    gi: 'GI = 0 (Không tăng đường huyết)',
    badge: 'Thức uống Vàng cho Gan',
    liverNote: 'Chứa Acid Chlorogenic, Kahweol và Cafestol giúp giảm men gan (ALT, AST), ức chế quá trình tích mỡ và chống xơ hóa gan. Uống 1-2 ly mỗi sáng/đầu giờ chiều (không đường, không sữa đặc).'
  },
  {
    id: 's2',
    name: 'Ổi lê / Ổi giòn tươi (Bỏ hạt, ăn cả vỏ)',
    category: 'crunchy',
    portion: '1 quả vừa (~150g)',
    kcal: 65,
    carb: 14,
    protein: 2.5,
    fat: 0.5,
    gi: 'GI = 31 (Thấp)',
    badge: 'Giòn ngon - Ít Fructose',
    liverNote: 'Khác với xoài chín hay nhãn vải, ổi chứa rất ít đường Fructose nhưng lại giàu Vitamin C gấp 4 lần cam và nhiều chất xơ hòa tan giúp làm chậm hấp thu đường.'
  },
  {
    id: 's3',
    name: 'Hạt hạnh nhân / Óc chó / Hạt điều rang mộc',
    category: 'protein',
    portion: '1 nắm nhỏ (~15g - khoảng 10-12 hạt)',
    kcal: 90,
    carb: 3,
    protein: 3.5,
    fat: 7.8,
    gi: 'GI = 15 (Rất thấp)',
    badge: 'Giàu Vitamin E & Omega-3',
    liverNote: 'Vitamin E tự nhiên và axit béo không bão hòa trong hạt giúp giảm stress oxy hóa tại tế bào gan và cải thiện độ nhạy Insulin. Lưu ý chọn loại rang mộc không tẩm muối/mật ong.'
  },
  {
    id: 's4',
    name: 'Sữa chua Hy Lạp / Sữa chua trắng không đường',
    category: 'protein',
    portion: '1 hộp (100g)',
    kcal: 65,
    carb: 4.5,
    protein: 6.5,
    fat: 2.5,
    gi: 'GI = 14 (Rất thấp)',
    badge: 'Lợi khuẩn Trục Ruột - Gan',
    liverNote: 'Bổ sung Probiotics cân bằng hệ vi sinh đường ruột, giảm độc tố nội sinh (Endotoxin) đi qua tĩnh mạch cửa về gan, từ đó giảm viêm gan nhiễm mỡ.'
  },
  {
    id: 's5',
    name: 'Đậu nành lông luộc (Edamame)',
    category: 'protein',
    portion: '1 bát con nguyên vỏ (~100g hạt)',
    kcal: 120,
    carb: 9,
    protein: 11.5,
    fat: 5.0,
    gi: 'GI = 18 (Rất thấp)',
    badge: 'Đạm thực vật No Lâu',
    liverNote: 'Giàu Isoflavones (Genistein) và Choline thực vật giúp ức chế gen tổng hợp mỡ mới tại gan và giảm Cholesterol xấu (LDL).'
  },
  {
    id: 's6',
    name: 'Củ đậu (Sắn nước) & Dưa chuột tươi',
    category: 'crunchy',
    portion: '1 hộp nhỏ mang đi làm (200g)',
    kcal: 55,
    carb: 12,
    protein: 1.5,
    fat: 0.2,
    gi: 'GI = 15 (Rất thấp)',
    badge: 'Ăn thoải mái không lo béo',
    liverNote: 'Hơn 85% là nước và chất xơ Inulin tự nhiên, giúp giải cơn buồn miệng buổi chiều tại văn phòng mà không làm tăng Insulin.'
  },
  {
    id: 's7',
    name: 'Trứng gà luộc / Trứng cút luộc (3-4 quả)',
    category: 'protein',
    portion: '1 quả trứng gà (55g) hoặc 4 quả trứng cút',
    kcal: 78,
    carb: 0.6,
    protein: 6.5,
    fat: 5.3,
    gi: 'GI = 0',
    badge: 'Giàu Choline đẩy mỡ gan',
    liverNote: 'Lòng đỏ trứng cung cấp Choline — nguyên liệu bắt buộc để gan đóng gói hạt mỡ (VLDL) vận chuyển ra khỏi gan. Ăn 1 quả luộc lúc 16h chiều giúp no đến tối.'
  },
  {
    id: 's8',
    name: 'Sữa đậu nành không đường (Đóng hộp / Tự nấu)',
    category: 'drink',
    portion: '1 hộp / ly (250ml)',
    kcal: 85,
    carb: 4.0,
    protein: 7.5,
    fat: 4.0,
    gi: 'GI = 24 (Thấp)',
    badge: 'Thay thế trà sữa chiều',
    liverNote: 'Cung cấp đạm thực vật chất lượng cao, dễ mang theo đi làm, giúp cắt cơn đói lúc 4h chiều để buổi tối không ăn quá đà.'
  },
  {
    id: 's9',
    name: 'Trà xanh tươi / Trà hoa cúc / Trà Atiso không đường',
    category: 'drink',
    portion: '1 bình giữ nhiệt (300 - 500ml)',
    kcal: 2,
    carb: 0,
    protein: 0,
    fat: 0,
    gi: 'GI = 0',
    badge: 'Chống oxy hóa EGCG & Cynarin',
    liverNote: 'Hoạt chất EGCG trong trà xanh và Cynarin trong Atiso thúc đẩy bài tiết mật, giảm hấp thu Cholesterol và hạ mỡ nội tạng.'
  },
  {
    id: 's10',
    name: 'Rong biển sấy khô ăn liền (Loại ít muối / Olive)',
    category: 'crunchy',
    portion: '1 gói nhỏ (5g)',
    kcal: 25,
    carb: 1.5,
    protein: 1.2,
    fat: 1.8,
    gi: 'GI = 10',
    badge: 'Giòn rụm - Chỉ 25 kcal',
    liverNote: 'Chứa Fucoxanthin giúp kích hoạt protein đốt mỡ trắng ở bụng và gan. Thay thế hoàn hảo cho snack khoai tây chiên.'
  },
  // Nhóm Đèn Đỏ Cần Tránh Tại Văn Phòng
  {
    id: 's11',
    name: '[ĐÈN ĐỎ] Trà sữa trân châu / Hồng trà kem cheese',
    category: 'red_list',
    portion: '1 ly size M (500ml)',
    kcal: 480,
    carb: 72,
    protein: 3,
    fat: 18,
    gi: 'GI = 85 (Cực cao)',
    badge: 'Kẻ thù số 1 gây mỡ gan',
    liverNote: 'Chứa siro đường Fructose (HFCS) và kem béo chuyển hóa (Trans fat). 100% đường Fructose lỏng đi thẳng vào gan và biến thành hạt mỡ Triglyceride chỉ sau vài giờ!'
  },
  {
    id: 's12',
    name: '[ĐÈN ĐỎ] Trái cây ngọt sắc (Nhãn, Vải, Xoài chín, Sầu riêng, Mít)',
    category: 'red_list',
    portion: '1 hộp ăn vặt văn phòng (250g)',
    kcal: 260,
    carb: 62,
    protein: 2,
    fat: 1.5,
    gi: 'GI = 75 (Cao)',
    badge: 'Quá tải đường Fructose',
    liverNote: 'Nhiều người lầm tưởng ăn hoa quả gì cũng tốt cho gan. Thực tế hoa quả quá ngọt chứa lượng Fructose rất cao làm gan quá tải và tăng tổng hợp mỡ mới.'
  },
  {
    id: 's13',
    name: '[ĐÈN ĐỎ] Bánh tráng trộn / Bánh ngọt / Khoai tây chiên',
    category: 'red_list',
    portion: '1 bịch / 1 phần (120g)',
    kcal: 380,
    carb: 48,
    protein: 5,
    fat: 19,
    gi: 'GI = 80 (Cao)',
    badge: 'Tinh bột tinh chế + Dầu chiên đi chiên lại',
    liverNote: 'Sự kết hợp giữa tinh bột đường huyết cao và sa tế/dầu mỡ chiên đi chiên lại gây kháng Insulin mạnh và thúc đẩy phản ứng viêm tế bào gan.'
  }
];
const OFFICE_SNACKS = [...BASE_SNACKS, ...EXTRA_SNACKS];

const OFFICE_SMART_SWAPS = [
  {
    bad: '1 ly Trà sữa trân châu ít đường (450 kcal • 55g đường)',
    good: '1 ly Sữa đậu nành không đường hoặc Cà phê đen đá (5 - 85 kcal • 0g đường)',
    savedKcal: 370,
    savedSugar: '55g đường'
  },
  {
    bad: '1 đĩa Xoài chín / Nhãn / Vải chấm muối ớt (260 kcal • 58g đường)',
    good: '1 quả Ổi giòn + 1/2 củ đậu tươi mát (90 kcal • giàu xơ)',
    savedKcal: 170,
    savedSugar: '44g đường'
  },
  {
    bad: '1 bịch Bánh tráng trộn / Khoai tây chiên (380 kcal • nhiều mỡ xấu)',
    good: '10 hạt Hạnh nhân/Điều mộc + 1 gói Rong biển sấy (115 kcal • Omega-3)',
    savedKcal: 265,
    savedSugar: '16g mỡ xấu'
  }
];

// ==========================================
// 4. DỮ LIỆU BÍ KÍP ĂN HÀNG QUÁN & ƯỚC TÍNH CALO NGOÀI HÀNG
// ==========================================
const BASE_DINING = [
  // 1. Quán Bún / Phở / Miến
  {
    id: 'd1',
    category: 'noodle',
    name: 'Phở Bò Hà Nội / Phở Gà',
    normalDesc: 'Phở tái nạm gầu, nước béo, ăn hết bánh phở & húp cạn nước',
    normalKcal: 650,
    normalMacro: { carb: 82, pro: 26, fat: 24 },
    hackDesc: 'Phở bò chín / bắp trần (hoặc gà bỏ da), nước trong, 2/3 bánh phở, 1 đĩa giá trần',
    hackKcal: 410,
    hackMacro: { carb: 52, pro: 34, fat: 8 },
    orderMantra: '“Cho em 1 bát phở chín (hoặc bắp bò), NƯỚC TRONG không hành béo, lấy 2/3 bánh phở và cho em xin thêm 1 đĩa giá trần nhiều hành nhé!”',
    medicalTip: 'Nước béo phở và thịt gầu/nạm chứa rất nhiều axit béo bão hòa. Chỉ cần đổi sang thịt bắp/thịt chín nước trong, ăn giá trần trước và để lại 1/3 bánh phở + không húp cạn nước lèo là bạn cắt giảm được ngay 240 kcal và 16g mỡ bão hòa!'
  },
  {
    id: 'd2',
    category: 'noodle',
    name: 'Bún Chả Hà Nội',
    normalDesc: 'Chả băm nhiều mỡ + thịt ba chỉ nướng cháy, ăn hết cả đĩa bún lớn',
    normalKcal: 720,
    normalMacro: { carb: 88, pro: 28, fat: 29 },
    hackDesc: 'Gọi chả miếng nạc (bỏ phần mỡ cháy), nhúng qua đĩa rau sống để ráo mỡ, ăn 1/2 đĩa bún',
    hackKcal: 440,
    hackMacro: { carb: 48, pro: 32, fat: 13 },
    orderMantra: '“Chị ơi cho em suất bún chả lấy toàn CHẢ MIẾNG NẠC, không lấy mỡ cháy nhé, cho em xin thêm 1 rổ rau sống!”',
    medicalTip: 'Ăn thật nhiều xà lách, tía tô và đu đủ xanh ngâm trong bát nước chấm trước. Không uống nước chấm bún chả vì chứa nhiều đường và muối.'
  },
  {
    id: 'd3',
    category: 'noodle',
    name: 'Bún Cá / Bún Riêu Cua Đậu Phụ',
    normalDesc: 'Cá chiên giòn ngập dầu, đậu rán, giò tai, tóp mỡ, hành phi',
    normalKcal: 640,
    normalMacro: { carb: 76, pro: 25, fat: 26 },
    hackDesc: 'Chọn cá hấp/trần, thịt bò trần, đậu phụ trắng, KHÔNG tóp mỡ & hành phi, nhiều rau cần/cải',
    hackKcal: 395,
    hackMacro: { carb: 50, pro: 31, fat: 8 },
    orderMantra: '“Cho mình 1 bát bún cá trần (không lấy cá rán), thêm thịt bò trần, KHÔNG tóp mỡ, ít bún nhiều rau cải/rau cần nhé!”',
    medicalTip: 'Tóp mỡ và dầu chiên cá đi chiên lại ngoài quán chứa nhiều Trans-fat gây viêm gan. Đổi sang cá trần/bò trần giúp bát bún thanh ngọt và giàu đạm nạc.'
  },

  // 2. Cơm Văn Phòng / Cơm Bình Dân / Cơm Tấm
  {
    id: 'd4',
    category: 'rice',
    name: 'Cơm Bình Dân / Cơm Văn Phòng Tự Chọn',
    normalDesc: 'Cơm trắng đầy ắp + Thịt kho tàu/Sườn xào chua ngọt + Rau xào bóng mỡ',
    normalKcal: 780,
    normalMacro: { carb: 95, pro: 28, fat: 32 },
    hackDesc: '1/2 cơm trắng + Cá kho/Thịt luộc/Ức gà + Đậu phụ sốt cà + Rau luộc + Canh rau',
    hackKcal: 480,
    hackMacro: { carb: 52, pro: 38, fat: 13 },
    orderMantra: '“Cô lấy cho cháu NỬA CƠM THÔI ạ, cho cháu phần cá thu sốt cà + đậu phụ + nhiều rau luộc, không rưới nước mỡ thịt kho lên cơm nhé!”',
    medicalTip: 'Thói quen rưới nước thịt kho tàu hoặc mỡ hành lên cơm trắng khiến đường huyết và Triglyceride tăng vọt. Hãy gọi 1 món đạm nạc + 1 món đậu phụ + đĩa rau luộc lớn.'
  },
  {
    id: 'd5',
    category: 'rice',
    name: 'Cơm Tấm Sườn Bì Chả',
    normalDesc: 'Cơm tấm đầy đĩa + Sườn mỡ + Bì heo + Chả trứng + Mỡ hành + Tóp mỡ',
    normalKcal: 850,
    normalMacro: { carb: 98, pro: 34, fat: 36 },
    hackDesc: '1/2 cơm tấm + Sườn nạc nướng (bỏ viền mỡ) + Trứng ốp/Chả hấp, KHÔNG mỡ hành & tóp mỡ, xin thêm dưa leo',
    hackKcal: 510,
    hackMacro: { carb: 52, pro: 38, fat: 16 },
    orderMantra: '“Cho mình đĩa cơm tấm sườn NẠC, lấy nửa cơm thôi, KHÔNG rưới mỡ hành và tóp mỡ, cho mình xin thêm dưa leo cà chua nhé!”',
    medicalTip: 'Ăn hết phần dưa leo, cà chua và đồ chua trước khi ăn sườn và cơm tấm để giảm tốc độ hấp thu đường.'
  },

  // 3. Đi ăn Lẩu / Nướng Liên Hoan
  {
    id: 'd6',
    category: 'hotpot',
    name: 'Đi Ăn Lẩu Liên Hoan (Lẩu Hải Sản / Lẩu Bò / Lẩu Thái)',
    normalDesc: 'Nước lẩu cay nhiều váng dầu, nhúng ba chỉ bò Mỹ, bò viên, váng đậu chiên, ăn mì tôm cuối bữa',
    normalKcal: 920,
    normalMacro: { carb: 75, pro: 42, fat: 50 },
    hackDesc: 'Chọn ngăn nước lẩu Nấm/Thanh đạm, nhúng tôm, mực, cá, thăn bò nạc, đậu phụ tươi, nấm & rau xanh, BỎ mì tôm chiên',
    hackKcal: 490,
    hackMacro: { carb: 35, pro: 52, fat: 15 },
    orderMantra: '“Mình gọi nồi lẩu 2 ngăn (1 ngăn nước nấm thanh đạm nhé), gọi thêm đĩa bắp bò nạc, tôm mực, đậu phụ trắng và combo nấm rau tổng hợp!”',
    medicalTip: 'Lẩu thực chất là món LUỘC cực tốt cho người gan nhiễm mỡ nếu bạn tránh: (1) Ba chỉ bò Mỹ nhiều mỡ trắng, (2) Váng đậu chiên/viên thả lẩu, (3) Mì tôm chiên cuối bữa và (4) Húp nước lẩu đặc cuối nồi.'
  },
  {
    id: 'd7',
    category: 'hotpot',
    name: 'Thịt Nướng BBQ Hàn Quốc / Nướng Than Hoa',
    normalDesc: 'Ba chỉ heo, nạc vai sốt ngọt, lòng nướng, uống kèm nước ngọt / rượu Soju',
    normalKcal: 950,
    normalMacro: { carb: 65, pro: 45, fat: 56 },
    hackDesc: 'Chọn thăn bò/bắp bò không tẩm sốt đường, hải sản nướng, gói 2 lá xà lách + kim chi + tỏi cho mỗi miếng thịt',
    hackKcal: 530,
    hackMacro: { carb: 32, pro: 50, fat: 22 },
    orderMantra: '“Cho mình phần thăn bò tươi KHÔNG TẨM SỐT ĐƯỜNG, mực/tôm nướng, thêm nhiều xà lách, lá vừng, dưa chuột và trà lúa mạch không đường!”',
    medicalTip: 'Quy tắc vàng khi ăn BBQ: “1 miếng thịt nạc phải cuộn trong 2 lá rau xà lách + 1 lát tỏi/ớt”. Chất xơ trong rau sẽ khóa bớt Cholesterol ngay tại đường ruột.'
  },

  // 4. Quán Nhậu / Tiếp Khách / Cafe Đối Tác
  {
    id: 'd8',
    category: 'party',
    name: 'Tiệc Nhậu Tiếp Khách / Liên Hoan Công Ty',
    normalDesc: 'Uống 3-5 lon bia + Lạc rang dầu, khoai tây chiên, lòng xào, chân gà chiên mắm',
    normalKcal: 1050,
    normalMacro: { carb: 85, pro: 32, fat: 48 },
    hackDesc: 'Uống nước suối/trà đá (hoặc tối đa 1 lon bia pha đá nếu bất khả kháng, kèm 2 ly nước lọc), gắp đậu phụ lướt ván, mực hấp, bò cuốn cải, edamame',
    hackKcal: 460,
    hackMacro: { carb: 34, pro: 44, fat: 16 },
    orderMantra: '“Nay bác sĩ đang bắt em điều trị hạ men gan nên em xin phép cụng bằng trà đá/nước suối. Anh em mình gọi đĩa mực hấp gừng, bò cuốn cải và đậu phụ nhé!”',
    medicalTip: 'Cồn làm ngưng trệ hoàn toàn quá trình đốt mỡ của gan trong 24-48 giờ. Trước khi đi tiếp khách 30 phút, hãy ăn lót dạ 1 quả trứng luộc hoặc 1 hộp sữa chua không đường để không bị đói và kiểm soát mồi nhậu.'
  }
];
const DINING_OUT_GUIDE = [...BASE_DINING, ...EXTRA_DINING];

// ==========================================
// 5. DỮ LIỆU CẨM NANG ĐÈN GIAO THÔNG
// ==========================================
const TRAFFIC_LIGHT_DATA = {
  green: {
    title: 'Nhóm Đèn Xanh - Khuyến Khích Dùng Hằng Ngày',
    subtitle: 'Giúp giảm tích tụ Triglyceride, chống viêm và bảo vệ tế bào gan',
    items: [
      {
        name: 'Cà phê đen nguyên chất (Không đường, không sữa đặc)',
        benefit: 'Chứa Acid Chlorogenic và Cafestol giúp giảm men gan (ALT, AST), ức chế quá trình xơ hóa gan. Khuyên dùng 1 - 2 tách mỗi sáng/trưa.',
        portion: '1 - 2 tách/ngày'
      },
      {
        name: 'Cá béo giàu Omega-3 (Cá thu, cá trích)',
        benefit: 'Axit béo Omega-3 (EPA & DHA) giúp kích hoạt quá trình đốt cháy axit béo tại gan (Beta-oxidation) và giảm mỡ máu Triglyceride.',
        portion: '3 - 4 bữa/tuần'
      },
      {
        name: 'Đậu phụ, Đậu nành & Đạm thực vật',
        benefit: 'Chứa hoạt chất Soy Isoflavones (Genistein) giúp cải thiện độ nhạy Insulin và giảm tổng hợp mỡ mới tại gan mà không chứa Cholesterol.',
        portion: '1 - 2 bìa/ngày'
      },
      {
        name: 'Rau họ cải (Súp lơ xanh, cải bó xôi, cải xanh, bắp cải)',
        benefit: 'Giàu hợp chất Indole và Sulforaphane tự nhiên giúp kích hoạt enzyme giải độc gan pha II và kháng viêm tế bào gan.',
        portion: '400 - 500g rau/ngày'
      }
    ]
  },
  yellow: {
    title: 'Nhóm Đèn Vàng - Ăn Vừa Phải & Đúng Cách',
    subtitle: 'Cần kiểm soát khẩu phần và áp dụng quy tắc ăn đúng thứ tự',
    items: [
      {
        name: 'Cơm trắng, Bún trắng, Phở truyền thống',
        benefit: 'Chỉ số đường huyết (GI) cao dễ làm tăng Insulin nhanh. Mẹo y khoa: Nên trộn 50% gạo lứt, hoặc ăn rau xanh và thịt/cá trước rồi mới ăn cơm sau cùng.',
        portion: 'Tối đa 1 lưng bát/bữa'
      },
      {
        name: 'Thịt đỏ nạc (Thịt thăn bò, thịt thăn heo)',
        benefit: 'Cung cấp sắt và B12 tốt nhưng chứa nhiều sắt Heme hơn cá/ức gà. Nên luộc/hấp/áp chảo, hạn chế nướng cháy.',
        portion: 'Tối đa 2 - 3 bữa/tuần'
      },
      {
        name: 'Trứng gà nguyên quả (Luộc / Hấp)',
        benefit: 'Lòng đỏ trứng rất giàu Choline - chất bắt buộc phải có để gan đóng gói mỡ (VLDL) đẩy ra khỏi gan. Người gan nhiễm mỡ nên ăn 5-6 quả/tuần.',
        portion: '1 quả/ngày'
      }
    ]
  },
  red: {
    title: 'Nhóm Đèn Đỏ - Cần Kiêng Kỵ Tuyệt Đối / Tối Đa',
    subtitle: 'Thủ phạm trực tiếp thúc đẩy tổng hợp mỡ tại gan (De novo lipogenesis) và gây viêm gan',
    items: [
      {
        name: 'Rượu, Bia và Đồ uống có cồn',
        benefit: 'Kẻ thù số 1 của lá gan. Cồn chuyển hóa tạo ra Acetaldehyde gây độc trực tiếp tế bào gan và khóa chặt quá trình phân giải mỡ tại gan.',
        portion: 'Kiêng tuyệt đối'
      },
      {
        name: 'Nước ngọt, Trà sữa, Nước ép đóng chai, Trái cây quá ngọt',
        benefit: 'Chứa đường Fructose cao. Khác với Glucose được cơ bắp tiêu thụ, gần 100% Fructose đi thẳng về gan và biến thành hạt mỡ tích tụ trong gan!',
        portion: 'Kiêng tuyệt đối'
      },
      {
        name: 'Nội tạng động vật, Da gà, Mỡ heo, Đồ chiên rán ngập dầu',
        benefit: 'Chứa hàm lượng Cholesterol cực cao, chất béo bão hòa và nhân Purin làm tăng Acid Uric máu & đề kháng Insulin.',
        portion: 'Kiêng tuyệt đối'
      }
    ]
  }
};

import Tracker from './health/Tracker';
import Recipes from './Recipes';
import { DISHES } from './data/dishes';
import { EXTRA_SNACKS } from './data/snacks';
import { EXTRA_DINING } from './data/dining';
import { useHealthStore } from './health/store';

// Lưu tiến độ vào localStorage (có thể bị chặn trong iframe -> bỏ qua lỗi)
const usePersisted = <T,>(key: string, init: T) => {
  const [v, setV] = useState<T>(() => {
    try {
      const raw = localStorage.getItem('nutriliver:' + key);
      return raw !== null ? (JSON.parse(raw) as T) : init;
    } catch {
      return init;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('nutriliver:' + key, JSON.stringify(v));
    } catch {}
  }, [key, v]);
  return [v, setV] as const;
};

export default function App() {
  // ==========================================
  // 1. STATE: THÔNG SỐ CÁ NHÂN (Mặc định chuẩn Nam, 28t, 1m70, 82kg, Ít vận động, -450 kcal)
  // ==========================================
  const [gender, setGender] = usePersisted('gender', 'male');
  const [age, setAge] = usePersisted('age', 28);
  const [height, setHeight] = usePersisted('height', 170);
  const [weight, setWeight] = usePersisted('weight', 82);
  const [activity, setActivity] = usePersisted('activity', 1.2);
  const [deficit, setDeficit] = usePersisted('deficit', 450);

  // State tỷ lệ Macro (Mặc định: 40% Carb - 30% Protein - 30% Fat)
  const [macroPreset, setMacroPreset] = useState('med_vn');
  const [carbRatio, setCarbRatio] = useState(40);
  const [proteinRatio, setProteinRatio] = useState(30);
  const [fatRatio, setFatRatio] = useState(30);

  // State Điều hướng 3 Tab Trọng Tâm
  const health = useHealthStore();
  const [mainTab, setMainTab] = useState('30days'); // '30days' | 'office_dining' | 'builder' | 'tracker'


  // State cho TAB 2: Ăn vặt văn phòng & Ăn hàng quán
  const [snackFilter, setSnackFilter] = useState('all'); // 'all' | 'protein' | 'crunchy' | 'drink' | 'red_list'
  const [diningCategory, setDiningCategory] = useState('all'); // 'all' | 'noodle' | 'rice' | 'hotpot' | 'party'
  const [selectedDiningItemId, setSelectedDiningItemId] = useState('d1');
  const [diningOrderMode, setDiningOrderMode] = useState('hack'); // 'normal' | 'hack'

  // State cho TAB 3: Tự thiết kế bữa ăn trong ngày
  const [activeMealSlot, setActiveMealSlot] = useState('lunch');
  const [foodCategoryFilter, setFoodCategoryFilter] = useState('all');
  const [trafficSearch, setTrafficSearch] = useState('');
  const [customMeals, setCustomMeals] = useState({
    breakfast: [
      { foodId: 'c2', servings: 1.0 },
      { foodId: 'p6', servings: 2.0 },
      { foodId: 'f4', servings: 1.0 }
    ],
    lunch: [
      { foodId: 'c1', servings: 1.2 },
      { foodId: 'p1', servings: 1.2 },
      { foodId: 'v1', servings: 1.0 },
      { foodId: 'f1', servings: 1.0 }
    ],
    snack: [
      { foodId: 'v6', servings: 1.0 },
      { foodId: 'f2', servings: 1.0 }
    ],
    dinner: [
      { foodId: 'c1', servings: 0.8 },
      { foodId: 'p3', servings: 1.1 },
      { foodId: 'v2', servings: 1.0 },
      { foodId: 'f1', servings: 1.0 }
    ]
  });

  // ==========================================
  // 2. TÍNH TOÁN CHỈ SỐ Y KHOA & MACRO THỜI GIAN THỰC
  // ==========================================
  const metrics = useMemo(() => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);

    let bmiCategory = '';
    let bmiColor = '';
    if (bmi < 18.5) {
      bmiCategory = 'Thiếu cân (< 18.5)';
      bmiColor = 'text-sky-600 bg-sky-50 border-sky-200';
    } else if (bmi < 23) {
      bmiCategory = 'Bình thường (18.5 - 22.9)';
      bmiColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    } else if (bmi < 25) {
      bmiCategory = 'Thừa cân - Chuẩn Châu Á (23.0 - 24.9)';
      bmiColor = 'text-amber-600 bg-amber-50 border-amber-200';
    } else if (bmi < 30) {
      bmiCategory = 'Béo phì Độ I - Chuẩn Châu Á (25.0 - 29.9)';
      bmiColor = 'text-rose-600 bg-rose-50 border-rose-200';
    } else {
      bmiCategory = 'Béo phì Độ II (≥ 30.0)';
      bmiColor = 'text-red-700 bg-red-50 border-red-300';
    }

    // Công thức Mifflin-St Jeor
    const bmrRaw =
      gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const bmr = Math.round(bmrRaw);
    const tdee = Math.round(bmrRaw * activity);

    const minSafeCalories = gender === 'male' ? 1350 : 1200;
    const targetCalories = Math.max(minSafeCalories, tdee - deficit);
    const actualDeficit = tdee - targetCalories;
    const scaleFactor = targetCalories / 1647; // Tỷ lệ co giãn so với mức chuẩn 1647 kcal

    const weeklyWeightLossKg = Number(((actualDeficit * 7) / 7700).toFixed(2));

    // 2 Cột mốc vàng phục hồi gan
    const milestone1Weight = Number((weight * 0.95).toFixed(1)); // -5%
    const milestone1Loss = Number((weight - milestone1Weight).toFixed(1));
    const milestone1Weeks =
      weeklyWeightLossKg > 0 ? Math.ceil(milestone1Loss / weeklyWeightLossKg) : 0;

    const milestone2Weight = Number((weight * 0.9).toFixed(1)); // -10%
    const milestone2Loss = Number((weight - milestone2Weight).toFixed(1));
    const milestone2Weeks =
      weeklyWeightLossKg > 0 ? Math.ceil(milestone2Loss / weeklyWeightLossKg) : 0;

    const idealWeight = Number((22 * heightInM * heightInM).toFixed(1));

    const carbKcal = Math.round((targetCalories * carbRatio) / 100);
    const proteinKcal = Math.round((targetCalories * proteinRatio) / 100);
    const fatKcal = Math.round((targetCalories * fatRatio) / 100);

    const carbGrams = Math.round(carbKcal / 4);
    const proteinGrams = Math.round(proteinKcal / 4);
    const fatGrams = Math.round(fatKcal / 9);

    const fiberTarget = gender === 'male' ? 32 : 28;
    const waterMl = Math.round(weight * 35);
    const waterLiters = (waterMl / 1000).toFixed(2);

    const mealTargets = {
      breakfast: Math.round(targetCalories * 0.25),
      lunch: Math.round(targetCalories * 0.35),
      snack: Math.round(targetCalories * 0.10),
      dinner: Math.round(targetCalories * 0.30)
    };

    return {
      bmi: bmi.toFixed(1),
      bmiCategory,
      bmiColor,
      bmr,
      tdee,
      targetCalories,
      actualDeficit,
      scaleFactor,
      weeklyWeightLossKg,
      milestone1Weight,
      milestone1Loss,
      milestone1Weeks,
      milestone2Weight,
      milestone2Loss,
      milestone2Weeks,
      idealWeight,
      carbKcal,
      proteinKcal,
      fatKcal,
      carbGrams,
      proteinGrams,
      fatGrams,
      fiberTarget,
      waterMl,
      waterLiters,
      mealTargets
    };
  }, [gender, age, height, weight, activity, deficit, carbRatio, proteinRatio, fatRatio]);

  // ==========================================
  // 3. QUY ĐỔI KHẨU PHẦN BẰNG BÀN TAY & BÁT ĐĨA VIỆT NAM
  // ==========================================
  const portionEquivalents = useMemo(() => {
    const netStarchCarb = Math.max(40, metrics.carbGrams - 22);
    const brownRiceBowls = (netStarchCarb / 26).toFixed(1);
    const sweetPotatoes = (netStarchCarb / 30).toFixed(1);
    const carbFists = (netStarchCarb / 28).toFixed(1);

    const netMeatProtein = Math.max(40, metrics.proteinGrams - 12);
    const rawChickenOrFishGrams = Math.round((netMeatProtein * 0.65) / 0.23);
    const tofuBlocks = Number(((netMeatProtein * 0.22) / 9).toFixed(1));
    const eggsCount = Math.max(1, Math.round((netMeatProtein * 0.13) / 6.5));
    const proteinPalms = (netMeatProtein / 24).toFixed(1);

    const addedHealthyFatGrams = Math.max(10, metrics.fatGrams - 28);
    const oliveOilTeaspoons = Math.max(2, Math.round((addedHealthyFatGrams * 0.6) / 5));
    const nutsGrams = Math.max(10, Math.round((addedHealthyFatGrams * 0.4) / 0.5));

    return {
      brownRiceBowls,
      sweetPotatoes,
      carbFists,
      rawChickenOrFishGrams,
      tofuBlocks,
      eggsCount,
      proteinPalms,
      oliveOilTeaspoons,
      nutsGrams
    };
  }, [metrics]);

  // Xử lý chọn Preset Macro
  const handlePresetChange = (preset) => {
    setMacroPreset(preset);
    if (preset === 'med_vn') {
      setCarbRatio(40);
      setProteinRatio(30);
      setFatRatio(30);
    } else if (preset === 'high_pro') {
      setCarbRatio(35);
      setProteinRatio(35);
      setFatRatio(30);
    } else if (preset === 'balanced') {
      setCarbRatio(45);
      setProteinRatio(25);
      setFatRatio(30);
    }
  };

  const resetToDefaultProfile = () => {
    setGender('male');
    setAge(28);
    setHeight(170);
    setWeight(82);
    setActivity(1.2);
    setDeficit(450);
    handlePresetChange('med_vn');
  };


  // ==========================================
  // 5. LOGIC ƯỚC TÍNH BỮA ĂN HÀNG QUÁN & TỰ ĐỘNG BÙ TRỪ BỮA TỐI
  // ==========================================
  const diningSimulation = useMemo(() => {
    const item = DINING_OUT_GUIDE.find((d) => d.id === selectedDiningItemId) || DINING_OUT_GUIDE[0];
    const isHack = diningOrderMode === 'hack';
    const mealKcal = isHack ? item.hackKcal : item.normalKcal;
    const mealMacro = isHack ? item.hackMacro : item.normalMacro;
    const savedKcal = item.normalKcal - item.hackKcal;

    const pctDailyKcal = Math.round((mealKcal / metrics.targetCalories) * 100);
    const pctDailyCarb = Math.round((mealMacro.carb / metrics.carbGrams) * 100);
    const pctDailyFat = Math.round((mealMacro.fat / metrics.fatGrams) * 100);

    // Giả sử bữa sáng + bữa phụ chiều đã chiếm khoảng 35% quỹ Calo (~575 kcal)
    const morningAndSnackKcal = Math.round(metrics.targetCalories * 0.35);
    const remainingDinnerKcal = Math.max(250, metrics.targetCalories - morningAndSnackKcal - mealKcal);

    let dinnerAdvice = '';
    let walkMinutes = 15;
    if (remainingDinnerKcal < 380) {
      dinnerAdvice = `Bữa ngoài hàng này khá nhiều năng lượng (${mealKcal} kcal). Tối nay bạn nên ăn nhẹ khoảng ${remainingDinnerKcal} kcal: Cắt giảm tinh bột xuống 1/2 lưng bát cơm gạo lứt (hoặc bỏ cơm thay bằng 1 đĩa đậu phụ trắng luộc + 120g cá hấp/ức gà + 1 tô canh rau cải xanh).`;
      walkMinutes = 25;
    } else {
      dinnerAdvice = `Nhờ áp dụng Mẹo Order Hack, bữa ăn ngoài của bạn rất gọn (${mealKcal} kcal - tiết kiệm được ${savedKcal} kcal!). Tối nay bạn vẫn còn thoải mái ${remainingDinnerKcal} kcal: Ăn 1 lưng bát cơm gạo lứt + 140g cá/tôm hấp + 1 đĩa lớn súp lơ/rau luộc.`;
      walkMinutes = 15;
    }

    return {
      item,
      mealKcal,
      mealMacro,
      savedKcal,
      pctDailyKcal,
      pctDailyCarb,
      pctDailyFat,
      remainingDinnerKcal,
      dinnerAdvice,
      walkMinutes
    };
  }, [selectedDiningItemId, diningOrderMode, metrics]);

  // ==========================================
  // 6. LOGIC TRÌNH XÂY DỰNG BỮA ĂN TÙY CHỈNH (TAB 3)
  // ==========================================
  const customMenuData = useMemo(() => {
    let totalKcal = 0;
    let totalCarb = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalFiber = 0;
    const mealBreakdowns = {};

    Object.keys(customMeals).forEach((slot) => {
      let slotKcal = 0;
      const items = customMeals[slot]
        .map((entry) => {
          const food = FOOD_DATABASE.find((f) => f.id === entry.foodId);
          if (!food) return null;
          const s = entry.servings;
          const itemKcal = Math.round(food.kcal * s);
          const itemGrams = Math.round(food.grams * s);
          const itemCarb = Number((food.carb * s).toFixed(1));
          const itemPro = Number((food.protein * s).toFixed(1));
          const itemFat = Number((food.fat * s).toFixed(1));
          const itemFiber = Number((food.fiber * s).toFixed(1));

          slotKcal += itemKcal;
          totalKcal += itemKcal;
          totalCarb += itemCarb;
          totalProtein += itemPro;
          totalFat += itemFat;
          totalFiber += itemFiber;

          return {
            ...food,
            rawServings: s,
            itemKcal,
            itemGrams,
            itemCarb,
            itemPro,
            itemFat,
            itemFiber
          };
        })
        .filter(Boolean);

      mealBreakdowns[slot] = { kcal: slotKcal, items };
    });

    return {
      totalKcal: Math.round(totalKcal),
      totalCarb: Math.round(totalCarb),
      totalProtein: Math.round(totalProtein),
      totalFat: Math.round(totalFat),
      totalFiber: Math.round(totalFiber),
      mealBreakdowns
    };
  }, [customMeals]);

  const addFoodToCustomMeal = (foodId) => {
    setCustomMeals((prev) => {
      const slotList = prev[activeMealSlot] || [];
      const existingIndex = slotList.findIndex((i) => i.foodId === foodId);
      if (existingIndex > -1) {
        const updated = [...slotList];
        updated[existingIndex] = {
          ...updated[existingIndex],
          servings: Number((updated[existingIndex].servings + 0.5).toFixed(1))
        };
        return { ...prev, [activeMealSlot]: updated };
      } else {
        return {
          ...prev,
          [activeMealSlot]: [...slotList, { foodId, servings: 1.0 }]
        };
      }
    });
  };

  const updateCustomServings = (slot, foodId, delta) => {
    setCustomMeals((prev) => {
      const updated = prev[slot]
        .map((item) => {
          if (item.foodId !== foodId) return item;
          const nextServings = Number((item.servings + delta).toFixed(1));
          return nextServings > 0 ? { ...item, servings: nextServings } : null;
        })
        .filter(Boolean);
      return { ...prev, [slot]: updated };
    });
  };

  const MEAL_SLOTS_INFO = [
    { key: 'breakfast', label: 'Bữa Sáng', ratio: '25%', time: '07:00 - 08:00', target: metrics.mealTargets.breakfast },
    { key: 'lunch', label: 'Bữa Trưa', ratio: '35%', time: '12:00 - 13:00', target: metrics.mealTargets.lunch },
    { key: 'snack', label: 'Bữa Phụ Chiều', ratio: '10%', time: '16:00 - 16:30', target: metrics.mealTargets.snack },
    { key: 'dinner', label: 'Bữa Tối (Ăn nhẹ)', ratio: '30%', time: '18:30 - 19:30', target: metrics.mealTargets.dinner }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs sm:text-sm px-4 py-2 text-center">
        Công cụ chỉ mang tính tham khảo, không thay thế tư vấn của bác sĩ hoặc chuyên gia dinh dưỡng. Hãy hỏi ý kiến bác sĩ trước khi thay đổi chế độ ăn.
      </div>
      {/* ==========================================
          STICKY HEADER & LIVE METRICS BAR
      ========================================== */}
      <header className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-lg sticky top-0 z-30">
        <div className="w-full px-4 py-3 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-400/30">
                <HeartPulse className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    tamgiamcan
                  </h1>
                </div>
                <p className="text-xs text-emerald-100/80 hidden sm:block">
                  Hệ thống tính Macro, Thực đơn 30 ngày thuần Việt & Cẩm nang ăn vặt văn phòng / hàng quán
                </p>
              </div>
            </div>
            <button
              onClick={resetToDefaultProfile}
              className="md:hidden text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Mặc định
            </button>
          </div>

          {/* Live Macros Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs bg-black/25 px-3.5 py-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-emerald-100">Mục tiêu:</span>
              <strong className="text-white text-sm">{metrics.targetCalories} kcal</strong>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-semibold">
                Carb: {metrics.carbGrams}g
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-500/30 text-sky-200 font-semibold">
                Đạm: {metrics.proteinGrams}g
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 font-semibold">
                Béo: {metrics.fatGrams}g
              </span>
            </div>
            <span className="text-white/20 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1 text-sky-200 font-medium">
              <Droplets className="w-3.5 h-3.5" />
              <span>{metrics.waterLiters}L nước/ngày</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* ==========================================
            1. BẢNG ĐIỀU KHIỂN CHỈ SỐ & LỘ TRÌNH GIẢM MỠ GAN (TOP DASHBOARD)
        ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT TRÁI (5/12): THÔNG SỐ CƠ THỂ & THÂM HỤT CALO AN TOÀN */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-800">
                      Hồ Sơ Cơ Thể & Mức Thâm Hụt
                    </h2>
                    <p className="text-xs text-slate-500">
                      Tự động co giãn toàn bộ thực đơn 30 ngày theo chỉ số
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetToDefaultProfile}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Đặt lại (1m70, 82kg)
                </button>
              </div>

              <div className="space-y-3.5">
                {/* Giới tính & Tuổi */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Giới tính
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setGender('male')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition ${
                          gender === 'male'
                            ? 'bg-white text-emerald-700 shadow-xs'
                            : 'text-slate-600'
                        }`}
                      >
                        Nam
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('female')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition ${
                          gender === 'female'
                            ? 'bg-white text-emerald-700 shadow-xs'
                            : 'text-slate-600'
                        }`}
                      >
                        Nữ
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Độ tuổi ({age} tuổi)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="85"
                      value={age}
                      onChange={(e) => setAge(Math.max(15, Math.min(85, Number(e.target.value))))}
                      className="w-full px-3 py-1.5 text-sm font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Chiều cao & Cân nặng */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-600">Chiều cao</span>
                      <span className="text-xs font-extrabold text-emerald-700">{height} cm</span>
                    </div>
                    <input
                      type="range"
                      min="145"
                      max="200"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-600">Cân nặng</span>
                      <span className="text-xs font-extrabold text-emerald-700">{weight} kg</span>
                    </div>
                    <input
                      type="range"
                      min="45"
                      max="130"
                      step="0.5"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Mức độ vận động */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mức độ vận động hằng ngày
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={1.2}>
                      Ít vận động - Làm việc văn phòng, ngồi nhiều (Hệ số 1.2)
                    </option>
                    <option value={1.375}>
                      Vận động nhẹ - Đi bộ / Tập nhẹ 1-3 buổi/tuần (Hệ số 1.375)
                    </option>
                    <option value={1.55}>
                      Vận động vừa - Tập thể dục 3-5 buổi/tuần (Hệ số 1.55)
                    </option>
                    <option value={1.725}>
                      Vận động nhiều - Tập cường độ cao 6-7 buổi/tuần (Hệ số 1.725)
                    </option>
                  </select>
                </div>

                {/* Mức thâm hụt Calo an toàn cho gan */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-emerald-950">
                      Mức thâm hụt Calo an toàn cho Gan:
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      -{deficit} kcal/ngày (~{metrics.weeklyWeightLossKg}kg/tuần)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="600"
                    step="50"
                    value={deficit}
                    onChange={(e) => setDeficit(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-emerald-800 mt-1 leading-snug">
                    ⚠️ Không cắt giảm quá sâu (&gt;700 kcal) để tránh phân giải axit béo ồ ạt từ mô mỡ đổ dồn về gan gây tăng men gan!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (7/12): KẾT QUẢ TỨC THÌ, 2 CỘT MỐC VÀNG & QUY ĐỔI BÀN TAY */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between space-y-4">
            {/* 4 Thẻ chỉ số cốt lõi */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`p-3 rounded-xl border ${metrics.bmiColor}`}>
                <div className="text-[11px] font-semibold uppercase opacity-80">BMI Châu Á</div>
                <div className="text-2xl font-extrabold mt-0.5">{metrics.bmi}</div>
                <div className="text-[10px] font-bold mt-0.5 truncate">{metrics.bmiCategory}</div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">BMR Nền</div>
                <div className="text-2xl font-extrabold text-slate-800 mt-0.5">
                  {metrics.bmr}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">kcal nghỉ ngơi</div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">TDEE Duy Trì</div>
                <div className="text-2xl font-extrabold text-slate-800 mt-0.5">
                  {metrics.tdee}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">kcal giữ cân</div>
              </div>

              <div className="p-3 rounded-xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-emerald-600" /> Calo Mục Tiêu
                </div>
                <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">
                  {metrics.targetCalories}
                </div>
                <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                  kcal/ngày (-{metrics.actualDeficit})
                </div>
              </div>
            </div>

            {/* Phân bổ Macro & Nước uống */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">
                  Tinh bột chậm ({carbRatio}%)
                </div>
                <div className="text-lg font-extrabold text-emerald-700">
                  {metrics.carbGrams}g <span className="text-xs font-medium">({metrics.carbKcal} kcal)</span>
                </div>
                <div className="text-[10px] text-slate-600">~{portionEquivalents.brownRiceBowls} lưng bát cơm lứt</div>
              </div>

              <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200">
                <div className="text-[10px] font-bold text-sky-800 uppercase">
                  Đạm nạc ({proteinRatio}%)
                </div>
                <div className="text-lg font-extrabold text-sky-700">
                  {metrics.proteinGrams}g <span className="text-xs font-medium">({metrics.proteinKcal} kcal)</span>
                </div>
                <div className="text-[10px] text-slate-600">Đẩy mỡ VLDL khỏi gan</div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="text-[10px] font-bold text-amber-800 uppercase">
                  Chất béo tốt ({fatRatio}%)
                </div>
                <div className="text-lg font-extrabold text-amber-700">
                  {metrics.fatGrams}g <span className="text-xs font-medium">({metrics.fatKcal} kcal)</span>
                </div>
                <div className="text-[10px] text-slate-600">Omega-3 cá, dầu ô liu, hạt</div>
              </div>

              <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-200">
                <div className="text-[10px] font-bold text-teal-800 uppercase">
                  Nước & Chất xơ
                </div>
                <div className="text-lg font-extrabold text-teal-700">
                  {metrics.waterLiters} Lít <span className="text-xs font-medium">({metrics.waterMl}ml)</span>
                </div>
                <div className="text-[10px] text-slate-600">Xơ: 30-35g (400-500g rau)</div>
              </div>
            </div>

            {/* 2 Cột mốc vàng phục hồi gan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-start gap-2.5">
                <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg shrink-0">
                  MỐC 1 (-5%)
                </span>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-800">
                    Đạt {metrics.milestone1Weight} kg <span className="text-emerald-600">(-{metrics.milestone1Loss}kg sau ~{metrics.milestone1Weeks} tuần)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Giảm ngay <strong>~30% lượng mỡ trong gan</strong>, cải thiện nhạy cảm Insulin.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="bg-sky-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg shrink-0">
                  MỐC 2 (-10%)
                </span>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-800">
                    Đạt {metrics.milestone2Weight} kg <span className="text-sky-600">(-{metrics.milestone2Loss}kg sau ~{metrics.milestone2Weeks} tuần)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Đảo ngược <strong>viêm gan nhiễm mỡ (MASH)</strong> & hạ men gan về chuẩn.
                  </p>
                </div>
              </div>
            </div>

            {/* Quy đổi khẩu phần bằng bàn tay trực quan */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <Hand className="w-4 h-4" />
                <span>Quy đổi Bàn Tay 1 Ngày:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  👊 <strong>4 nắm đấm</strong> Rau xanh
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  ✋ <strong>{portionEquivalents.proteinPalms} lòng bàn tay</strong> Đạm nạc
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  ✊ <strong>{portionEquivalents.carbFists} nắm tay</strong> Tinh bột chậm
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                  👍 <strong>2 ngón cái</strong> Chất béo tốt
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            THANH ĐIỀU HƯỚNG 3 PHÂN HỆ TRỌNG TÂM (MAIN NAVIGATION TABS)
        ========================================== */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setMainTab('30days')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
              mainTab === '30days'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>1. Thư Viện {DISHES.length} Món Dễ Nấu & Healthy</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
              MỚI
            </span>
          </button>

          <button
            onClick={() => setMainTab('office_dining')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
              mainTab === 'office_dining'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>2. Ăn Vặt Văn Phòng & Bí Kíp Ăn Hàng Quán</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
              HOT
            </span>
          </button>

          <button
            onClick={() => setMainTab('builder')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
              mainTab === 'builder'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>3. Tự Thiết Kế Bữa Ăn & Cẩm Nang Đèn Giao Thông</span>
          </button>

          <button
            onClick={() => setMainTab('tracker')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 ${
              mainTab === 'tracker'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>4. Theo Dõi Của Tôi</span>
          </button>
        </div>

        {/* ==========================================
            TAB 1: THỰC ĐƠN 30 NGÀY THUẦN VIỆT - DỄ CHẾ BIẾN & HEALTHY
        ========================================== */}
        {mainTab === 'tracker' && (
          <Tracker
            store={health}
            targetCalories={metrics.targetCalories}
            milestone1Weight={metrics.milestone1Weight}
            milestone2Weight={metrics.milestone2Weight}
            builder={{
              kcal: customMenuData.totalKcal,
              protein: customMenuData.totalProtein,
              carb: customMenuData.totalCarb,
              fat: customMenuData.totalFat
            }}
          />
        )}

        {mainTab === '30days' && <Recipes />}

        {/* ==========================================
            TAB 2: ĂN VẶT VĂN PHÒNG & BÍ KÍP ĂN HÀNG QUÁN
        ========================================== */}
        {mainTab === 'office_dining' && (
          <section className="space-y-8">
            {/* PHÂN KHU A: MÓN ĂN VẶT VĂN PHÒNG CHUẨN GAN NHIỄM MỠ */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                      Phân Khu A: Danh Sách Món Ăn Vặt Văn Phòng Chuẩn Gan Nhiễm Mỡ
                    </h2>
                    <p className="text-xs text-slate-500">
                      Giải pháp chống đói và buồn miệng lúc 15h30 - 16h30 chiều mà không làm tăng đường huyết & mỡ gan
                    </p>
                  </div>
                </div>

                {/* Bộ lọc theo nhu cầu */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'protein', label: '🥚 Giàu Đạm - No Lâu' },
                    { id: 'crunchy', label: '🍐 Giòn Ngon - Ít Calo' },
                    { id: 'drink', label: '☕ Đồ Uống Bảo Vệ Gan' },
                    { id: 'red_list', label: '🚫 Đèn Đỏ Cần Tránh' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSnackFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        snackFilter === f.id
                          ? f.id === 'red_list'
                            ? 'bg-rose-600 text-white'
                            : 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lưới các món ăn vặt */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {OFFICE_SNACKS.filter((s) =>
                  snackFilter === 'all' ? true : s.category === snackFilter
                ).map((snack) => {
                  const isRed = snack.category === 'red_list';
                  return (
                    <div
                      key={snack.id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between ${
                        isRed
                          ? 'bg-rose-50/40 border-rose-200'
                          : 'bg-slate-50/60 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              isRed
                                ? 'bg-rose-600 text-white'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {snack.badge}
                          </span>
                          <span className="text-xs font-extrabold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {snack.kcal} kcal
                          </span>
                        </div>

                        <h3
                          className={`text-sm font-extrabold ${
                            isRed ? 'text-rose-900' : 'text-slate-800'
                          }`}
                        >
                          {snack.name}
                        </h3>

                        <div className="mt-2 space-y-1 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80">
                          <div className="flex justify-between">
                            <span>Khẩu phần 1 lần:</span>
                            <strong className="text-slate-800">{snack.portion}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Chỉ số đường huyết:</span>
                            <strong className={isRed ? 'text-rose-600' : 'text-emerald-700'}>
                              {snack.gi}
                            </strong>
                          </div>
                          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                            Carb: {snack.carb}g • Đạm: {snack.protein}g • Béo: {snack.fat}g
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                          <strong className={isRed ? 'text-rose-700' : 'text-emerald-800'}>
                            Giải thích Y khoa:{' '}
                          </strong>
                          {snack.liverNote}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bảng Hoán Đổi Thông Minh Tại Văn Phòng */}
              <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowLeftRight className="w-5 h-5 text-emerald-300" />
                  <h3 className="text-sm sm:text-base font-extrabold">
                    Bảng Hoán Đổi Thông Minh Tại Văn Phòng (Smart Office Swaps)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {OFFICE_SMART_SWAPS.map((swap, idx) => (
                    <div
                      key={idx}
                      className="bg-black/25 p-3.5 rounded-xl border border-white/10 space-y-2 text-xs"
                    >
                      <div className="flex items-start gap-2 text-rose-200">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Thói quen cũ:</strong> {swap.bad}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong>Đổi sang:</strong> {swap.good}
                        </span>
                      </div>
                      <div className="pt-1.5 border-t border-white/10 flex justify-between text-[11px] font-bold text-amber-300">
                        <span>⚡ Cắt giảm ngay: -{swap.savedKcal} kcal</span>
                        <span>Giảm tải cho gan: -{swap.savedSugar}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PHÂN KHU B: THỰC ĐƠN & CẨM NANG KHI ĐI ĂN HÀNG QUÁN BÊN NGOÀI */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                      Phân Khu B: Bí Kíp Gọi Món Khi Đi Ăn Hàng Quán Bên Ngoài (Order Hacks)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Giảm ngay 250 – 450 kcal/bữa chỉ bằng 1 câu dặn chủ quán mà vẫn ăn ngon miệng cùng đồng nghiệp
                    </p>
                  </div>
                </div>

                {/* Bộ lọc tình huống hàng quán */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tất cả quán' },
                    { id: 'noodle', label: '🍜 Quán Bún / Phở / Miến' },
                    { id: 'rice', label: '🍱 Cơm Văn Phòng / Cơm Tấm' },
                    { id: 'hotpot', label: '🍲 Lẩu / Nướng Liên Hoan' },
                    { id: 'party', label: '🍻 Tiếp Khách / Quán Nhậu' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setDiningCategory(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        diningCategory === c.id
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh sách thẻ Bí kíp gọi món */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {DINING_OUT_GUIDE.filter((d) =>
                  diningCategory === 'all' ? true : d.category === diningCategory
                ).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
                          {item.name}
                        </h3>
                        <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                          Tiết kiệm -{item.normalKcal - item.hackKcal} kcal
                        </span>
                      </div>

                      {/* So sánh Gọi bình thường vs Order Hack */}
                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div className="bg-rose-50/70 border border-rose-200 p-2.5 rounded-xl">
                          <div className="font-extrabold text-rose-800 flex justify-between">
                            <span>❌ Gọi bình thường</span>
                            <span>{item.normalKcal} kcal</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1">{item.normalDesc}</p>
                          <div className="text-[10px] text-rose-700 font-semibold mt-1">
                            C: {item.normalMacro.carb}g | P: {item.normalMacro.pro}g | F: {item.normalMacro.fat}g
                          </div>
                        </div>

                        <div className="bg-emerald-50/80 border border-emerald-300 p-2.5 rounded-xl">
                          <div className="font-extrabold text-emerald-800 flex justify-between">
                            <span>✅ Chuẩn Gan Khỏe</span>
                            <span>{item.hackKcal} kcal</span>
                          </div>
                          <p className="text-[11px] text-slate-700 mt-1">{item.hackDesc}</p>
                          <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                            C: {item.hackMacro.carb}g | P: {item.hackMacro.pro}g | F: {item.hackMacro.fat}g
                          </div>
                        </div>
                      </div>

                      {/* Câu thần chú gọi chủ quán */}
                      <div className="mt-3 bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs">
                        <div className="font-extrabold text-amber-900 flex items-center gap-1.5 mb-1">
                          <MessageSquareQuote className="w-4 h-4 text-amber-600" />
                          <span>Câu thần chú dặn chủ quán:</span>
                        </div>
                        <p className="italic font-semibold text-amber-950">{item.orderMantra}</p>
                      </div>

                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        <strong>💡 Mẹo bàn ăn:</strong> {item.medicalTip}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDiningItemId(item.id);
                        setDiningOrderMode('hack');
                      }}
                      className="w-full py-2 rounded-xl bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold transition"
                    >
                      Đưa món này vào Công cụ Ước tính & Bù trừ bữa tối bên dưới ↓
                    </button>
                  </div>
                ))}
              </div>

              {/* CÔNG CỤ TƯƠNG TÁC: ƯỚC TÍNH NHANH BỮA ĂN HÀNG QUÁN & GỢI Ý BÙ TRỪ BỮA TỐI */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 text-white rounded-2xl p-5 sm:p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-emerald-400">
                      Công Cụ Tương Tác Thông Minh
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold mt-0.5">
                      Ước Tính Nhanh Bữa Ăn Hàng Quán & Tự Động Điều Chỉnh Bữa Tối
                    </h3>
                  </div>
                  <span className="text-xs bg-white/10 px-3 py-1.5 rounded-xl">
                    Quỹ Calo cả ngày của bạn: <strong>{metrics.targetCalories} kcal</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Cột chọn món vừa ăn ngoài quán (5/12) */}
                  <div className="lg:col-span-5 space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                        1. Chọn món bạn vừa ăn (hoặc sắp ăn) ngoài quán:
                      </label>
                      <select
                        value={selectedDiningItemId}
                        onChange={(e) => setSelectedDiningItemId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-bold bg-slate-800 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        {DINING_OUT_GUIDE.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                        2. Cách bạn gọi món:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setDiningOrderMode('hack')}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                            diningOrderMode === 'hack'
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          ✅ Đã áp dụng Mẹo Order Hack ({diningSimulation.item.hackKcal} kcal)
                        </button>
                        <button
                          onClick={() => setDiningOrderMode('normal')}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                            diningOrderMode === 'normal'
                              ? 'bg-rose-600 border-rose-400 text-white'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          ❌ Gọi bình thường ({diningSimulation.item.normalKcal} kcal)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cột Kết quả phân tích & Gợi ý bữa tối (7/12) */}
                  <div className="lg:col-span-7 bg-white/10 rounded-2xl p-4 border border-white/10 space-y-3">
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="bg-black/30 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-300 uppercase">Chiếm quỹ Calo ngày</div>
                        <div className="text-lg font-extrabold text-amber-300">
                          {diningSimulation.pctDailyKcal}% ({diningSimulation.mealKcal} kcal)
                        </div>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-300 uppercase">Chiếm quỹ Tinh bột</div>
                        <div className="text-lg font-extrabold text-emerald-300">
                          {diningSimulation.pctDailyCarb}% ({diningSimulation.mealMacro.carb}g)
                        </div>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-xl">
                        <div className="text-[10px] text-slate-300 uppercase">Chiếm quỹ Chất béo</div>
                        <div className="text-lg font-extrabold text-sky-300">
                          {diningSimulation.pctDailyFat}% ({diningSimulation.mealMacro.fat}g)
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-950/70 border border-emerald-500/40 p-3.5 rounded-xl text-xs space-y-1.5">
                      <div className="font-extrabold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Phác đồ bù trừ bữa tối & vận động cho riêng hôm nay:</span>
                      </div>
                      <p className="text-slate-100 leading-relaxed">
                        {diningSimulation.dinnerAdvice}
                      </p>
                      <div className="pt-1 text-amber-300 font-bold">
                        🏃‍♂️ Vận động sau ăn: Đi bộ nhẹ nhàng {diningSimulation.walkMinutes} phút sau bữa ăn để cơ bắp tiêu thụ ngay lượng đường trong máu!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==========================================
            TAB 3: TỰ THIẾT KẾ BỮA ĂN TRONG NGÀY & CẨM NANG ĐÈN GIAO THÔNG
        ========================================== */}
        {mainTab === 'builder' && (
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-800">
                    Công Cụ Tự Lắp Ghép Bữa Ăn Trong Ngày (Interactive Meal Builder)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Chọn bữa ăn bên phải và bấm dấu (+) ở kho thực phẩm bên trái để tự thiết kế thực đơn chuẩn {metrics.targetCalories} kcal
                  </p>
                </div>
              </div>

              {/* Thanh tiến độ Macro thực tế so với mục tiêu */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {[
                  { label: 'Tổng Calo', current: customMenuData.totalKcal, target: metrics.targetCalories, unit: 'kcal', color: 'bg-emerald-500' },
                  { label: 'Tinh bột (Carb)', current: customMenuData.totalCarb, target: metrics.carbGrams, unit: 'g', color: 'bg-emerald-500' },
                  { label: 'Đạm nạc (Protein)', current: customMenuData.totalProtein, target: metrics.proteinGrams, unit: 'g', color: 'bg-sky-500' },
                  { label: 'Chất béo (Fat)', current: customMenuData.totalFat, target: metrics.fatGrams, unit: 'g', color: 'bg-amber-500' },
                  { label: 'Chất xơ (Fiber)', current: customMenuData.totalFiber, target: metrics.fiberTarget, unit: 'g', color: 'bg-teal-500' }
                ].map((bar, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>{bar.label}</span>
                      <span className="text-slate-800">
                        {bar.current}/{bar.target}{bar.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bar.color} transition-all`}
                        style={{
                          width: `${Math.min(100, Math.round((bar.current / bar.target) * 100))}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Giao diện 2 cột lắp ghép */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col h-[520px]">
                  <div className="mb-3">
                    <div className="text-xs font-bold text-slate-700 mb-2">
                      Đang thêm món vào:{' '}
                      <span className="text-emerald-700 uppercase underline">
                        {MEAL_SLOTS_INFO.find((s) => s.key === activeMealSlot)?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'all', label: 'Tất cả' },
                        { id: 'carb', label: '🍚 Tinh bột chậm' },
                        { id: 'protein', label: '🐟 Đạm nạc' },
                        { id: 'veggie', label: '🥦 Rau xanh' },
                        { id: 'fat', label: '🫒 Béo tốt & Bữa phụ' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setFoodCategoryFilter(cat.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                            foodCategoryFilter === cat.id
                              ? 'bg-slate-800 text-white'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                    {FOOD_DATABASE.filter(
                      (f) => foodCategoryFilter === 'all' || f.category === foodCategoryFilter
                    ).map((food) => (
                      <div
                        key={food.id}
                        className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-800">{food.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {food.unit} • <strong>{food.kcal} kcal</strong> (C:{food.carb}g P:{food.protein}g F:{food.fat}g)
                          </div>
                        </div>
                        <button
                          onClick={() => addFoodToCustomMeal(food.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MEAL_SLOTS_INFO.map((slot) => {
                    const isSelected = activeMealSlot === slot.key;
                    const slotData = customMenuData.mealBreakdowns[slot.key];
                    return (
                      <div
                        key={slot.key}
                        onClick={() => setActiveMealSlot(slot.key)}
                        className={`rounded-2xl border p-4 cursor-pointer transition ${
                          isSelected
                            ? 'bg-emerald-50/40 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                          <div>
                            <span className="text-xs font-extrabold uppercase text-emerald-800">
                              {slot.label}
                            </span>
                            <div className="text-[11px] text-slate-500">Chuẩn: ~{slot.target} kcal</div>
                          </div>
                          <span className="text-base font-extrabold text-slate-800">
                            {slotData.kcal} kcal
                          </span>
                        </div>

                        <div className="space-y-2 max-h-56 overflow-y-auto">
                          {slotData.items.map((item) => (
                            <div
                              key={item.id}
                              className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-800 truncate">
                                  {item.name}
                                </div>
                                <div className="text-[11px] text-emerald-700 font-medium">
                                  {item.itemGrams}g • {item.itemKcal} kcal
                                </div>
                              </div>
                              <div
                                className="flex items-center gap-1 shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  onClick={() => updateCustomServings(slot.key, item.id, -0.5)}
                                  className="p-1 rounded bg-white border border-slate-200"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-6 text-center">
                                  {item.rawServings}
                                </span>
                                <button
                                  onClick={() => updateCustomServings(slot.key, item.id, 0.5)}
                                  className="p-1 rounded bg-white border border-slate-200"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cẩm nang Đèn Giao Thông */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <h3 className="text-base font-extrabold text-slate-800">
                  Cẩm Nang Đèn Giao Thông Thực Phẩm Cho Người Gan Nhiễm Mỡ
                </h3>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tra cứu nhanh thực phẩm..."
                    value={trafficSearch}
                    onChange={(e) => setTrafficSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  { data: TRAFFIC_LIGHT_DATA.green, border: 'border-emerald-200 bg-emerald-50/30', dot: 'bg-emerald-500' },
                  { data: TRAFFIC_LIGHT_DATA.yellow, border: 'border-amber-200 bg-amber-50/30', dot: 'bg-amber-500' },
                  { data: TRAFFIC_LIGHT_DATA.red, border: 'border-rose-200 bg-rose-50/30', dot: 'bg-rose-500' }
                ].map((col, idx) => (
                  <div key={idx} className={`rounded-2xl border-2 ${col.border} p-4 space-y-2.5`}>
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                      <span className={`w-3.5 h-3.5 rounded-full ${col.dot}`} />
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">
                        {col.data.title}
                      </h4>
                    </div>
                    {col.data.items
                      .filter((i) =>
                        i.name.toLowerCase().includes(trafficSearch.toLowerCase()) ||
                        i.benefit.toLowerCase().includes(trafficSearch.toLowerCase())
                      )
                      .map((item, j) => (
                        <div key={j} className="bg-white p-3 rounded-xl border border-slate-200/80">
                          <div className="flex justify-between gap-2 text-xs font-bold text-slate-800">
                            <span>{item.name}</span>
                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                              {item.portion}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.benefit}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}