<section class="cover">
<div>
<div class="cover-mark"></div>
<h1>Giáo trình cơ bản FANUC ROBODRILL</h1>
<p class="subtitle">Level 1 - Item 02<br>Bật và tắt nguồn</p>
</div>
<div class="cover-meta">
<strong>Đối tượng</strong><span>Người vận hành mới, nhân viên chất lượng và nhân viên bảo trì thiết bị</span>
<strong>Mục tiêu</strong><span>Thực hành kiểm tra trước khi bật nguồn, khởi động CNC, Servo ON và tắt nguồn an toàn.</span>
<strong>Hình thức</strong><span>Mục tiêu, an toàn, hình ảnh thực tế, quy trình, thực hành, câu hỏi kiểm tra</span>
</div>
</section>

[PAGE_BREAK]

# 02. Bật và tắt nguồn

Mục này giúp học viên mới hiểu và giải thích an toàn nội dung Bật và tắt nguồn. Thực hành kiểm tra trước khi bật nguồn, khởi động CNC, Servo ON và tắt nguồn an toàn. Người vận hành không chỉ học tên nút mà phải đọc trạng thái máy, dự đoán hành động tiếp theo và nhận biết vị trí nguy hiểm trước khi thao tác. Mọi thao tác được thực hiện theo thứ tự kiểm tra, chọn, thực hiện, quan sát và ghi lại.

> Chú ý an toàn: Khi thao tác trên máy thật, luôn tuân thủ quy định an toàn tại xưởng, tài liệu của nhà sản xuất, tiêu chuẩn công việc nội bộ và hướng dẫn của giảng viên. Nếu chưa chắc chắn, hãy dừng lại và báo cáo trạng thái.

## Mục tiêu đào tạo

- Thực hành kiểm tra trước khi bật nguồn, khởi động CNC, Servo ON và tắt nguồn an toàn.
- Giải thích được nút liên quan, thông tin trên màn hình và phản ứng của máy.
- Kiểm tra các hạng mục an toàn trước thao tác bằng checklist.
- Phân biệt trạng thái bình thường và bất thường để báo cáo cho giảng viên.
- Ghi lại kết quả thực hành vào phiếu công việc.

| Nhóm | Hành động học viên cần làm | Tiêu chuẩn đạt |
| --- | --- | --- |
| Hiểu | Giải thích mục đích của Bật và tắt nguồn | Dùng ít nhất 3 thuật ngữ chính |
| Kiểm tra | Tìm yếu tố nguy hiểm trước thao tác | Kiểm tra vùng làm việc, màn hình và override |
| Thực hiện | Làm từng bước dưới sự giám sát | Không thao tác nhanh, luôn dừng để xác nhận |
| Ghi nhận | Ghi kết quả và bất thường | Có ngày, trạng thái máy và người xác nhận |

[PAGE_BREAK]

## An toàn

Thời điểm nguy hiểm nhất trong Bật và tắt nguồn là khi người vận hành chạy bước tiếp theo mà chưa đọc trạng thái máy. Trục chính, chuyển động trục, thay dao, nhập tọa độ và chạy chương trình đều có thể biến thao tác trên màn hình thành chuyển động thật. Học viên phải nhìn đồng thời số trên màn hình và vị trí dao thật.

<div class="visual-strip">
<div class="visual-card">
<img src="../../assets/icons/bootstrap/shield-exclamation.svg" alt="Nhận biết rủi ro">
<strong>Nhận biết rủi ro</strong>
<span>Tìm bộ phận có thể chuyển động trước</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/eye.svg" alt="Quan sát trạng thái">
<strong>Quan sát trạng thái</strong>
<span>Nhìn cả màn hình và vị trí thật</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/stop-circle.svg" alt="Dừng ngay">
<strong>Dừng ngay</strong>
<span>Nếu khác dự đoán thì dừng trước</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/clipboard-check.svg" alt="Báo cáo">
<strong>Báo cáo</strong>
<span>Ghi alarm và điều kiện phát sinh</span>
</div>
</div>

