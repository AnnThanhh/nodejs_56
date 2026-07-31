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

-- basic query 
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

#CREATE, INSERT DỮ LIỆU VÀO CÁC BẢN CÓ CHỨA KHÓA CHÍNH TRƯỚC
CREATE TABLE IF NOT EXISTS `user_type` (
	`id` INT PRIMARY KEY AUTO_INCREMENT, 
	`name`  VARCHAR(255)
)
-- DROP TABLE `Users`
CREATE TABLE IF NOT EXISTS `Users` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`username` VARCHAR(255),
	`password` VARCHAR(255),
	`avatar` TEXT,
	`age` INT,
	`user_type_id` INT,
	
	FOREIGN KEY (`user_type_id`) REFERENCES `user_type`(`id`)
)
-- xóa table/row data thì phải table/row chứa FK trước

INSERT INTO `user_type` (`name`) VALUES
('Admin'),
('Manager'),
('Employee'),
('Customer'),
('Guest');

INSERT INTO `Users` (`username`, `password`, `avatar`, `age`, `user_type_id`) VALUES
('admin', '123456', 'https://i.pravatar.cc/150?img=1', 30, 1),
('john', '123456', 'https://i.pravatar.cc/150?img=2', 25, 2),
('jane', '123456', 'https://i.pravatar.cc/150?img=3', 28, 2),
('mike', '123456', 'https://i.pravatar.cc/150?img=4', 35, 3),
('emily', '123456', 'https://i.pravatar.cc/150?img=5', 22, 2),
('david', '123456', 'https://i.pravatar.cc/150?img=6', 40, 3),
('sophia', '123456', 'https://i.pravatar.cc/150?img=7', 27, 2),
('daniel', '123456', 'https://i.pravatar.cc/150?img=8', 31, 3),
('olivia', '123456', 'https://i.pravatar.cc/150?img=9', 24, 2),
('alex', '123456', 'https://i.pravatar.cc/150?img=10', 29, 1);


CREATE TABLE IF NOT EXISTS `orders` (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT,
	`food_id` INT,
	
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`food_id`) REFERENCES `Foods`(`id`)
)

INSERT INTO `orders` (`user_id`, `food_id`) VALUES 
					(1, 4),
					(3, 1),
					(2, 5),
					(1, 3),
					(3, 5)
-- advance query
SELECT * FROM `orders`
-- inner join: sử dụng khi lấy các cặp giá trị tồn tại của cả 2 bảng / tham chiếu tới nhau
SELECT u.`username`, f.`name`, f.`description`
FROM `orders` o
INNER JOIN `Users` u ON o.`user_id` = u.`id`
INNER JOIN `Foods` f ON o.`food_id` = f.`id`

-- left join / right join: sử dụng tìm kiếm toàn bộ thông tin kể cả việc chưa hành động
-- ví dụ: lấy ra tất cả users, kể cả user chưa đặt hàng
SELECT * FROM `Users`
LEFT JOIN `orders` ON `Users`.`id` = `orders`.`user_id`
LEFT JOIN `Foods` ON `orders`.`food_id` = `Foods`.`id`
-- from -> join -> on -> where -> select


-- Tìm người đặt hàng nhiều nhất

-- phân tích
		-- kiểm tra dữ liệu order tồn tại (có mua hàng thì phát sinh order)
		-- Group by: nhóm những thông tin user giống nhau rồi đếm số lần xuất hiện
		-- count(), max(), min(), avarage()
		-- Order by: sắp xếp lại số lượng
		-- Limit 1: lấy người đầu
-- bước 1: lấy thông tin bảng orders và thêm thông tin users
SELECT * FROM orders
INNER JOIN `Users` ON `orders`.`user_id` = `Users`.`id` 

-- lỗi: Column 'id' in field list is ambiguous : do ID tồn tại ở nhiều bảng khách nhau, fix: cho biết cụ thể id ở bảng nào
-- bước 2: group by: thống kê / nhóm dòng dữ liệu
SELECT `Users`.`id`, `user_id`, `username` FROM orders
INNER JOIN `Users` ON `orders`.`user_id` = `Users`.`id`
GROUP BY `user_id`  

-- bước 3: thống kê số lượng nhóm đưụoc
SELECT COUNT(`orders`.`id`) AS `Số lần mua hàng`, `user_id`, `username` FROM orders
INNER JOIN `Users` ON `orders`.`user_id` = `Users`.`id`
GROUP BY `user_id`

-- bước 4: sắp xếp lại số lần mua hàng (Order by: asc tăng dần, desc giảm dần)
SELECT COUNT(`orders`.`id`) AS `Số lần mua hàng`, `user_id`, `username` FROM orders
INNER JOIN `Users` ON `orders`.`user_id` = `Users`.`id`
GROUP BY `user_id`
ORDER BY `Số lần mua hàng` DESC

-- bước 5: lấy ra người mua nhiều nhất(lấy ra người đầu tiên )
SELECT COUNT(`orders`.`id`) AS `Số lần mua hàng`, `user_id`, `username` FROM orders
INNER JOIN `Users` ON `orders`.`user_id` = `Users`.`id`
GROUP BY `user_id`
ORDER BY `Số lần mua hàng` DESC
LIMIT 1 