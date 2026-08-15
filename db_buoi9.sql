

-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: nodejs_56
-- Generation Time: 2026-08-15 14:49:56.7400
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `imageURL` varchar(255) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Articles_demo_code_first` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `Content` text,
  `imageURL` varchar(255) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Articles_demo_code_first_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChatGroupMembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `chatGroupId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `chatGroupId` (`chatGroupId`),
  CONSTRAINT `ChatGroupMembers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `ChatGroupMembers_ibfk_2` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChatGroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ownerId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `ChatGroups_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChatMessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatGroupId` int DEFAULT NULL,
  `userIdSender` int DEFAULT NULL,
  `messageText` text,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chatGroupId` (`chatGroupId`),
  KEY `userIdSender` (`userIdSender`),
  CONSTRAINT `ChatMessages_ibfk_1` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`),
  CONSTRAINT `ChatMessages_ibfk_2` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT 'Chưa có thông tin',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `foodId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `foodId` (`foodId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`foodId`) REFERENCES `Foods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avartar` text,
  `age` int DEFAULT NULL,
  `totpSecret` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageURL`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Top 5 món ăn ngon ở TP.HCM', 'Giới thiệu những món ăn nổi tiếng tại TP.HCM.', 'https://picsum.photos/500/300?1', 120, 1, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(2, 'Khám phá ẩm thực Hà Nội', 'Những món ăn không thể bỏ qua khi đến Hà Nội.', 'https://picsum.photos/500/300?2', 230, 2, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(3, 'Bún bò Huế có gì đặc biệt?', 'Nguồn gốc và hương vị đặc trưng của bún bò Huế.', 'https://picsum.photos/500/300?3', 98, 3, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(4, 'Các quán cà phê đẹp ở Đà Lạt', 'Tổng hợp các quán cafe có view đẹp.', 'https://picsum.photos/500/300?4', 350, 4, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(5, 'Du lịch Phú Quốc tự túc', 'Kinh nghiệm đi Phú Quốc tiết kiệm.', 'https://picsum.photos/500/300?5', 510, 5, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(6, 'Top món ăn đường phố Việt Nam', 'Ẩm thực đường phố luôn hấp dẫn du khách.', 'https://picsum.photos/500/300?6', 670, 2, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(7, 'abc', NULL, NULL, 0, 1, 0, 0, NULL, '2026-08-02 08:25:08', '2026-08-02 08:25:08'),
(8, 'abc', '12345567', NULL, 0, 1, 1, 1, '2026-08-02 09:08:44', '2026-08-02 08:25:38', '2026-08-02 09:08:44'),
(9, 'abc', '123', NULL, 0, 1, 0, 0, NULL, '2026-08-02 08:26:08', '2026-08-02 08:26:08');

INSERT INTO `Foods` (`id`, `name`, `description`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Phở bò', 'Món ăn truyền thống của Hà Nội', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(2, 'Bún bò Huế', 'Đặc sản nổi tiếng của Huế', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(3, 'Cơm tấm sườn', 'Món ăn quen thuộc của Sài Gòn', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(4, 'Bánh mì thịt', 'Ổ bánh mì giòn với thịt nguội', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(5, 'Bún chả', 'Đặc sản Hà Nội', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(6, 'Gỏi cuốn', 'Cuốn tôm thịt ăn kèm nước chấm', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(7, 'Bánh xèo', 'Bánh xèo miền Tây', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(8, 'Hủ tiếu Nam Vang', 'Hủ tiếu nước thơm ngon', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(9, 'Mì Quảng', 'Đặc sản Quảng Nam', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04'),
(10, 'Chè ba màu', 'Món tráng miệng giải nhiệt', 0, 0, NULL, '2026-07-25 09:50:04', '2026-07-25 09:50:04');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avartar`, `age`, `totpSecret`, `googleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `password`) VALUES
(1, 'nguyenvana@gmail.com', 'Nguyễn Văn An', 'https://i.pravatar.cc/150?img=1', 25, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(2, 'tranthib@gmail.com', 'Trần Thị Bình', 'https://i.pravatar.cc/150?img=2', 28, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(3, 'leminhc@gmail.com', 'Lê Minh Cường', 'https://i.pravatar.cc/150?img=3', 31, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(4, 'phamthud@gmail.com', 'Phạm Thu Dung', 'https://i.pravatar.cc/150?img=4', 22, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(5, 'hoangquangh@gmail.com', 'Hoàng Quang Huy', 'https://i.pravatar.cc/150?img=5', 35, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(6, 'vothilan@gmail.com', 'Võ Thị Lan', 'https://i.pravatar.cc/150?img=6', 27, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(7, 'dangminhk@gmail.com', 'Đặng Minh Khoa', 'https://i.pravatar.cc/150?img=7', 24, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(8, 'ngocanh@gmail.com', 'Nguyễn Ngọc Anh', 'https://i.pravatar.cc/150?img=8', 29, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL),
(12, 'trinhanthanh@gmail.com', 'Trịnh An Thành', NULL, NULL, NULL, NULL, 0, 0, NULL, '2026-08-09 07:26:57', '2026-08-09 07:26:57', '$2b$10$m18cP86cHnn6SxguFtCu6uKle6kwmsjyvLu/Wi16gjmVF1ZNGALeO');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;