| Tình huống nguy hiểm | Nguyên nhân | Cách phòng tránh |
| --- | --- | --- |
| Trục đi sai hướng | Nhầm trục, hướng hoặc hệ tọa độ | Nói rõ trục và hướng trước khi chạy |
| Va chạm | Không nhìn khoảng cách dao, phôi, đồ gá | Tiếp cận bằng tốc độ thấp và bước ngắn |
| Khởi động lại sai | Không kiểm tra nguyên nhân alarm | Ghi mã alarm và điều kiện phát sinh |
| Lỗi chất lượng | Bỏ sót giá trị bù hoặc mặt chuẩn | Đối chiếu phiếu ghi và màn hình |

> Chú ý an toàn: Emergency stop là lớp bảo vệ cuối cùng. Trước khi cần dùng nó, hãy giảm override, dừng lại và xác nhận khi có nghi ngờ.

[PAGE_BREAK]

## Hình ảnh thực tế và điểm quan sát

![Hình tham khảo Bật và tắt nguồn](../../assets/images/fanuc_robodrill_official_panel.webp)

<p class="caption">Hình 2-1. Hình tham khảo cho bài Bật và tắt nguồn. Nguồn và quyền sử dụng được ghi trong tài liệu nguồn hình ảnh.</p>

Khi quan sát hình, không nên nhìn toàn bộ máy một cách chung chung. Hãy bắt đầu từ vị trí ảnh hưởng trực tiếp đến người vận hành. Thứ nhất, tìm vùng nguy hiểm nơi tay hoặc cơ thể có thể đi vào. Thứ hai, liên hệ nút hoặc màn hình với cơ cấu sẽ chuyển động. Thứ ba, xác định vị trí có thể dừng máy ngay khi có bất thường.

## Khái niệm cốt lõi

Điểm cốt lõi của Bật và tắt nguồn không chỉ là nhớ quy trình, mà là hiểu vì sao quy trình đó tồn tại. ROBODRILL là máy nhỏ và nhanh, nên một lần bỏ sót kiểm tra cũng có thể dẫn tới va chạm hoặc lỗi chất lượng. Vì vậy ở cấp cơ bản, thói quen quan sát an toàn quan trọng hơn tốc độ thao tác.

<div class="visual-strip">
<div class="visual-card">
<img src="../../assets/icons/bootstrap/diagram-3.svg" alt="Hiểu liên hệ">
<strong>Hiểu liên hệ</strong>
<span>Nối nút, màn hình và chuyển động máy</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/crosshair.svg" alt="Xác nhận chuẩn">
<strong>Xác nhận chuẩn</strong>
<span>Phân biệt tọa độ và mặt chuẩn</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/tools.svg" alt="Tình trạng dao">
<strong>Tình trạng dao</strong>
<span>Kiểm tra dao và holder</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/bullseye.svg" alt="Vị trí mục tiêu">
<strong>Vị trí mục tiêu</strong>
<span>Tách vị trí cần đến và vùng nguy hiểm</span>
</div>
</div>

| Thuật ngữ | Ý nghĩa | Kiểm tra tại hiện trường |
| --- | --- | --- |
| Kiểm tra trạng thái | Đọc máy đang ở mode và điều kiện nào | Màn hình, đèn, alarm, override |
| Điều kiện chạy | Trạng thái máy có thể chuyển động | Cửa, Servo, tọa độ, dao |
| Khoảng cách quan sát | Khoảng hở giữa dao và phôi | Càng gần càng giảm tốc độ và lượng di chuyển |
| Ghi nhận | Bằng chứng để người sau hiểu | Giá trị, alarm, xử lý, người xác nhận |

[PAGE_BREAK]

## Quy trình từng bước

Quy trình sau là luồng đào tạo cơ bản. Nếu xưởng có quy trình riêng, phải ưu tiên quy trình của xưởng.

