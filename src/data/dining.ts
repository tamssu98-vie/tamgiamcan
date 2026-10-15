// Mẹo gọi món khi ăn hàng quán, bổ sung. kcal tính từ macro (4C + 4P + 9F); số liệu là ước tính theo khẩu phần phổ biến.
export type DiningCat = 'noodle' | 'rice' | 'hotpot' | 'party' | 'street' | 'fast' | 'drink' | 'world';
type M = [number, number, number]; // [C, P, F] (g)
// [nhóm, tên, mô tả gọi bình thường, macro, câu gọi món "chuẩn" (đặt sau "Cho em ..."), macro, mẹo]
type Row = [DiningCat, string, string, M, string, M, string];

const kcal = ([c, p, f]: M) => Math.round(4 * c + 4 * p + 9 * f);

const ROWS: Row[] = [
  // ---- Bún / Phở / Miến ----
  ['noodle', 'Bún Bò Huế', 'Bún bò giò heo, chả, tiết, váng mỡ ớt, húp hết nước', [80, 30, 26], '1 tô bún bò thịt bò nạc, bỏ giò heo, hớt mỡ nổi, 2/3 bún, thêm rau sống', [55, 34, 10], 'Phần béo nằm ở mỡ nổi và giò heo; hớt mỡ và ăn rau trước giúp giảm khá nhiều calo.'],
  ['noodle', 'Bún Riêu Cua', 'Bún riêu, chả, đậu rán, mỡ hành, nhiều bún', [78, 24, 26], '1 tô bún riêu thêm cà chua, đậu phụ luộc thay đậu rán, 2/3 bún', [52, 26, 9], 'Đậu rán và mỡ hành là phần tăng calo; đổi sang đậu luộc là đủ.'],
  ['noodle', 'Bún Đậu Mắm Tôm', 'Đậu rán, chả cốm, dồi, lòng, ăn nhiều bún lá', [85, 30, 42], '1 mẹt đậu luộc/nướng, thịt luộc nạc, ít bún lá, thêm nhiều rau sống', [50, 28, 14], 'Chiên rán là nguồn béo chính; chọn luộc hoặc nướng, giảm bún lá còn một nửa.'],
  ['noodle', 'Mì Quảng', 'Mì Quảng thịt heo, trứng cút, bánh tráng nướng, nước béo', [85, 28, 28], '1 tô mì Quảng gà hoặc tôm, ít nước béo, 2/3 mì, nhiều rau sống', [55, 30, 9], 'Nước béo và bánh tráng chiên giòn cộng thêm nhiều calo; bỏ bánh tráng, ít nước.'],
  ['noodle', 'Miến Lươn / Miến Gà', 'Miến lươn chiên giòn, nước béo', [60, 26, 24], '1 tô miến gà nước trong, bỏ da gà, nhiều hành và rau', [50, 30, 6], 'Chiên giòn làm tăng béo; gà bỏ da giữ đạm mà giảm mỡ.'],
  ['noodle', 'Bún Mọc / Bún Thang', 'Bún mọc nhiều giò sống, sườn, mỡ nổi', [70, 28, 20], '1 tô bún thang/mọc nhiều rau, ít giò, bỏ mỡ nổi, 2/3 bún', [50, 28, 8], 'Nước dùng ninh xương thường nhiều mỡ; hớt mỡ trước khi ăn.'],
  ['noodle', 'Bánh Canh Cua / Giò Heo', 'Bánh canh sệt, giò heo, chả, nhiều bột', [85, 28, 20], '1 tô bánh canh cua tôm, bỏ giò heo, 2/3 bánh', [55, 26, 8], 'Nước sệt có nhiều bột; ăn ít bánh, nhiều đạm và rau.'],
  ['noodle', 'Cháo Lòng / Cháo Sườn', 'Cháo lòng, huyết, quẩy chiên', [70, 24, 25], '1 tô cháo thịt nạc hoặc gà, bỏ quẩy, thêm hành và rau', [48, 24, 8], 'Quẩy chiên và nội tạng nhiều mỡ; chọn thịt nạc hoặc gà.'],
  ['noodle', 'Bún Cá / Bún Chả Cá', 'Bún chả cá chiên, nước béo', [72, 26, 18], '1 tô bún cá rô phi, chả cá hấp thay chiên, ít bún', [50, 30, 6], 'Cá luộc hoặc hấp ít béo hơn chả cá chiên.'],
  // ---- Cơm văn phòng / cơm tấm ----
  ['rice', 'Cơm Gà Xối Mỡ', 'Gà rán da giòn, cơm chiên, nhiều nước sốt', [90, 35, 38], '1 phần cơm gà luộc/nướng bỏ da, cơm trắng 2/3 chén, thêm rau', [60, 38, 10], 'Da gà và cơm chiên mỡ là phần calo cao; đổi sang gà luộc bỏ da.'],
  ['rice', 'Cơm Gà Hải Nam', 'Cơm nấu mỡ gà, đùi gà cả da', [85, 32, 25], '1 phần ức gà luộc bỏ da, 2/3 chén cơm, thêm dưa leo', [58, 36, 8], 'Cơm nấu mỡ gà đã nhiều béo; ăn ít cơm, nhiều đạm.'],
  ['rice', 'Cơm Tấm Sườn Bì Chả', 'Sườn nướng mỡ, bì, chả, cơm đầy, mỡ hành', [100, 36, 34], '1 dĩa cơm tấm sườn nạc, thêm trứng ốp la, nhiều dưa chua, bỏ mỡ hành, 2/3 cơm', [65, 34, 18], 'Bì và mỡ hành ít đạm mà nhiều calo; ăn kèm dưa leo cà chua.'],
  ['rice', 'Cơm Thịt Kho Trứng', 'Thịt ba chỉ kho nước màu, trứng, cơm đầy', [95, 30, 38], '1 phần thịt nạc kho ít nước màu, 1 trứng, rau luộc, 2/3 cơm', [62, 32, 17], 'Chọn thịt nạc, lấy ít nước kho và thêm rau luộc.'],
  ['rice', 'Cơm Rang Dưa Bò / Dương Châu', 'Cơm chiên nhiều dầu, lạp xưởng, trứng', [100, 22, 28], '1 phần cơm rang ít dầu nhiều trứng và rau, bỏ lạp xưởng', [70, 22, 14], 'Cơm chiên thường nhiều dầu; xin ít dầu, thêm rau.'],
  ['rice', 'Cơm Văn Phòng (Suất Thịt Kho)', 'Cơm đầy, thịt kho, trứng chiên, canh, ít rau', [95, 28, 30], '1 suất cơm 2/3 chén, thịt luộc hoặc cá, rau xào, canh trong', [62, 30, 12], 'Chọn nhiều món rau, một món đạm nạc, bớt cơm.'],
  ['rice', 'Cơm Chiên Hải Sản', 'Cơm chiên dầu, hải sản, nước sốt', [95, 26, 24], '1 phần cơm chiên ít dầu nhiều tôm mực, thêm dưa leo', [65, 28, 12], 'Xin ít dầu; ăn đạm hải sản trước.'],
  ['rice', 'Cơm Bò Xào / Cơm Lúc Lắc', 'Bò xào nhiều dầu, khoai tây chiên, cơm đầy', [95, 32, 30], '1 phần bò xào ít dầu, thay khoai chiên bằng rau, 2/3 cơm', [60, 34, 14], 'Khoai chiên cộng thêm nhiều calo; đổi sang salad.'],
  ['rice', 'Cơm Cá Kho Tộ', 'Cá kho nước màu nhiều đường, cơm đầy', [90, 28, 18], '1 phần cá kho ít nước, rau luộc, 2/3 cơm', [58, 30, 9], 'Nước kho nhiều đường và muối; chấm một chút, ăn kèm rau.'],
  ['rice', 'Cơm Cá Chiên Giòn', 'Cá chiên ngập dầu, nước mắm đường, cơm đầy', [90, 26, 28], '1 phần cá hấp hoặc nướng, canh rau, 2/3 cơm', [58, 30, 8], 'Chiên giòn tăng béo; cá hấp hay nướng ngon và nhẹ hơn.'],
  // ---- Lẩu / nướng ----
  ['hotpot', 'Lẩu Thái', 'Nước béo cay, hải sản, thịt bò mỡ, bún, nước chấm', [70, 45, 40], 'nồi lẩu nước trong, nhiều rau nấm, hải sản, thịt nạc, ít bún', [30, 45, 14], 'Nước lẩu hầm xương sẽ có mỡ; hạn chế húp nhiều.'],
  ['hotpot', 'Lẩu Bò Nhúng Dấm', 'Bò nhiều mỡ, rau, bún, chấm mắm', [60, 42, 38], 'bò thăn nạc, nhiều rau và nấm, ít bún', [30, 44, 14], 'Chọn thịt nạc, ăn rau nhiều hơn thịt.'],
  ['hotpot', 'Lẩu Nấm', 'Nước dùng đậm, thêm viên, xúc xích, mỡ', [60, 30, 30], 'lẩu nấm với rau cải, đậu phụ, ức gà, không viên chiên', [28, 34, 10], 'Nấm ít calo; tránh viên chiên, xúc xích.'],
  ['hotpot', 'Nướng BBQ Hàn / Nhật', 'Ba chỉ, sườn tẩm đường, cơm, kim chi', [75, 50, 55], 'thịt bò nạc, ức gà, hải sản, ăn kèm xà lách, bỏ ba chỉ', [25, 50, 20], 'Cuốn thịt với xà lách thay vì ăn cơm.'],
  ['hotpot', 'Nướng Than Hoa Đường Phố', 'Xiên nướng tẩm đường, nhiều nước chấm, bánh mì', [70, 40, 42], 'xiên gà, bò, tôm nướng ít sốt, nhiều rau', [25, 44, 14], 'Sốt mật ong, sốt me và nướng cháy; chọn sốt ít và nướng vừa.'],
  ['hotpot', 'Lẩu Gà Lá É', 'Gà ta cả da, bún, nước chấm muối', [60, 45, 34], 'lẩu gà lá é, bỏ da, thêm rau và nấm, ít bún', [30, 46, 12], 'Bỏ da gà giúp giảm nhiều mỡ.'],
  // ---- Tiếp khách / quán nhậu ----
  ['party', 'Bia + Đồ Nhắm Chiên', 'Bia, nem rán, khoai chiên, đậu phộng', [60, 20, 50], 'nước suối có ga hoặc 1 ly bia nhỏ, đồ nhắm luộc/hấp/nướng', [22, 28, 14], 'Cồn làm gan khó xử lý mỡ; nếu bị gan nhiễm mỡ, nên bỏ hẳn bia rượu.'],
  ['party', 'Hải Sản Nướng / Hấp', 'Hải sản nướng mỡ hành, bơ tỏi', [50, 40, 38], 'hải sản hấp hoặc luộc, chấm muối ớt chanh', [18, 42, 8], 'Bơ tỏi và mỡ hành cộng nhiều calo; hấp luộc nhẹ hơn.'],
  ['party', 'Gỏi / Salad Khai Vị', 'Gỏi gà trộn dầu, đậu phộng, bánh phồng tôm', [35, 20, 28], 'gỏi gà bắp cải nước chanh, bỏ bánh phồng', [20, 24, 8], 'Bánh phồng tôm chiên làm tăng calo.'],
  ['party', 'Chân Gà / Sụn Ngâm Sả Ớt', 'Chân gà rút xương, ngâm đường', [18, 25, 22], 'ức gà luộc xé hoặc lòng trắng, ăn vài miếng', [10, 25, 6], 'Chân gà ít đạm có ích, nhiều mỡ da; chọn phần nạc.'],
  ['party', 'Đồ Chiên Rán Tiếp Khách', 'Chả giò, tôm chiên bột, khoai tây chiên', [70, 25, 55], 'đồ hấp hoặc nướng như tôm hấp, rau củ nướng', [25, 30, 14], 'Chiên bột hấp thụ nhiều dầu; chọn hấp nướng.'],
  ['party', 'Buffet', 'Ăn nhiều tinh bột và đồ chiên, tráng miệng ngọt', [150, 70, 80], 'ưu tiên rau, đạm nạc, hải sản; 1 đĩa trái cây tráng miệng', [70, 60, 25], 'Đi một vòng chọn đồ trước; ăn rau trước, đạm sau, tinh bột cuối.'],
  // ---- Món đường phố, bánh ----
  ['street', 'Bánh Mì Thịt Nguội', 'Pate, thịt nguội, bơ, xúc xích, nhiều nước sốt', [55, 18, 25], '1 ổ bánh mì ít bơ ít pate, thêm thịt nạc/trứng, nhiều dưa leo rau', [45, 20, 10], 'Chọn nhân đạm nạc, bỏ pate và bơ.'],
  ['street', 'Bánh Mì Chảo', 'Chảo mỡ, xúc xích, pate, bánh mì chấm', [75, 32, 36], '1 chảo trứng ốp la thịt nạc, ít bánh mì, thêm rau', [40, 28, 18], 'Mỡ chảo nhiều; bớt pate và xúc xích.'],
  ['street', 'Bánh Xèo', 'Bánh xèo chiên giòn, thịt ba chỉ, nước chấm đường', [60, 20, 40], '1 cái bánh xèo nhỏ, nhiều rau sống cuốn, ít nước chấm', [40, 20, 22], 'Cuốn nhiều rau, bớt nước chấm ngọt.'],
  ['street', 'Bánh Cuốn Chả', 'Bánh cuốn nhiều, chả quế, hành phi', [75, 20, 22], '1 dĩa bánh cuốn nhân thịt nạc, ít chả, bỏ hành phi', [50, 20, 8], 'Chả và hành phi nhiều dầu; ăn vừa phải.'],
  ['street', 'Xôi Mặn', 'Xôi nhiều, chà bông, pate, hành phi, mỡ', [95, 20, 26], '1 gói xôi nhỏ, thêm trứng luộc, bỏ pate và hành phi', [60, 18, 8], 'Xôi là tinh bột đặc; ăn gói nhỏ và thêm đạm.'],
  ['street', 'Gỏi Cuốn / Bì Cuốn', 'Gỏi cuốn chấm tương đậu phộng nhiều đường', [45, 15, 14], '3 cuốn gỏi cuốn tôm, chấm nước mắm chua ngọt, ít tương', [30, 16, 4], 'Gỏi cuốn khá nhẹ nếu ít sốt tương.'],
  ['street', 'Chè Thập Cẩm', 'Chè nhiều đường, nước cốt dừa, thạch', [75, 4, 16], '1 ly nhỏ chè đậu xanh ít đường, bỏ nước cốt dừa', [35, 6, 2], 'Chè là đường lỏng; ly nhỏ ít đường là đủ vui.'],
  ['street', 'Nem Nướng / Nem Lụi', 'Nem mỡ, bánh tráng, nước chấm', [65, 28, 30], 'nem nạc nướng, cuốn nhiều rau, nước chấm vừa', [40, 28, 14], 'Cuốn rau sống thật nhiều.'],
  ['street', 'Bò Lá Lốt / Chả Nướng', 'Bò mỡ, bún, nước chấm ngọt', [65, 28, 30], 'bò nạc lá lốt, bún ít, nhiều rau', [40, 30, 14], 'Bún ít, rau nhiều.'],
  ['street', 'Bánh Tráng Nướng / Trộn', 'Bánh tráng phết trứng, mỡ hành, sốt', [55, 12, 22], '1 cái bánh tráng nướng ít sốt, thêm trứng cút, nhiều rau', [38, 14, 10], 'Phần dầu, sốt và xúc xích là nguồn calo.'],
  // ---- Đồ ăn nhanh ----
  ['fast', 'Gà Rán', '3 miếng gà rán da, khoai chiên, nước ngọt', [100, 45, 55], '2 miếng gà bỏ da, salad, nước lọc', [30, 38, 18], 'Bỏ da gà giảm khoảng một nửa lượng béo.'],
  ['fast', 'Pizza', '3 lát pizza phô mai nhiều', [100, 30, 40], '2 lát pizza đế mỏng nhiều rau, thêm salad', [60, 22, 18], 'Chọn đế mỏng, ít phô mai, nhiều rau.'],
  ['fast', 'Burger', 'Burger bò phô mai, khoai chiên', [95, 30, 45], '1 burger gà nướng, bỏ sốt mayonnaise, thay khoai bằng salad', [50, 28, 14], 'Sốt và khoai chiên là phần dư calo.'],
  ['fast', 'Mì Ý (Pasta) Sốt Kem', 'Pasta sốt kem phô mai, thịt xông khói', [90, 22, 45], '1 phần pasta sốt cà chua ức gà, ít pasta', [60, 26, 12], 'Sốt kem rất nhiều béo; sốt cà chua nhẹ hơn.'],
  ['fast', 'Sandwich / Bánh Mì Kẹp', 'Bánh mì kẹp thịt nguội, phô mai, sốt', [60, 20, 28], 'sandwich nguyên cám kẹp gà hoặc trứng, nhiều rau, ít sốt', [40, 24, 10], 'Chọn đạm nạc và nhiều rau.'],
  ['fast', 'Khoai Tây Chiên / Snack Chiên', 'Khoai chiên cỡ lớn', [70, 6, 32], 'cỡ nhỏ hoặc đổi thành salad/ngô', [25, 3, 4], 'Cỡ nhỏ hoặc bỏ hẳn; đổi salad.'],
  // ---- Trà sữa / cà phê / nước ----
  ['drink', 'Trà Sữa Trân Châu', 'Ly lớn 700ml, 100% đường, trân châu, kem cheese', [90, 4, 14], 'ly nhỏ trà sữa 30% đường, không topping', [28, 3, 6], 'Giảm size, đường và bỏ topping giúp giảm hơn một nửa.'],
  ['drink', 'Cà Phê Sữa Đá', 'Cà phê sữa đặc 2 muỗng', [35, 3, 4], 'cà phê đen hoặc ít sữa, không thêm đường', [3, 1, 0], 'Quen dần với ít đường trong 2 tuần.'],
  ['drink', 'Bạc Xỉu / Latte Caramel', 'Ly lớn, siro caramel', [50, 6, 10], 'latte nhỏ không siro', [12, 7, 6], 'Siro là nguồn đường chính.'],
  ['drink', 'Trà Đào Cam Sả', 'Siro đào, đường, ly lớn', [60, 1, 0], 'trà đào ít đường, thêm đá, ly vừa', [25, 1, 0], 'Bớt đường hoặc nhờ đổi sang trà nguyên chất.'],
  ['drink', 'Nước Mía / Nước Ép Thêm Đường', 'Ly lớn nước mía, nước ép thêm đường', [60, 1, 0], 'ly nhỏ, không thêm đường', [30, 1, 0], 'Nước mía vốn nhiều đường; chọn ly nhỏ.'],
  ['drink', 'Nước Ép Trái Cây Đóng Chai', 'Ly lớn có đường', [45, 1, 0], 'nước ép nguyên chất ly nhỏ hoặc ăn trái cây nguyên', [20, 1, 0], 'Trái cây nguyên quả no lâu hơn nước ép.'],
  ['drink', 'Matcha / Trà Xanh Latte', 'Ly lớn đường nhiều', [50, 6, 8], 'matcha latte nhỏ, ít đường', [15, 6, 6], 'Chọn ít đường, sữa tươi không đường.'],
  ['drink', 'Soda / Nước Có Ga Có Đường', 'Lon 330ml', [35, 0, 0], 'soda chanh không đường hoặc nước lọc có ga', [2, 0, 0], 'Giảm nước ngọt là cách đơn giản để giảm đường.'],
  // ---- Món Hàn / Nhật / Âu ----
  ['world', 'Sushi / Sashimi', '10 miếng nigiri, tempura, sốt mayonnaise', [90, 30, 25], 'sashimi, nigiri ít cơm, bỏ tempura và sốt béo', [45, 32, 8], 'Chọn sashimi và nigiri, tránh tempura.'],
  ['world', 'Ramen', 'Ramen nước béo, mỡ heo, nhiều mì', [90, 28, 32], '1 tô ramen gà nước trong, ít mì, thêm trứng và rau', [60, 28, 10], 'Nước ramen đậm vị và nhiều muối; không húp hết.'],
  ['world', 'Cơm Trộn Hàn Quốc (Bibimbap)', 'Cơm trộn tương ớt ngọt, thịt bò, dầu mè', [100, 28, 22], 'bibimbap nhiều rau, ít tương ớt, 2/3 cơm', [65, 28, 10], 'Tương gochujang nhiều đường; dùng ít.'],
  ['world', 'Gà Rán Hàn Quốc', 'Gà chiên sốt ngọt cay, khoai chiên', [80, 40, 40], 'gà nướng hoặc áp chảo, ăn kèm salad', [25, 38, 14], 'Sốt ngọt và chiên đều tăng nhiều calo.'],
  ['world', 'Tokbokki / Kimbap', 'Tokbokki sốt ngọt, chả cá chiên', [95, 12, 12], '1 phần nhỏ tokbokki, thêm trứng luộc và rau', [60, 14, 6], 'Chủ yếu là tinh bột, thêm đạm và rau.'],
  ['world', 'Pad Thai / Món Thái Xào', 'Mì xào dầu, đường, đậu phộng', [100, 24, 28], 'pad thai nhiều rau, ít dầu, tôm hoặc gà', [65, 28, 12], 'Xin ít dầu, thêm giá, rau.'],
  ['world', 'Tom Yum / Canh Thái', 'Nước cốt dừa béo, ăn kèm cơm đầy', [50, 25, 20], 'tom yum nước trong, hải sản, ít cơm', [20, 28, 5], 'Nước trong hạn chế béo từ cốt dừa.'],
  ['world', 'Salad Nhà Hàng Âu', 'Salad sốt mayonnaise/Caesar, bánh mì nướng, thịt xông khói', [30, 18, 34], 'salad sốt dầu giấm để riêng, ức gà hoặc cá, không bánh mì nướng', [15, 30, 12], 'Sốt Caesar rất béo; xin sốt riêng.'],
  ['world', 'Bít Tết / Steak', 'Bò ba chỉ, khoai tây chiên, sốt kem', [60, 45, 50], 'thăn bò nạc áp chảo, rau củ nướng, sốt tiêu riêng', [18, 46, 16], 'Chọn thăn, sốt để riêng, thay khoai chiên.'],
  ['world', 'Mì Ý Hải Sản / Cơm Ý', 'Mì Ý sốt bơ kem hải sản', [95, 28, 36], 'mì Ý sốt cà chua hải sản, ít mì', [55, 30, 10], 'Sốt bơ và kem; chọn sốt cà chua.']
];

export const EXTRA_DINING = ROWS.map(([category, name, normalDesc, normalMacro, hackDesc, hackMacro, medicalTip], i) => ({
  id: 'dx' + (i + 1), category, name, normalDesc,
  normalKcal: kcal(normalMacro), normalMacro: { carb: normalMacro[0], pro: normalMacro[1], fat: normalMacro[2] },
  hackDesc: hackDesc.charAt(0).toUpperCase() + hackDesc.slice(1),
  hackKcal: kcal(hackMacro), hackMacro: { carb: hackMacro[0], pro: hackMacro[1], fat: hackMacro[2] },
  orderMantra: `“Cho em ${hackDesc}, ít dầu mỡ, nước sốt để riêng giúp em nhé!”`,
  medicalTip
}));
