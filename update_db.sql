-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: nodejs_56
-- Generation Time: 2026-09-05 05:34:59.7830
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
  `imageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChatMessageReceipts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatMessageId` int NOT NULL,
  `chatGroupId` int NOT NULL,
  `userId` int NOT NULL,
  `deliveredAt` timestamp NULL DEFAULT NULL,
  `seenAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ChatMessageReceipts_chatMessageId_userId_key` (`chatMessageId`,`userId`),
  KEY `ChatMessageReceipts_userId_chatGroupId_idx` (`userId`,`chatGroupId`),
  KEY `ChatMessageReceipts_chatGroupId_idx` (`chatGroupId`),
  CONSTRAINT `ChatMessageReceipts_chatGroupId_fkey` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ChatMessageReceipts_chatMessageId_fkey` FOREIGN KEY (`chatMessageId`) REFERENCES `ChatMessages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ChatMessageReceipts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `isEdited` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `chatGroupId` (`chatGroupId`),
  KEY `userIdSender` (`userIdSender`),
  CONSTRAINT `ChatMessages_ibfk_1` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`),
  CONSTRAINT `ChatMessages_ibfk_2` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

CREATE TABLE `Permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `method` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `method_url` (`method`,`url`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `RolePermissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roleId_permissionId` (`roleId`,`permissionId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `RolePermissions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `RolePermissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameRole` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nameRole` (`nameRole`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `age` int DEFAULT NULL,
  `totpSecret` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL,
  `lastActiveAt` timestamp NULL DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Tiêu đề bài viết', 'Nội dung bài viết', 'https://picsum.photos/500/300?1', 120, 1, 0, 0, NULL, '2026-07-25 09:50:13', '2026-08-22 08:24:40'),
(2, 'Khám phá ẩm thực Hà Nội', 'Những món ăn không thể bỏ qua khi đến Hà Nội.', 'https://picsum.photos/500/300?2', 230, 2, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(3, 'Bún bò Huế có gì đặc biệt?', 'Nguồn gốc và hương vị đặc trưng của bún bò Huế.', 'https://picsum.photos/500/300?3', 98, 3, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(4, 'Các quán cà phê đẹp ở Đà Lạt', 'Tổng hợp các quán cafe có view đẹp.', 'https://picsum.photos/500/300?4', 350, 4, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(5, 'Du lịch Phú Quốc tự túc', 'Kinh nghiệm đi Phú Quốc tiết kiệm.', 'https://picsum.photos/500/300?5', 510, 5, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(6, 'Top món ăn đường phố Việt Nam', 'Ẩm thực đường phố luôn hấp dẫn du khách.', 'https://picsum.photos/500/300?6', 670, 2, 0, 0, NULL, '2026-07-25 09:50:13', '2026-07-25 09:50:13'),
(7, 'abc', NULL, NULL, 0, 1, 0, 0, NULL, '2026-08-02 08:25:08', '2026-08-02 08:25:08'),
(8, 'abc', '12345567', NULL, 0, 1, 1, 1, '2026-08-02 09:08:44', '2026-08-02 08:25:38', '2026-08-02 09:08:44'),
(9, 'abc', '123', NULL, 0, 1, 1, 1, '2026-08-22 08:29:17', '2026-08-02 08:26:08', '2026-08-22 08:29:17');

INSERT INTO `ChatGroupMembers` (`id`, `userId`, `chatGroupId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 3, 2, 0, 0, NULL, '2026-08-23 07:40:40', '2026-08-23 07:40:40'),
(2, 12, 2, 0, 0, NULL, '2026-08-23 07:40:40', '2026-08-23 07:40:40'),
(3, 3, 3, 0, 0, NULL, '2026-08-23 08:06:40', '2026-08-23 08:06:40'),
(4, 5, 3, 0, 0, NULL, '2026-08-23 08:06:40', '2026-08-23 08:06:40'),
(5, 12, 3, 0, 0, NULL, '2026-08-23 08:06:40', '2026-08-23 08:06:40'),
(6, 5, 4, 0, 0, NULL, '2026-08-23 08:19:17', '2026-08-23 08:19:17'),
(7, 12, 4, 0, 0, NULL, '2026-08-23 08:19:17', '2026-08-23 08:19:17'),
(8, 14, 5, 0, 0, NULL, '2026-08-23 09:02:59', '2026-08-23 09:02:59'),
(9, 12, 5, 0, 0, NULL, '2026-08-23 09:02:59', '2026-08-23 09:02:59');

INSERT INTO `ChatGroups` (`id`, `name`, `ownerId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, NULL, 12, 0, 0, NULL, '2026-08-23 07:40:40', '2026-08-23 07:40:40'),
(3, 'nodejs56', 12, 0, 0, NULL, '2026-08-23 08:06:40', '2026-08-23 08:06:40'),
(4, NULL, 12, 0, 0, NULL, '2026-08-23 08:19:17', '2026-08-23 08:19:17'),
(5, NULL, 12, 0, 0, NULL, '2026-08-23 09:02:59', '2026-08-23 09:02:59');

INSERT INTO `ChatMessages` (`id`, `chatGroupId`, `userIdSender`, `messageText`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `isEdited`) VALUES
(1, 5, 12, 'hello', 0, 0, NULL, '2026-08-23 09:03:11', '2026-08-23 09:03:11', 0),
(2, 5, 12, 'hello', 0, 0, NULL, '2026-08-23 09:03:30', '2026-08-23 09:03:30', 0),
(3, 5, 14, 'hello', 0, 0, NULL, '2026-08-23 09:03:56', '2026-08-23 09:03:56', 0),
(4, 5, 12, 'hello nodejs', 0, 0, NULL, '2026-08-23 09:04:01', '2026-08-23 09:04:01', 0),
(5, 5, 12, 'nodejs56', 0, 0, NULL, '2026-08-23 09:04:41', '2026-08-23 09:04:41', 0),
(6, 5, 14, 'áodiuhfasdf', 0, 0, NULL, '2026-08-23 09:04:45', '2026-08-23 09:04:45', 0),
(7, 5, 12, 'ádohasd', 0, 0, NULL, '2026-08-23 09:14:03', '2026-08-23 09:14:03', 0),
(8, 5, 14, 'ádahsdoasd', 0, 0, NULL, '2026-08-23 09:14:11', '2026-08-23 09:14:11', 0),
(9, 5, 14, 'ilsydgvf', 0, 0, NULL, '2026-08-23 09:14:12', '2026-08-23 09:14:12', 0),
(10, 5, 12, 'ialdsfgadsf', 0, 0, NULL, '2026-08-23 09:14:15', '2026-08-23 09:14:15', 0);

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

INSERT INTO `Permissions` (`id`, `method`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'POST', '/auth/login', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(2, 'GET', '/auth/get-info', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(3, 'GET', '/article', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(4, 'GET', '/article/:id', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(5, 'POST', '/article', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(6, 'PATCH', '/article/:id', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(7, 'DELETE', '/article/:id', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(8, 'GET', '/permission/roles', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(9, 'POST', '/permission/roles', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(10, 'GET', '/permission/permissions', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(11, 'POST', '/permission/permissions', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(12, 'GET', '/permission/role-permissions', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(13, 'POST', '/permission/role-permissions', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(14, 'PATCH', '/permission/role-permissions/:id', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(15, 'DELETE', '/permission/role-permissions/:id', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(16, 'GET', '/permission/users', '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(17, 'PATCH', '/permission/users/:id/role', '2026-09-04 22:19:43', '2026-09-04 22:19:43');

INSERT INTO `RolePermissions` (`id`, `roleId`, `permissionId`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(2, 1, 2, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(3, 1, 3, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(4, 1, 4, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(5, 1, 5, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(6, 1, 6, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(7, 1, 7, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(8, 2, 1, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(9, 2, 2, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(10, 2, 3, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(11, 2, 4, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(12, 2, 5, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(13, 2, 6, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(14, 2, 7, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(15, 3, 2, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(16, 3, 3, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(17, 3, 4, 1, '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(18, 1, 8, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(19, 1, 9, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(20, 1, 10, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(21, 1, 11, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(22, 1, 12, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(23, 1, 13, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(24, 1, 14, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(25, 1, 15, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(26, 1, 16, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43'),
(27, 1, 17, 1, '2026-09-04 22:19:43', '2026-09-04 22:19:43');

INSERT INTO `Roles` (`id`, `nameRole`, `createdAt`, `updatedAt`) VALUES
(1, 'superAD', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(2, 'admin', '2026-09-04 22:14:45', '2026-09-04 22:14:45'),
(3, 'user', '2026-09-04 22:14:45', '2026-09-04 22:14:45');

INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `age`, `totpSecret`, `googleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `password`, `lastActiveAt`, `roleId`) VALUES
(1, 'nguyenvana@gmail.com', 'Nguyễn Văn An', 'https://i.pravatar.cc/150?img=1', 25, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-09-04 22:15:11', NULL, NULL, 2),
(2, 'tranthib@gmail.com', 'Trần Thị Bình', 'https://i.pravatar.cc/150?img=2', 28, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-09-04 22:20:03', NULL, NULL, 1),
(3, 'leminhc@gmail.com', 'Lê Minh Cường', 'https://i.pravatar.cc/150?img=3', 31, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL, NULL, NULL),
(4, 'phamthud@gmail.com', 'Phạm Thu Dung', 'https://i.pravatar.cc/150?img=4', 22, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL, NULL, NULL),
(5, 'hoangquangh@gmail.com', 'Hoàng Quang Huy', 'https://i.pravatar.cc/150?img=5', 35, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL, NULL, NULL),
(6, 'vothilan@gmail.com', 'Võ Thị Lan', 'https://i.pravatar.cc/150?img=6', 27, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL, NULL, NULL),
(7, 'dangminhk@gmail.com', 'Đặng Minh Khoa', 'https://i.pravatar.cc/150?img=7', 24, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL, NULL, NULL),
(8, 'ngocanh@gmail.com', 'Nguyễn Ngọc Anh', 'https://i.pravatar.cc/150?img=8', 29, NULL, NULL, 0, 0, NULL, '2026-07-25 09:49:55', '2026-07-25 09:49:55', NULL, NULL, NULL),
(12, 'trinhanthanh@gmail.com', 'Trịnh An Thành', 'local-1787388616259-508264354.jpg', NULL, NULL, NULL, 0, 0, NULL, '2026-08-09 07:26:57', '2026-08-22 08:50:16', '$2b$10$m18cP86cHnn6SxguFtCu6uKle6kwmsjyvLu/Wi16gjmVF1ZNGALeO', NULL, NULL),
(13, 'dragonsnake22596@gmail.com', 'T T', 'https://lh3.googleusercontent.com/a/ACg8ocJTuhRCxccO5xcx1xpiIbUODZYenNWLnfeWCyUsl8yR0ZCvWDQ=s96-c', NULL, NULL, '106124334533724337697', 0, 0, NULL, '2026-08-16 07:44:18', '2026-08-16 07:44:18', NULL, NULL, NULL),
(14, 'trinhanthanh123@gmail.com', 'An Thành Trịnh', NULL, NULL, NULL, NULL, 0, 0, NULL, '2026-08-23 09:02:36', '2026-08-23 09:02:36', '$2b$10$VhAoOnDbQ3V7uQrEHvJW6eu5ACjY5fwoxABeDeYGp1ruTBp9k/CCG', NULL, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;