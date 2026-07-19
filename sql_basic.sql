-- tạo database
CREATE DATABASE demo_1
CREATE DATABASE IF NOT EXISTS sql_basic

-- xóa database
DROP DATABASE IF EXISTS demo_1
DROP DATABASE IF EXISTS sql_basic

-- tạo table
-- ví dụ: tạo ra bảng user có các cột là username,password, image, id
--	relationship (primary key, foreign key)
-- phím tắt reload: ctrl + r / cmd + r
-- phím tắt để chạy lệnh: ctrl + enter / cmd + enter
CREATE TABLE IF NOT EXISTS `user` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`username` VARCHAR(255),
	`password` VARCHAR(255),
	`avatar` TEXT,
	`age` INT
)

-- đổi tên bảng
RENAME TABLE `user` TO `Users`

-- xóa cột 
ALTER TABLE `Users`
DROP COLUMN `age`

-- thêm cột (sài nhiều)
ALTER TABLE `Users`
ADD COLUMN `googleId` VARCHAR(255)

-- ràng buộc
-- ví dụ: nếu cột description không dữ liệu khởi tạo thì lưu giá trị là "Chưa có thông tin"
CREATE TABLE IF NOT EXISTS `Foods`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(255),
	`description` VARCHAR(255) DEFAULT "Chưa có thông tin"
)
-- chưa tạo thì add, có rồi thì modify
ALTER TABLE `Users` 
ADD COLUMN `email` VARCHAR(255) NOT NULL UNIQUE

-- thêm dữ liệu
INSERT INTO `Users` (`username`, `email`) VALUES 
					('nguyễn văn a', 'nguyenvana@gmail.com'),
					('nguyễn văn b', 'nguyenvanb@gmail.com'),
					('nguyễn văn c', 'nguyenvanc@gmail.com'),
					('nguyễn văn d', 'nguyenvand@gmail.com'),
					('nguyễn văn e', 'nguyenvane@gmail.com')
					
INSERT INTO `Foods` (`name`, `description`) VALUES
('Phở bò', 'Món phở truyền thống Việt Nam với nước dùng đậm đà'),
('Bún bò Huế', 'Đặc sản Huế với vị cay và nước dùng thơm ngon'),
('Cơm tấm', 'Cơm tấm sườn bì chả đặc trưng Sài Gòn'),
('Bánh mì', 'Bánh mì kẹp thịt, pate và rau củ'),
('Gỏi cuốn', 'Cuốn tôm thịt với rau sống và bánh tráng'),
('Bánh xèo', 'Bánh xèo giòn nhân tôm thịt và giá đỗ'),
('Hủ tiếu Nam Vang', 'Hủ tiếu với nước dùng ngọt thanh'),
('Mì Quảng', 'Đặc sản Quảng Nam với nước dùng sệt'),
('Bún chả', 'Bún ăn kèm chả nướng và nước mắm chua ngọt'),
('Chả giò', 'Chả giò chiên giòn nhân thịt và rau củ');

-- basic query (relationship)
SELECT * FROM `Users`

SELECT `username`, `email` from `Users`

SELECT * FROM `Users` WHERE `id` = 4

-- đặt tên phụ AS
SELECT `username` AS `fullname`, `email` from `Users`


#TEMPLATE TABLE
#LƯU Ý: ĐÂY LÀ TEMPLATE MẪU - K TẠO
CREATE TABLE IF NOT EXISTS `TABLE_TEMPLATE` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	
	-- ĐẶT CÁC THUỘC TÍNH CỦA TABLE Ở ĐÂY
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