<div class="visual-strip">
<div class="visual-card">
<img src="../../assets/icons/bootstrap/list-check.svg" alt="Xác nhận thứ tự">
<strong>Xác nhận thứ tự</strong>
<span>Nói quy trình trước khi thao tác</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/speedometer2.svg" alt="Giới hạn tốc độ">
<strong>Giới hạn tốc độ</strong>
<span>Bắt đầu với override thấp</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/arrows-move.svg" alt="Di chuyển ngắn">
<strong>Di chuyển ngắn</strong>
<span>Chạy một bước rồi dừng quan sát</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/check2-square.svg" alt="Bước tiếp theo">
<strong>Bước tiếp theo</strong>
<span>Chỉ tiếp tục khi trạng thái bình thường</span>
</div>
</div>

1. Kiểm tra khu vực xung quanh, bảo hộ và vị trí emergency stop.
2. Đọc mode hiện tại, alarm và trạng thái chương trình trên màn hình CNC.
3. Kiểm tra dao, phôi, đồ gá và phoi trong vùng làm việc.
4. Tìm nút hoặc menu cần dùng cho Bật và tắt nguồn và nói tên của nó.
5. Đặt override và điều kiện chuyển động ở mức rủi ro thấp.
6. Báo cáo cho giảng viên bằng một câu về thao tác sắp làm.
7. Chạy một bước ngắn rồi dừng để quan sát phản ứng thật của máy.
8. Chỉ chuyển sang bước tiếp theo khi không có bất thường.

<div class="callout practice">
Thực hành: Tại vị trí đào tạo do giảng viên chỉ định, học viên nói to quy trình Bật và tắt nguồn, sau đó thực hiện từng bước và dừng lại sau mỗi bước. Sau mỗi bước, học viên mô tả trạng thái màn hình và trạng thái máy thật.
</div>

[PAGE_BREAK]

## Checklist tại hiện trường

<div class="visual-strip">
<div class="visual-card">
<img src="../../assets/icons/bootstrap/clipboard-check.svg" alt="Checklist">
<strong>Checklist</strong>
<span>Kiểm tra không bỏ sót</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/exclamation-triangle.svg" alt="Dấu hiệu bất thường">
<strong>Dấu hiệu bất thường</strong>
<span>Đọc alarm và thông báo</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/gear.svg" alt="Điều kiện máy">
<strong>Điều kiện máy</strong>
<span>Xem cửa, Servo và override</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/journal-check.svg" alt="Phiếu ghi">
<strong>Phiếu ghi</strong>
<span>Ghi đủ để người khác hiểu lại</span>
</div>
</div>

| Hạng mục kiểm tra | Tiêu chuẩn bình thường | Xử lý khi bất thường |
| --- | --- | --- |
| Khu vực xung quanh | Lối đi, sàn và bàn thao tác gọn gàng | Dọn lại rồi bắt đầu |
| Màn hình | Không có alarm hoặc thông báo bất thường | Ghi mã alarm và báo cáo |
| Bên trong máy | Dao, đồ gá, phôi cố định và không va chạm | Kiểm tra lại gá đặt |
| Override | Đặt thấp phù hợp cho thực hành cơ bản | Điều chỉnh theo giảng viên |
| Phiếu ghi | Có người thao tác, ngày và số máy | Bổ sung mục thiếu |

Checklist không phải là giấy tờ hình thức. Nó là công cụ giảm tai nạn. Dù đã checklist xong, nếu chuyển động thật khác dự đoán thì phải dừng ngay.

[PAGE_BREAK]

## Thực hành

<div class="visual-strip">
<div class="visual-card">
<img src="../../assets/icons/bootstrap/eye.svg" alt="Đọc và báo cáo">
<strong>Đọc và báo cáo</strong>
<span>Quan sát và nói trước khi bấm</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/cursor.svg" alt="Chọn thao tác">
<strong>Chọn thao tác</strong>
<span>Xác nhận tên nút và menu</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/pencil-square.svg" alt="Ghi kết quả">
<strong>Ghi kết quả</strong>
<span>Ghi kết quả và câu hỏi</span>
</div>
<div class="visual-card">
<img src="../../assets/icons/bootstrap/question-circle.svg" alt="Đặt câu hỏi">
<strong>Đặt câu hỏi</strong>
<span>Không chắc thì dừng và hỏi</span>
</div>
</div>

