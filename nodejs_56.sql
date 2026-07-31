 -- bảng users
CREATE TABLE IF NOT EXISTS `Users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`fullName` VARCHAR(255),
	`avartar` TEXT,
	`age` INT,
	`totpSecret` VARCHAR(255),
	`googleId` VARCHAR(255),
	 	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 
 -- bảng article
CREATE TABLE IF NOT EXISTS `Articles` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	
	-- ĐẶT CÁC THUỘC TÍNH CỦA TABLE Ở ĐÂY
	`title` VARCHAR(255),
	`Content` TEXT,
	`imageURL` VARCHAR(255),
	`views` INT NOT NULL DEFAULT 0,
	`userId` INT,
	
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`),
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- bảng foods
CREATE TABLE IF NOT EXISTS `Foods` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	`name` VARCHAR(255),
	`description` VARCHAR(255) DEFAULT "Chưa có thông tin",
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- bảng order
CREATE TABLE IF NOT EXISTS `Orders` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	
	`userId` INT,
	`foodId` INT,
	
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`foodId`) REFERENCES `Foods`(`id`),	
	
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


--
CREATE TABLE IF NOT EXISTS `ChatGroups` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	`name` VARCHAR(255),
	`ownerId` INT,
	FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`),
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `ChatGroupMembers` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	`userId` INT,
	`chatGroupId` INT,
	FOREIGN KEY (`userId`) REFERENCES `Users`(`id`),
	FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups`(`id`),
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `ChatMessages` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	-- mặc định luôn luôn có
	`chatGroupId` INT,
	`userIdSender` INT,
	`messageText` TEXT,
	FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups`(`id`),
	FOREIGN KEY (`userIdSender`) REFERENCES `Users`(`id`),
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO `Users`
(`email`, `fullName`, `avartar`, `age`, `totpSecret`, `googleId`)
VALUES
('nguyenvana@gmail.com', 'Nguyễn Văn An', 'https://i.pravatar.cc/150?img=1', 25, NULL, NULL),
('tranthib@gmail.com', 'Trần Thị Bình', 'https://i.pravatar.cc/150?img=2', 28, NULL, NULL),
('leminhc@gmail.com', 'Lê Minh Cường', 'https://i.pravatar.cc/150?img=3', 31, NULL, NULL),
('phamthud@gmail.com', 'Phạm Thu Dung', 'https://i.pravatar.cc/150?img=4', 22, NULL, NULL),
('hoangquangh@gmail.com', 'Hoàng Quang Huy', 'https://i.pravatar.cc/150?img=5', 35, NULL, NULL),
('vothilan@gmail.com', 'Võ Thị Lan', 'https://i.pravatar.cc/150?img=6', 27, NULL, NULL),
('dangminhk@gmail.com', 'Đặng Minh Khoa', 'https://i.pravatar.cc/150?img=7', 24, NULL, NULL),
('ngocanh@gmail.com', 'Nguyễn Ngọc Anh', 'https://i.pravatar.cc/150?img=8', 29, NULL, NULL);

INSERT INTO `Foods`
(`name`, `description`)
VALUES
('Phở bò', 'Món ăn truyền thống của Hà Nội'),
('Bún bò Huế', 'Đặc sản nổi tiếng của Huế'),
('Cơm tấm sườn', 'Món ăn quen thuộc của Sài Gòn'),
('Bánh mì thịt', 'Ổ bánh mì giòn với thịt nguội'),
('Bún chả', 'Đặc sản Hà Nội'),
('Gỏi cuốn', 'Cuốn tôm thịt ăn kèm nước chấm'),
('Bánh xèo', 'Bánh xèo miền Tây'),
('Hủ tiếu Nam Vang', 'Hủ tiếu nước thơm ngon'),
('Mì Quảng', 'Đặc sản Quảng Nam'),
('Chè ba màu', 'Món tráng miệng giải nhiệt');

INSERT INTO `Articles`
(`title`, `Content`, `imageURL`, `views`, `userId`)
VALUES
('Top 5 món ăn ngon ở TP.HCM',
'Giới thiệu những món ăn nổi tiếng tại TP.HCM.',
'https://picsum.photos/500/300?1',
120,
1),

('Khám phá ẩm thực Hà Nội',
'Những món ăn không thể bỏ qua khi đến Hà Nội.',
'https://picsum.photos/500/300?2',
230,
2),

('Bún bò Huế có gì đặc biệt?',
'Nguồn gốc và hương vị đặc trưng của bún bò Huế.',
'https://picsum.photos/500/300?3',
98,
3),

('Các quán cà phê đẹp ở Đà Lạt',
'Tổng hợp các quán cafe có view đẹp.',
'https://picsum.photos/500/300?4',
350,
4),

('Du lịch Phú Quốc tự túc',
'Kinh nghiệm đi Phú Quốc tiết kiệm.',
'https://picsum.photos/500/300?5',
510,
5),

('Top món ăn đường phố Việt Nam',
'Ẩm thực đường phố luôn hấp dẫn du khách.',
'https://picsum.photos/500/300?6',
670,
2);
