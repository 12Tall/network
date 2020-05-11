-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.4.12-MariaDB - mariadb.org binary distribution
-- 服务器OS:                        Win64
-- HeidiSQL 版本:                  10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for my_db
CREATE DATABASE IF NOT EXISTS `my_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `my_db`;

-- Dumping structure for table my_db.dept
CREATE TABLE IF NOT EXISTS `dept` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `super_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. 部门表';

-- Data exporting was unselected.

-- Dumping structure for table my_db.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `dept_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `dept_role` (`dept_id`),
  CONSTRAINT `dept_role` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. 删除部门时，需要同时删除角色信息；\r\n2. 相应地，还需要级联地删除人员角色中间表的内容；';

-- Data exporting was unselected.

-- Dumping structure for table my_db.role_service
CREATE TABLE IF NOT EXISTS `role_service` (
  `role_id` int(10) unsigned NOT NULL,
  `service_id` int(10) unsigned NOT NULL,
  KEY `role_service` (`role_id`),
  KEY `service_role` (`service_id`),
  CONSTRAINT `role_service` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `service_role` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. 删除角色、服务会删除对应的纪录  \r\n2. 角色记录互不影响';

-- Data exporting was unselected.

-- Dumping structure for table my_db.service
CREATE TABLE IF NOT EXISTS `service` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `controller` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `service` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. 接口  \r\n2. 以controller 分类，service 细分的两层结构';

-- Data exporting was unselected.

-- Dumping structure for table my_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` char(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '68eacb97d86f0c4621fa2b0e17cabd8c',
  `salt` char(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '68eacb97d86f0c4621fa2b0e17cabd8c',
  `register_from` enum('local','ldap') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'local',
  `user_state` enum('normal','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'expired',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. user_id 会成为很多表的外键；\r\n2. 密码加盐存储；';

-- Data exporting was unselected.

-- Dumping structure for table my_db.user_dept
CREATE TABLE IF NOT EXISTS `user_dept` (
  `user_id` int(10) unsigned NOT NULL,
  `dept_id` int(10) unsigned NOT NULL,
  KEY `dept_user` (`dept_id`),
  KEY `user_dept` (`user_id`),
  CONSTRAINT `dept_user` FOREIGN KEY (`dept_id`) REFERENCES `dept` (`id`),
  CONSTRAINT `user_dept` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. user - dept 中间表  \r\n2. 添加记录时应先检查用户、部门是否存在  \r\n3. 删除部门是应检查是否有记录未删除';

-- Data exporting was unselected.

-- Dumping structure for table my_db.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  KEY `user_role` (`user_id`),
  KEY `role_user` (`role_id`),
  CONSTRAINT `role_user` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='1. 删除user 同步删除中间表  \r\n2. 删除科室 --> 删除角色 --> 删除中间表';

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
