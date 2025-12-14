# 🌐 HỆ THỐNG HỌC TẬP TRỰC TUYẾN
## Online Learning Platform

---

## 📌 Tóm Tắt Dự Án (Project Overview)

Hệ thống học tập trực tuyến (**Online Learning Platform**) được xây dựng nhằm cung cấp một môi trường **E-Learning hiện đại và hiệu quả**, cho phép người dùng:

* 🔍 **Khám phá khóa học** và nội dung học tập.
* 📝 **Đăng ký và tham gia học tập** một cách dễ dàng.
* 📊 **Theo dõi tiến độ học tập** chi tiết theo từng bài học.

Hệ thống được **quản lý tập trung bởi Admin**, đảm bảo chất lượng nội dung và quản lý người dùng chặt chẽ.



---

## ✨ Phạm Vi Chức Năng (Scope & Features)

Dự án được chia thành **hai phân hệ chính** với các tính năng riêng biệt:

| Phân hệ | Vai trò chính |
| :--- | :--- |
| 🔐 **Admin (Quản trị viên)** | Quản lý nội dung, người dùng và toàn bộ hệ thống. |
| 👩‍🎓 **User (Người dùng)** | Học tập, tương tác và theo dõi tiến độ. |

### 🔐 1. Chức Năng Cho Admin (Quản Trị Viên)

#### 1.1 Đăng Nhập Quản Trị
* Giao diện đăng nhập riêng biệt.
* Xác thực bằng **username / password**.
* Áp dụng **Session Timeout** để tăng cường bảo mật.

#### 1.2 Quản Lý Người Dùng
* Xem danh sách học viên.
* Khoá / Mở khoá tài khoản.
* Reset mật khẩu.
* Xoá tài khoản người dùng.

#### 1.3 Quản Lý Danh Mục (Category)
* Tạo mới danh mục môn học.
* Sửa thông tin danh mục.
* Xoá danh mục.

#### 1.4 Quản Lý Khoá Học
* Tạo / Sửa / Xoá khóa học (CRUD).
* **Thông tin chi tiết khóa học**: Tên, Mô tả ngắn, Ảnh đại diện, Danh mục, Trạng thái (**Hoạt động / Ẩn**).

#### 1.5 Quản Lý Nội Dung Khoá Học
* Xây dựng cấu trúc học tập **phân cấp**: `Course` ➞ `Chapter` ➞ `Video Lesson`.
* Thêm / Sửa / Xoá chương học.
* Quản lý video bài giảng theo từng chương.

---

### 👩‍🎓 2. Chức Năng Cho Người Dùng (User)

#### 2.1 Xác Thực Tài Khoản
* Đăng ký tài khoản mới.
* Đăng nhập hệ thống.
* Quên mật khẩu (đặt lại qua Email).
* Đăng xuất.

#### 2.2 Quản Lý Thông Tin Cá Nhân
* Xem và Cập nhật hồ sơ người dùng.
* Thay đổi mật khẩu.

#### 2.3 Khám Phá Khoá Học
* Hiển thị danh sách khóa học.
* Lọc khóa học theo danh mục.
* Tìm kiếm khóa học theo từ khoá.

#### 2.4 Xem & Học Khoá Học
* Giao diện phòng học tích hợp video bài giảng.
* Hiển thị danh sách chương và bài học.
* **Theo dõi trạng thái học tập**:
    * ✅ Đã học
    * ⏳ Chưa học

#### 2.5 Tương Tác
* Đánh giá sao (**Rating**) cho bài học/khóa học.
* Bình luận (**Comment**) dưới mỗi bài học.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

| Thành phần | Công nghệ | Chi tiết |
| :--- | :--- | :--- |
| **Front-end** | **ReactJS** | Single Page Application (SPA) / Server Side Rendering (SSR). |
| **Back-end** | **Node.js (Express)** | Xây dựng **RESTful API** mạnh mẽ. |
| **Database** | **PostgreSQL / MySQL** | Lưu trữ dữ liệu người dùng, khóa học và tiến độ học tập. |
| **Authentication** | **JWT** (JSON Web Token) | Xác thực và phân quyền người dùng an toàn. |

---

## 🚀 Hướng Dẫn Cài Đặt & Vận Hành (Getting Started)

### 📋 Điều Kiện Tiên Quyết
* [Node.js](https://nodejs.org/) v16+
* npm hoặc yarn
* PostgreSQL / MySQL đang hoạt động

### 1. Clone repository
git clone <URL_repository>
cd online_learning_platform

### 2. Cài đặt dependencies
npm install

### 3. Cấu Hình Biến Môi Trường (.env)
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=online_learning_system
JWT_SECRET=
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
REACT_APP_API_URL=http://localhost:5000

### 4. Chạy Ứng Dụng
npm run dev
