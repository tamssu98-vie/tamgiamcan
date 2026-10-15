// Món ăn vặt văn phòng bổ sung. kcal tính từ macro (4C + 4P + 9F). Ghi chú chỉ mang tính tham khảo.
type Cat = 'protein' | 'crunchy' | 'drink' | 'red_list';
// [nhóm, tên, khẩu phần, C(g), P(g), F(g), GI (L thấp / M trung bình / H cao), ghi chú]
type Row = [Cat, string, string, number, number, number, 'L' | 'M' | 'H', string];

const GI = { L: 'GI thấp (ít làm tăng đường huyết)', M: 'GI trung bình', H: 'GI cao (tăng đường huyết nhanh)' };
const BADGE: Record<Cat, string> = { protein: 'Giàu đạm - no lâu', crunchy: 'Giòn ngon - ít calo', drink: 'Đồ uống nhẹ', red_list: 'Đèn đỏ - hạn chế' };

const ROWS: Row[] = [
  // ---- Giàu đạm - no lâu ----
  ['protein', 'Trứng luộc (1 quả)', '1 quả', 1, 6, 5, 'L', 'Đạm chất lượng cao, no lâu, dễ mang theo; nên ăn kèm rau hoặc trái cây.'],
  ['protein', 'Trứng cút luộc', '6 quả', 1, 8, 7, 'L', 'Nhỏ gọn, ít calo; chấm muối tiêu thay vì mayonnaise.'],
  ['protein', 'Sữa chua không đường', '1 hộp 100g', 6, 5, 3, 'L', 'Có men vi sinh, đạm tốt; chọn loại không đường.'],
  ['protein', 'Sữa chua Hy Lạp không đường', '1 hộp 150g', 6, 15, 4, 'L', 'Đạm cao gấp đôi sữa chua thường, rất no.'],
  ['protein', 'Đậu hũ non ăn liền chấm xì dầu', '1 hộp', 3, 8, 4, 'L', 'Đạm thực vật, ít calo; chọn xì dầu giảm muối.'],
  ['protein', 'Đậu phụ chiên nồi chiên không dầu', '1 bìa nhỏ', 3, 9, 6, 'L', 'Làm sẵn ở nhà, giòn mà không dầu.'],
  ['protein', 'Ức gà xé muối tiêu', '60g', 0, 18, 2, 'L', 'Đạm nạc, no lâu; chọn loại không tẩm đường.'],
  ['protein', 'Thịt bò khô tự làm ít đường', '30g', 5, 14, 3, 'L', 'Đạm cao; hàng bán sẵn thường nhiều đường và muối nên đọc nhãn.'],
  ['protein', 'Cá ngừ ngâm nước + 2 lát bánh mì nguyên cám', '1/2 hộp', 22, 18, 3, 'M', 'Đạm nhanh; chọn loại ngâm nước, bỏ nước sốt.'],
  ['protein', 'Edamame luộc', '1 chén nhỏ (80g)', 7, 10, 5, 'L', 'Đạm thực vật và chất xơ, giữ no lâu.'],
  ['protein', 'Đậu gà (hummus) + cà rốt que', '3 muỗng + 1 củ', 16, 6, 7, 'L', 'Chất xơ cao, no lâu; hummus tự làm ít dầu hơn hàng sẵn.'],
  ['protein', 'Sữa đậu nành không đường', '1 hộp 250ml', 5, 8, 5, 'L', 'Đạm thực vật; chọn loại không đường.'],
  ['protein', 'Phô mai que ít béo', '1 que', 1, 6, 4, 'L', 'Tiện lợi, đạm khá; chú ý lượng muối.'],
  ['protein', 'Bánh mì nguyên cám kẹp trứng luộc', '1 ổ nhỏ', 24, 10, 6, 'M', 'Bữa phụ chắc bụng cho chiều dài; không phết bơ hay sốt.'],
  ['protein', 'Whey/sữa đậu nành pha loãng (không đường)', '1 ly', 4, 20, 2, 'L', 'Đạm cao khi không kịp ăn; dùng như bổ sung, không thay bữa chính.'],
  ['protein', 'Bắp cải cuộn trứng cút (tự làm)', '1 phần nhỏ', 6, 9, 5, 'L', 'Món nhẹ làm sẵn ở nhà, hấp rồi để hộp.'],
  // ---- Giòn ngon - ít calo ----
  ['crunchy', 'Dưa leo cắt khoanh + muối tiêu chanh', '1 quả', 5, 1, 0, 'L', 'Rất ít calo, nhiều nước, giải khát lúc buồn miệng.'],
  ['crunchy', 'Cà rốt que', '1 củ vừa', 10, 1, 0, 'L', 'Giòn, nhiều chất xơ; chấm hummus hoặc sữa chua.'],
  ['crunchy', 'Cần tây que chấm sữa chua', '3 cọng', 4, 3, 1, 'L', 'Calo gần như bằng không, nhai lâu nên đỡ thèm.'],
  ['crunchy', 'Cà chua bi', '10 quả (150g)', 6, 1, 0, 'L', 'Ngọt nhẹ, ít calo, nhiều nước.'],
  ['crunchy', 'Táo xanh', '1 quả nhỏ (120g)', 17, 0, 0, 'L', 'Chất xơ pectin giúp no; ăn cả vỏ đã rửa kỹ.'],
  ['crunchy', 'Lê', '1 quả nhỏ (150g)', 20, 0, 0, 'L', 'Nhiều nước và xơ, ngọt dịu.'],
  ['crunchy', 'Ổi', '1/2 quả (100g)', 10, 2, 0, 'L', 'Rất nhiều chất xơ và vitamin C.'],
  ['crunchy', 'Bưởi', '3-4 múi (100g)', 9, 1, 0, 'L', 'Ít ngọt, nhiều nước; hỏi bác sĩ nếu đang dùng một số loại thuốc.'],
  ['crunchy', 'Dâu tây', '8 quả (120g)', 9, 1, 0, 'L', 'Ít đường, nhiều chất chống oxy hóa.'],
  ['crunchy', 'Việt quất', '1/2 chén (70g)', 10, 1, 0, 'L', 'Chất chống oxy hóa; mua đông lạnh cho rẻ.'],
  ['crunchy', 'Thanh long ruột đỏ', '1/2 quả (150g)', 17, 2, 0, 'L', 'Chất xơ cao, ngọt dịu.'],
  ['crunchy', 'Cam', '1 quả (150g)', 17, 1, 0, 'L', 'Ăn nguyên quả để có xơ, tránh vắt uống.'],
  ['crunchy', 'Kiwi', '1 quả', 11, 1, 0, 'L', 'Nhiều vitamin C và xơ.'],
  ['crunchy', 'Dưa lưới', '150g', 11, 1, 0, 'M', 'Ít calo, nhiều nước; không ăn quá nhiều một lúc.'],
  ['crunchy', 'Ngô luộc nhỏ', '1/2 bắp', 15, 2, 1, 'M', 'Xơ khá tốt; không phết bơ.'],
  ['crunchy', 'Khoai lang luộc', '1 củ nhỏ (100g)', 22, 1, 0, 'M', 'Tinh bột chậm, no lâu hơn bánh kẹo.'],
  ['crunchy', 'Rong biển nướng không đường', '1 gói nhỏ', 2, 2, 1, 'L', 'Giòn, ít calo; đọc nhãn để chọn loại ít muối.'],
  ['crunchy', 'Bỏng ngô tự làm không bơ', '2 chén', 12, 2, 1, 'M', 'Nhiều thể tích, ít calo nếu không bơ, không đường.'],
  ['crunchy', 'Hạnh nhân rang không muối', '10 hạt', 2, 3, 8, 'L', 'Chất béo tốt; đếm hạt vì rất dễ ăn quá.'],
  ['crunchy', 'Óc chó', '3-4 hạt (15g)', 2, 2, 10, 'L', 'Có omega-3 thực vật; ăn đúng khẩu phần nhỏ.'],
  ['crunchy', 'Hạt điều rang không muối', '8 hạt', 4, 3, 7, 'L', 'Béo tốt, nhưng nhiều calo nên đếm hạt.'],
  ['crunchy', 'Hạt bí/hạt hướng dương không muối', '1 nắm nhỏ (20g)', 3, 5, 9, 'L', 'Nhiều khoáng chất; chọn loại không tẩm vị.'],
  ['crunchy', 'Đậu phộng rang không muối', '15 hạt', 3, 4, 8, 'L', 'Béo tốt và đạm; tránh loại tẩm bột, tẩm đường.'],
  ['crunchy', 'Su hào / củ cải trắng chấm muối ớt', '1/2 củ nhỏ', 6, 1, 0, 'L', 'Giòn mát, gần như không calo.'],
  ['crunchy', 'Salad cuộn rau củ nhỏ', '1 phần', 8, 2, 3, 'L', 'Nhẹ bụng; dùng sốt chanh thay sốt béo.'],
  ['crunchy', 'Khoai lang sấy giòn không đường', '30g', 22, 1, 1, 'M', 'Tinh bột chậm hơn snack chiên; chú ý khẩu phần.'],
  ['crunchy', 'Chuối nhỏ', '1 quả (80g)', 18, 1, 0, 'M', 'Năng lượng nhanh trước buổi tập hoặc họp dài.'],
  // ---- Đồ uống nhẹ ----
  ['drink', 'Trà xanh không đường', '1 ly 250ml', 0, 0, 0, 'L', 'Gần 0 calo; uống sau ăn, tránh uống sát giờ ngủ.'],
  ['drink', 'Trà gừng ấm', '1 ly 250ml', 1, 0, 0, 'L', 'Ấm bụng, dễ chịu khi điều hòa lạnh; không thêm đường.'],
  ['drink', 'Trà hoa cúc', '1 ly 250ml', 0, 0, 0, 'L', 'Dịu nhẹ, hợp buổi chiều.'],
  ['drink', 'Trà atiso không đường', '1 ly 250ml', 1, 0, 0, 'L', 'Vị thanh mát, uống thay nước ngọt.'],
  ['drink', 'Trà gạo lứt / trà mạch nha rang', '1 ly 250ml', 1, 0, 0, 'L', 'Thơm, không caffeine; không đường.'],
  ['drink', 'Trà bạc hà', '1 ly', 0, 0, 0, 'L', 'Tỉnh táo nhẹ, không caffeine.'],
  ['drink', 'Nước lọc + vài lát chanh/dưa leo', '500ml', 2, 0, 0, 'L', 'Dễ uống hơn nước lọc, nhắc uống đủ nước.'],
  ['drink', 'Nước dừa tươi', '1 ly 200ml', 8, 1, 0, 'M', 'Bù điện giải, nhưng có đường tự nhiên; 1 ly là đủ.'],
  ['drink', 'Sữa tươi không đường', '1 hộp 180ml', 9, 6, 6, 'L', 'Đạm và canxi; chọn loại không đường.'],
  ['drink', 'Sữa hạnh nhân không đường', '1 ly 200ml', 1, 1, 3, 'L', 'Ít calo, thay thế sữa bò.'],
  ['drink', 'Cà phê sữa tươi ít đường', '1 ly nhỏ', 8, 4, 3, 'M', 'Thay cà phê sữa đặc; thử bỏ hẳn đường sau 2 tuần.'],
  ['drink', 'Latte/cappuccino không đường', '1 ly nhỏ', 8, 6, 5, 'L', 'Có sữa nên no hơn cà phê đen; không siro.'],
  ['drink', 'Nước ép cần tây', '1 ly 200ml', 3, 1, 0, 'L', 'Gần như không đường; vị khó uống nên pha thêm chanh.'],
  ['drink', 'Nước ép cà chua không muối', '1 ly 200ml', 8, 2, 0, 'L', 'Nhiều lycopene; chọn loại không đường.'],
  ['drink', 'Nước chanh muối không đường', '1 ly', 3, 0, 0, 'L', 'Giải khát nhẹ; không dùng siro đường.'],
  ['drink', 'Nước sâm mát (tự nấu ít đường)', '1 ly', 8, 0, 0, 'M', 'Thanh nhiệt; nấu tại nhà để chủ động lượng đường.'],
  // ---- Đèn đỏ - hạn chế ----
  ['red_list', 'Trà sữa trân châu full đường', '1 ly 500ml', 70, 3, 10, 'H', 'Một ly có thể 400-550 kcal, nhiều đường; nếu thèm, chọn size nhỏ, 30% đường, không topping.'],
  ['red_list', 'Nước ngọt có ga', '1 lon 330ml', 35, 0, 0, 'H', 'Đường tự do cao, không no; thay bằng nước có ga không đường.'],
  ['red_list', 'Bánh ngọt / bánh kem', '1 miếng', 40, 4, 18, 'H', 'Đường và béo bão hòa cao; để dành dịp đặc biệt.'],
  ['red_list', 'Bánh quy kem', '3 cái', 22, 2, 8, 'H', 'Đường, bột trắng và béo; dễ ăn quá lố.'],
  ['red_list', 'Snack khoai tây chiên', '1 gói nhỏ 30g', 17, 2, 10, 'H', 'Chiên dầu, nhiều muối; thay bằng bỏng ngô tự làm.'],
  ['red_list', 'Xúc xích, chả lụa chiên', '2 cây', 4, 10, 18, 'M', 'Mỡ và muối cao; chọn thịt luộc nạc thay thế.'],
  ['red_list', 'Mì ăn liền', '1 gói', 54, 8, 17, 'H', 'Tinh bột tinh chế, mỡ, nhiều muối; không nên ăn thường xuyên.'],
  ['red_list', 'Kẹo, socola sữa', '3-4 viên', 18, 1, 6, 'H', 'Đường cao nên dễ thèm thêm; chọn socola đen 70% một ô nhỏ.'],
  ['red_list', 'Chè, sữa chua nếp cẩm nhiều đường', '1 ly', 45, 4, 5, 'H', 'Đường cao; nếu ăn, chọn ly nhỏ ít đường.'],
  ['red_list', 'Khô gà, mực khô tẩm đường', '50g', 20, 20, 4, 'M', 'Đạm tốt nhưng tẩm đường và muối; đọc nhãn.'],
  ['red_list', 'Bánh tráng trộn, bánh tráng nướng phết', '1 phần', 40, 6, 14, 'H', 'Nhiều dầu, sốt, muối; ăn thỉnh thoảng, bớt sốt.'],
  ['red_list', 'Trái cây sấy tẩm đường, mứt', '30g', 22, 0, 0, 'H', 'Đường cô đặc; chọn trái cây tươi thay thế.']
];

export const EXTRA_SNACKS = ROWS.map(([category, name, portion, carb, protein, fat, gi, liverNote], i) => ({
  id: 'sx' + (i + 1), name, category, portion, kcal: Math.round(4 * carb + 4 * protein + 9 * fat), carb, protein, fat, gi: GI[gi], badge: BADGE[category], liverNote
}));
