## Phải ghi lại cái mớ bùng nhùng này cho khỏi quên

Các file hệ thống theo chuẩn của jekyll rồi, không có gì đặc biệt. Hệ thống sử dụng 2 font của google: **Noticia Text** (có chân) cho các chữ cần làm nổi bật (vd: nhận xét của khách hàng, đặc tính, lợi ích...), **Roboto** (không chân) cho các thứ còn lại. Stylesheet dùng **Bootstrap**, có include cả **Font Awesome** (có thể sẽ dùng icon đâu đó cho thêm sinh động).

Javascript hiện mới chỉ include **Jquery** và file js của bootstrap, ngoài ra về sau có thể thêm slick (làm slideshow), featherlight (lightbox cho hình ảnh), google maps js (hiển thị bản đồ)...

---

Trang chủ và các trang chính giới thiệu dịch vụ (ngân quỹ, in ấn, quảng cáo) dùng header đặc biệt hơn các trang khác. Có thể dùng slideshow với hình ảnh lớn. Do đó được xếp vào một layout riêng (`default`).

Các trang còn lại có thể là slideshow hoặc 1 hình ảnh tĩnh tuỳ từng trang. Header nhỏ hơn để đỡ mất diện tích thể hiện nội dung. Mặt khác hình header lớn quá trong các trang nội dung thường gây khó chịu cho người đọc.

Hình ảnh slideshow hoặc cover sẽ được khai báo YFM riêng cho từng trang. Trang nào không khai báo thông số cover sẽ được render bằng cover mặc định được định nghĩa trong file `config.yml`.

---

Thư mục gốc có 4 file dùng để hiển thị 4 mục chính trên navigation bar: trang chủ (`index.html`), giới thiệu chung (`intro.html`), tin tức (`news.html`), liên hệ (`contact.html`). Để hiển thị trên navbar, các trang phải khai báo YFM (`yaml front matter`) như sau:

```
---
layout: default // dùng layout nào để render
nav: true // hiển thị trên navbar hay không
nav_title: "trang chủ" // tên  hiển thị trên navbar
s: 10 // số này dùng để xếp thứ tự (lưu ý jekyll hay bị lỗi nếu dùng các số bắt đầu từ 0, nên bắt đầu từ một số thực
---
```

### homepage (`index.html`)

- Homepage dùng layout `default` để render (header dùng ảnh lớn làm slideshow)
- Nội dung homepage lấy từ các modul nhỏ trong thư mục `_includes`, bao gồm:
    - `modul_intro.html` - giới thiệu 3 dịch vụ chính
    - `modul_video.html` - video giới thiệu (chưa có ngay, khách hàng làm sau)
    - `section_intro_text.html` - đoạn text giới thiệu chung
    - `modul_news.html` - tin tức (3 tin mới nhất)
    - `modul_customer.html` - nhận xét của khách hàng
    - `modul_bottom.html` - chân trang (lặp lại một số liên kết)

### giới thiệu chung (`intro.html`)

Trình bày dạng có sidebar. Liên kết tới các trang nội dung liên quan. Các trang này để trong thư mục `dv_pages`. Khai báo YFM:

```
---
layout: page_small_header // layout dùng header nhỏ
nav: true // hiển thị trên navbar
bottom_nav: true // hiển thị cả ở phần chân trang
intro_side_nav: true // hiển thị cả ở sidebar   <-------- cần cái này!
nav_title: "giới thiệu chung" // tên hiển thị
s: 11 // số thứ tự trên navbar
b: 31 // số thứ tự ở chân trang

slideshow: // hình ảnh slideshow (đường dẫn)
- url: hình ảnh giới thiệu 1
- url: hình ảnh giới thiệu 2
- url: hình ảnh giới thiệu 3
---
```

Các nội dung khác vẫn lấy các modul giống như trang chủ.

Sidebar lấy nội dung file `dv_intro_sidebar.html` (trong thư mục `include` để hiển thị)

**`dv_intro_sidebar.html` làm gì?**

- Đầu tiên là lọc ra các trang có thông số `intro_side_nav: true`. Lấy tên và url của file đó làm liên kết.
- Nhặt 3 tin mới nhất hiển thị vào mục tin hoạt động.
- Trang nào cần hiển thị tin tức mới include sidbar này. Trang tin sẽ include sidebar riêng (`dv_sidebar`)

**`dv_sidebar.html` làm gì?**

- tương tự như cái trên, nhưng nó lọc lấy các trang có thông số `news_group: true` (các trang này gom vào thư mục `dv_news` cho tiện quản lý)
- Nhặt các trang photo gallery (trong thư mục `gallery` với thông số `type: gallery`), các trang gallery cũng nhét vào thư mục riêng cho tiện quản lý.
- chỉ các trang hiển thị trong mục tin tức mới dùng sidebar này.
- mỗi trang lọc một kiểu bài khác nhau (lọc theo thông số `group`).