### Thực hành A: Đọc trạng thái

1. Đọc mode hiện tại và trạng thái alarm trên màn hình.
2. Tìm vị trí nguy hiểm gần nhất trong vùng làm việc.
3. Nói 5 hạng mục cần kiểm tra trước Bật và tắt nguồn.
4. Báo cáo trạng thái hiện tại cho giảng viên.

### Thực hành B: Thực hiện quy trình

1. Thực hiện bước đầu tiên trong điều kiện an toàn do giảng viên chỉ định.
2. So sánh số trên màn hình với chuyển động thật.
3. Nếu khác dự đoán, dừng ngay và nói nguyên nhân nghi ngờ.
4. Nếu bình thường, chuyển sang bước tiếp theo.

### Thực hành C: Ghi nhận

Ghi kết quả thực hành, bất thường và câu hỏi. Nội dung ghi phải đủ cụ thể để người sau và giảng viên hiểu lại cùng một tình huống.

[PAGE_BREAK]

## Lỗi thường gặp và phòng tránh

| Lỗi thường gặp | Vì sao nguy hiểm | Câu hỏi phòng tránh |
| --- | --- | --- |
| Bấm nút trước | Bỏ sót trạng thái màn hình | Mode hiện tại là gì |
| Đoán hướng | Có thể đi ngược hướng | Trục nào sẽ đi theo hướng nào |
| Xóa alarm | Nguyên nhân vẫn còn | Đã ghi mã alarm chưa |
| Không ghi lại | Người sau không biết điều kiện | Người khác có tái hiện được không |

Năng lực quan trọng nhất của người mới không phải là thao tác nhanh, mà là biết dừng an toàn và giải thích. Khi nghe tiếng lạ, thấy chuyển động khác dự đoán, alarm, vấn đề dung dịch cắt hoặc dao rung, hãy dừng và báo cáo.

[PAGE_BREAK]

## Câu hỏi kiểm tra

### Trắc nghiệm

1. Việc đầu tiên cần kiểm tra trước Bật và tắt nguồn là gì?
   - A. Tăng tốc độ lên cao nhất
   - B. Kiểm tra mode hiện tại, alarm và vùng làm việc
   - C. Chạy chương trình ngay
   - D. Ghi phiếu sau cũng được

2. Khi thấy máy chuyển động khác dự đoán, hành động đầu tiên là gì?
   - A. Tiếp tục chạy
   - B. Dừng ngay và kiểm tra trạng thái
   - C. Chỉ xóa alarm
   - D. Tăng override

### Tự luận ngắn

1. Viết 5 hạng mục cần kiểm tra trước Bật và tắt nguồn.
2. Giải thích vì sao nên bắt đầu với override thấp.
3. Viết 3 thông tin cần có khi báo cáo bất thường.

[PAGE_BREAK]

## Đáp án và ghi chú cho giảng viên

Đáp án trắc nghiệm: câu 1 là B, câu 2 là B. Với phần tự luận, câu trả lời cần bao gồm các ý phù hợp như khu vực xung quanh, alarm, mode hiện tại, vùng làm việc, tình trạng dao, gá phôi, override và phiếu ghi.

Giảng viên không chỉ kiểm tra học viên có nhớ quy trình hay không. Cần kiểm tra học viên có giải thích được vì sao phải dừng và xác nhận ở từng bước hay không. Bật và tắt nguồn liên kết với bài tiếp theo, nên sau thực hành phải luôn để lại câu hỏi và ghi nhận.

## Liên kết với mục tiếp theo

Bài tiếp theo là 03 Về điểm gốc máy. Thói quen kiểm tra trạng thái, dừng an toàn và ghi nhận trong bài này sẽ tiếp tục được dùng ở bài sau.
