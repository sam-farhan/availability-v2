-- --------------------------------------------------------
-- Host:                         database-availability-app.cxoeb9jxbay5.eu-north-1.rds.amazonaws.com
-- Server version:               8.0.33 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.6.0.6811
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table availability_db.availability
CREATE TABLE IF NOT EXISTS `availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL DEFAULT '0',
  `week` int NOT NULL DEFAULT '0',
  `availability_user` int NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `year_week_availability_user` (`year`,`week`,`availability_user`),
  KEY `FK_availability_user` (`availability_user`),
  CONSTRAINT `FK_availability_user` FOREIGN KEY (`availability_user`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table availability_db.availability: ~10 rows (approximately)
INSERT INTO `availability` (`id`, `year`, `week`, `availability_user`, `data`) VALUES
	(1, 2024, 10, 1, '[{"day": 1, "index": "0"}, {"day": 1, "index": "1"}, {"day": 1, "index": "2"}, {"day": 4, "index": "0"}, {"day": 4, "index": "1"}, {"day": 4, "index": "2"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}]'),
	(2, 2024, 11, 1, '[{"day": 6, "index": "0"}, {"day": 6, "index": "1"}, {"day": 6, "index": "2"}, {"day": 6, "index": "3"}, {"day": 6, "index": "4"}, {"day": 6, "index": "5"}, {"day": 6, "index": "6"}, {"day": 6, "index": "7"}, {"day": 6, "index": "8"}, {"day": 6, "index": "9"}, {"day": 6, "index": "10"}, {"day": 6, "index": "11"}, {"day": 6, "index": "12"}, {"day": 6, "index": "13"}, {"day": 6, "index": "14"}, {"day": 6, "index": "15"}, {"day": 6, "index": "16"}, {"day": 6, "index": "17"}, {"day": 6, "index": "18"}, {"day": 6, "index": "19"}, {"day": 6, "index": "20"}, {"day": 6, "index": "21"}, {"day": 6, "index": "22"}, {"day": 6, "index": "23"}, {"day": 6, "index": "24"}, {"day": 6, "index": "25"}, {"day": 6, "index": "26"}, {"day": 6, "index": "27"}, {"day": 6, "index": "28"}, {"day": 6, "index": "29"}, {"day": 6, "index": "30"}, {"day": 6, "index": "31"}, {"day": 6, "index": "32"}, {"day": 7, "index": "5"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "0"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}]'),
	(3, 2024, 10, 2, '[{"day": 2, "index": "7"}, {"day": 2, "index": "10"}, {"day": 2, "index": "12"}, {"day": 3, "index": "0"}, {"day": 3, "index": "1"}, {"day": 3, "index": "2"}, {"day": 3, "index": "3"}, {"day": 3, "index": "4"}, {"day": 3, "index": "5"}, {"day": 3, "index": "6"}, {"day": 3, "index": "7"}, {"day": 3, "index": "8"}, {"day": 3, "index": "9"}, {"day": 3, "index": "10"}, {"day": 3, "index": "11"}, {"day": 3, "index": "12"}, {"day": 3, "index": "13"}, {"day": 3, "index": "14"}, {"day": 3, "index": "15"}, {"day": 3, "index": "16"}, {"day": 3, "index": "17"}, {"day": 3, "index": "18"}, {"day": 3, "index": "19"}, {"day": 3, "index": "20"}, {"day": 3, "index": "21"}, {"day": 3, "index": "22"}, {"day": 3, "index": "23"}, {"day": 3, "index": "24"}, {"day": 3, "index": "25"}, {"day": 3, "index": "26"}, {"day": 3, "index": "27"}, {"day": 3, "index": "28"}, {"day": 3, "index": "29"}, {"day": 3, "index": "30"}, {"day": 3, "index": "31"}, {"day": 3, "index": "32"}, {"day": 5, "index": "7"}, {"day": 5, "index": "7"}, {"day": 5, "index": "8"}, {"day": 5, "index": "9"}, {"day": 5, "index": "10"}, {"day": 5, "index": "11"}, {"day": 5, "index": "12"}, {"day": 5, "index": "13"}, {"day": 5, "index": "14"}, {"day": 5, "index": "15"}, {"day": 5, "index": "16"}, {"day": 5, "index": "17"}, {"day": 5, "index": "18"}, {"day": 5, "index": "19"}, {"day": 5, "index": "20"}, {"day": 5, "index": "21"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}]'),
	(4, 2024, 11, 2, '[{"day": 2, "index": "7"}, {"day": 2, "index": "10"}, {"day": 2, "index": "12"}, {"day": 3, "index": "0"}, {"day": 3, "index": "1"}, {"day": 3, "index": "2"}, {"day": 3, "index": "3"}, {"day": 3, "index": "4"}, {"day": 3, "index": "5"}, {"day": 3, "index": "6"}, {"day": 3, "index": "7"}, {"day": 3, "index": "8"}, {"day": 3, "index": "9"}, {"day": 3, "index": "10"}, {"day": 3, "index": "11"}, {"day": 3, "index": "12"}, {"day": 3, "index": "13"}, {"day": 3, "index": "14"}, {"day": 3, "index": "15"}, {"day": 3, "index": "16"}, {"day": 3, "index": "17"}, {"day": 3, "index": "18"}, {"day": 3, "index": "19"}, {"day": 3, "index": "20"}, {"day": 3, "index": "21"}, {"day": 3, "index": "22"}, {"day": 3, "index": "23"}, {"day": 3, "index": "24"}, {"day": 3, "index": "25"}, {"day": 3, "index": "26"}, {"day": 3, "index": "27"}, {"day": 3, "index": "28"}, {"day": 3, "index": "29"}, {"day": 3, "index": "30"}, {"day": 3, "index": "31"}, {"day": 3, "index": "32"}, {"day": 5, "index": "7"}, {"day": 5, "index": "7"}, {"day": 5, "index": "8"}, {"day": 5, "index": "9"}, {"day": 5, "index": "10"}, {"day": 5, "index": "11"}, {"day": 5, "index": "12"}, {"day": 5, "index": "13"}, {"day": 5, "index": "14"}, {"day": 5, "index": "15"}, {"day": 5, "index": "16"}, {"day": 5, "index": "17"}, {"day": 5, "index": "18"}, {"day": 5, "index": "19"}, {"day": 5, "index": "20"}, {"day": 5, "index": "21"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}]'),
	(5, 2024, 12, 2, '[{"day": 3, "index": "0"}, {"day": 3, "index": "1"}, {"day": 3, "index": "2"}, {"day": 3, "index": "3"}, {"day": 3, "index": "4"}, {"day": 3, "index": "5"}, {"day": 3, "index": "6"}, {"day": 3, "index": "7"}, {"day": 3, "index": "8"}, {"day": 3, "index": "9"}, {"day": 3, "index": "10"}, {"day": 3, "index": "11"}, {"day": 3, "index": "12"}, {"day": 3, "index": "13"}, {"day": 3, "index": "14"}, {"day": 3, "index": "15"}, {"day": 3, "index": "16"}, {"day": 3, "index": "17"}, {"day": 3, "index": "18"}, {"day": 3, "index": "19"}, {"day": 3, "index": "20"}, {"day": 3, "index": "21"}, {"day": 3, "index": "22"}, {"day": 3, "index": "23"}, {"day": 3, "index": "24"}, {"day": 3, "index": "25"}, {"day": 3, "index": "26"}, {"day": 3, "index": "27"}, {"day": 3, "index": "28"}, {"day": 3, "index": "29"}, {"day": 3, "index": "30"}, {"day": 3, "index": "31"}, {"day": 3, "index": "32"}, {"day": 5, "index": "7"}, {"day": 5, "index": "7"}, {"day": 5, "index": "8"}, {"day": 5, "index": "9"}, {"day": 5, "index": "10"}, {"day": 5, "index": "11"}, {"day": 5, "index": "12"}, {"day": 5, "index": "13"}, {"day": 5, "index": "14"}, {"day": 5, "index": "15"}, {"day": 5, "index": "16"}, {"day": 5, "index": "17"}, {"day": 5, "index": "18"}, {"day": 5, "index": "19"}, {"day": 5, "index": "20"}, {"day": 5, "index": "21"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}]'),
	(7, 2024, 13, 2, '[{"day": 5, "index": "4"}, {"day": 5, "index": "23"}, {"day": 5, "index": "11"}, {"day": 5, "index": "10"}, {"day": 5, "index": "9"}, {"day": 5, "index": "8"}, {"day": 5, "index": "7"}, {"day": 6, "index": "0"}, {"day": 6, "index": "1"}, {"day": 6, "index": "2"}, {"day": 6, "index": "3"}, {"day": 6, "index": "4"}, {"day": 6, "index": "5"}, {"day": 6, "index": "6"}, {"day": 6, "index": "7"}, {"day": 6, "index": "8"}, {"day": 6, "index": "9"}, {"day": 6, "index": "10"}, {"day": 6, "index": "11"}, {"day": 6, "index": "12"}, {"day": 6, "index": "13"}, {"day": 6, "index": "14"}, {"day": 6, "index": "15"}, {"day": 6, "index": "16"}, {"day": 6, "index": "17"}, {"day": 6, "index": "18"}, {"day": 6, "index": "19"}, {"day": 6, "index": "20"}, {"day": 6, "index": "21"}, {"day": 6, "index": "22"}, {"day": 6, "index": "23"}, {"day": 6, "index": "24"}, {"day": 6, "index": "25"}, {"day": 6, "index": "26"}, {"day": 6, "index": "27"}, {"day": 6, "index": "28"}, {"day": 6, "index": "29"}, {"day": 6, "index": "30"}, {"day": 6, "index": "31"}, {"day": 6, "index": "32"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}]'),
	(8, 2024, 11, 4, '[{"day": 1, "index": "0"}, {"day": 1, "index": "1"}, {"day": 1, "index": "2"}, {"day": 1, "index": "3"}, {"day": 1, "index": "4"}, {"day": 1, "index": "5"}, {"day": 1, "index": "6"}, {"day": 1, "index": "12"}, {"day": 1, "index": "14"}, {"day": 1, "index": "15"}, {"day": 1, "index": "16"}, {"day": 1, "index": "17"}, {"day": 1, "index": "18"}, {"day": 1, "index": "19"}, {"day": 1, "index": "20"}, {"day": 1, "index": "21"}, {"day": 1, "index": "22"}, {"day": 1, "index": "23"}, {"day": 1, "index": "24"}, {"day": 1, "index": "25"}, {"day": 1, "index": "26"}, {"day": 1, "index": "27"}, {"day": 1, "index": "28"}, {"day": 1, "index": "29"}, {"day": 1, "index": "30"}, {"day": 1, "index": "31"}, {"day": 1, "index": "32"}, {"day": 1, "index": "7"}, {"day": 1, "index": "8"}, {"day": 1, "index": "9"}, {"day": 1, "index": "11"}, {"day": 1, "index": "10"}, {"day": 1, "index": "13"}, {"day": 2, "index": "0"}, {"day": 2, "index": "1"}, {"day": 2, "index": "2"}, {"day": 2, "index": "3"}, {"day": 2, "index": "4"}, {"day": 2, "index": "5"}, {"day": 2, "index": "6"}, {"day": 2, "index": "16"}, {"day": 2, "index": "17"}, {"day": 2, "index": "18"}, {"day": 2, "index": "19"}, {"day": 2, "index": "20"}, {"day": 2, "index": "21"}, {"day": 2, "index": "22"}, {"day": 2, "index": "23"}, {"day": 2, "index": "24"}, {"day": 2, "index": "25"}, {"day": 2, "index": "26"}, {"day": 2, "index": "27"}, {"day": 2, "index": "28"}, {"day": 2, "index": "29"}, {"day": 2, "index": "30"}, {"day": 2, "index": "31"}, {"day": 2, "index": "32"}, {"day": 2, "index": "8"}, {"day": 2, "index": "7"}, {"day": 2, "index": "15"}, {"day": 3, "index": "0"}, {"day": 3, "index": "1"}, {"day": 3, "index": "2"}, {"day": 3, "index": "3"}, {"day": 3, "index": "4"}, {"day": 3, "index": "5"}, {"day": 3, "index": "6"}, {"day": 3, "index": "7"}, {"day": 3, "index": "8"}, {"day": 3, "index": "9"}, {"day": 3, "index": "10"}, {"day": 3, "index": "11"}, {"day": 3, "index": "12"}, {"day": 3, "index": "13"}, {"day": 3, "index": "14"}, {"day": 3, "index": "15"}, {"day": 3, "index": "16"}, {"day": 3, "index": "17"}, {"day": 3, "index": "18"}, {"day": 3, "index": "19"}, {"day": 3, "index": "20"}, {"day": 3, "index": "21"}, {"day": 3, "index": "22"}, {"day": 3, "index": "23"}, {"day": 3, "index": "24"}, {"day": 3, "index": "25"}, {"day": 3, "index": "26"}, {"day": 3, "index": "27"}, {"day": 3, "index": "28"}, {"day": 3, "index": "29"}, {"day": 3, "index": "30"}, {"day": 3, "index": "31"}, {"day": 3, "index": "32"}, {"day": 4, "index": "0"}, {"day": 4, "index": "1"}, {"day": 4, "index": "2"}, {"day": 4, "index": "3"}, {"day": 4, "index": "4"}, {"day": 4, "index": "11"}, {"day": 4, "index": "12"}, {"day": 4, "index": "13"}, {"day": 4, "index": "14"}, {"day": 4, "index": "15"}, {"day": 4, "index": "16"}, {"day": 4, "index": "24"}, {"day": 4, "index": "25"}, {"day": 4, "index": "26"}, {"day": 4, "index": "27"}, {"day": 4, "index": "28"}, {"day": 4, "index": "29"}, {"day": 4, "index": "30"}, {"day": 4, "index": "31"}, {"day": 4, "index": "32"}, {"day": 4, "index": "5"}, {"day": 5, "index": "0"}, {"day": 5, "index": "1"}, {"day": 5, "index": "2"}, {"day": 5, "index": "3"}, {"day": 5, "index": "4"}, {"day": 5, "index": "5"}, {"day": 5, "index": "6"}, {"day": 5, "index": "7"}, {"day": 5, "index": "8"}, {"day": 5, "index": "9"}, {"day": 5, "index": "10"}, {"day": 6, "index": "0"}, {"day": 6, "index": "1"}, {"day": 6, "index": "2"}, {"day": 6, "index": "3"}, {"day": 6, "index": "4"}, {"day": 6, "index": "5"}, {"day": 6, "index": "6"}, {"day": 6, "index": "7"}, {"day": 6, "index": "8"}, {"day": 6, "index": "9"}, {"day": 6, "index": "10"}, {"day": 6, "index": "11"}, {"day": 6, "index": "12"}, {"day": 6, "index": "13"}, {"day": 6, "index": "14"}, {"day": 6, "index": "15"}, {"day": 6, "index": "16"}, {"day": 6, "index": "17"}, {"day": 6, "index": "18"}, {"day": 6, "index": "19"}, {"day": 6, "index": "20"}, {"day": 6, "index": "21"}, {"day": 6, "index": "22"}, {"day": 6, "index": "23"}, {"day": 6, "index": "24"}, {"day": 6, "index": "25"}, {"day": 6, "index": "26"}, {"day": 6, "index": "27"}, {"day": 6, "index": "28"}, {"day": 6, "index": "29"}, {"day": 6, "index": "30"}, {"day": 6, "index": "31"}, {"day": 6, "index": "32"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}]'),
	(9, 2024, 11, 5, '[{"day": 1, "index": "13"}, {"day": 1, "index": "14"}, {"day": 1, "index": "15"}, {"day": 1, "index": "16"}, {"day": 1, "index": "17"}, {"day": 1, "index": "18"}, {"day": 1, "index": "19"}, {"day": 1, "index": "20"}, {"day": 1, "index": "21"}, {"day": 1, "index": "22"}, {"day": 1, "index": "23"}, {"day": 1, "index": "24"}, {"day": 1, "index": "25"}, {"day": 1, "index": "26"}, {"day": 1, "index": "27"}, {"day": 1, "index": "28"}, {"day": 1, "index": "29"}, {"day": 1, "index": "30"}, {"day": 1, "index": "31"}, {"day": 1, "index": "32"}, {"day": 2, "index": "0"}, {"day": 2, "index": "1"}, {"day": 2, "index": "2"}, {"day": 2, "index": "3"}, {"day": 2, "index": "4"}, {"day": 2, "index": "5"}, {"day": 2, "index": "6"}, {"day": 2, "index": "7"}, {"day": 2, "index": "8"}, {"day": 2, "index": "9"}, {"day": 2, "index": "10"}, {"day": 2, "index": "11"}, {"day": 2, "index": "12"}, {"day": 2, "index": "13"}, {"day": 2, "index": "14"}, {"day": 2, "index": "15"}, {"day": 2, "index": "16"}, {"day": 2, "index": "17"}, {"day": 2, "index": "18"}, {"day": 2, "index": "19"}, {"day": 2, "index": "20"}, {"day": 2, "index": "21"}, {"day": 2, "index": "22"}, {"day": 2, "index": "23"}, {"day": 2, "index": "24"}, {"day": 2, "index": "25"}, {"day": 2, "index": "26"}, {"day": 2, "index": "27"}, {"day": 2, "index": "28"}, {"day": 2, "index": "29"}, {"day": 2, "index": "30"}, {"day": 2, "index": "31"}, {"day": 2, "index": "32"}, {"day": 3, "index": "0"}, {"day": 3, "index": "1"}, {"day": 3, "index": "2"}, {"day": 3, "index": "3"}, {"day": 3, "index": "4"}, {"day": 3, "index": "5"}, {"day": 3, "index": "6"}, {"day": 3, "index": "7"}, {"day": 3, "index": "8"}, {"day": 3, "index": "9"}, {"day": 3, "index": "10"}, {"day": 3, "index": "11"}, {"day": 3, "index": "12"}, {"day": 3, "index": "13"}, {"day": 3, "index": "14"}, {"day": 3, "index": "15"}, {"day": 3, "index": "16"}, {"day": 3, "index": "17"}, {"day": 3, "index": "18"}, {"day": 3, "index": "19"}, {"day": 3, "index": "20"}, {"day": 3, "index": "21"}, {"day": 3, "index": "22"}, {"day": 3, "index": "23"}, {"day": 3, "index": "24"}, {"day": 3, "index": "25"}, {"day": 3, "index": "26"}, {"day": 3, "index": "27"}, {"day": 3, "index": "28"}, {"day": 3, "index": "29"}, {"day": 3, "index": "30"}, {"day": 3, "index": "31"}, {"day": 3, "index": "32"}, {"day": 4, "index": "15"}, {"day": 4, "index": "16"}, {"day": 4, "index": "17"}, {"day": 4, "index": "18"}, {"day": 4, "index": "19"}, {"day": 4, "index": "20"}, {"day": 4, "index": "21"}, {"day": 4, "index": "22"}, {"day": 4, "index": "23"}, {"day": 4, "index": "24"}, {"day": 4, "index": "25"}, {"day": 4, "index": "26"}, {"day": 4, "index": "27"}, {"day": 4, "index": "28"}, {"day": 4, "index": "29"}, {"day": 4, "index": "30"}, {"day": 4, "index": "31"}, {"day": 4, "index": "32"}, {"day": 4, "index": "14"}, {"day": 4, "index": "13"}, {"day": 4, "index": "12"}, {"day": 4, "index": "11"}, {"day": 5, "index": "0"}, {"day": 5, "index": "1"}, {"day": 5, "index": "2"}, {"day": 5, "index": "3"}, {"day": 5, "index": "4"}, {"day": 5, "index": "5"}, {"day": 5, "index": "6"}, {"day": 5, "index": "7"}, {"day": 5, "index": "8"}, {"day": 5, "index": "17"}, {"day": 5, "index": "18"}, {"day": 5, "index": "19"}, {"day": 5, "index": "20"}, {"day": 5, "index": "21"}, {"day": 5, "index": "22"}, {"day": 5, "index": "23"}, {"day": 5, "index": "24"}, {"day": 5, "index": "25"}, {"day": 5, "index": "26"}, {"day": 5, "index": "27"}, {"day": 5, "index": "28"}, {"day": 5, "index": "29"}, {"day": 5, "index": "30"}, {"day": 5, "index": "31"}, {"day": 5, "index": "32"}, {"day": 5, "index": "15"}, {"day": 5, "index": "16"}, {"day": 6, "index": "0"}, {"day": 6, "index": "1"}, {"day": 6, "index": "2"}, {"day": 6, "index": "3"}, {"day": 6, "index": "4"}, {"day": 6, "index": "5"}, {"day": 6, "index": "6"}, {"day": 6, "index": "7"}, {"day": 6, "index": "8"}, {"day": 6, "index": "9"}, {"day": 6, "index": "10"}, {"day": 6, "index": "11"}, {"day": 6, "index": "12"}, {"day": 6, "index": "13"}, {"day": 6, "index": "14"}, {"day": 6, "index": "15"}, {"day": 6, "index": "16"}, {"day": 6, "index": "17"}, {"day": 6, "index": "18"}, {"day": 6, "index": "19"}, {"day": 6, "index": "20"}, {"day": 6, "index": "21"}, {"day": 6, "index": "22"}, {"day": 6, "index": "23"}, {"day": 6, "index": "24"}, {"day": 6, "index": "25"}, {"day": 6, "index": "26"}, {"day": 6, "index": "27"}, {"day": 6, "index": "28"}, {"day": 6, "index": "29"}, {"day": 6, "index": "30"}, {"day": 6, "index": "31"}, {"day": 6, "index": "32"}, {"day": 7, "index": "0"}, {"day": 7, "index": "1"}, {"day": 7, "index": "2"}, {"day": 7, "index": "3"}, {"day": 7, "index": "4"}, {"day": 7, "index": "5"}, {"day": 7, "index": "6"}, {"day": 7, "index": "7"}, {"day": 7, "index": "8"}, {"day": 7, "index": "9"}, {"day": 7, "index": "10"}, {"day": 7, "index": "11"}, {"day": 7, "index": "12"}, {"day": 7, "index": "13"}, {"day": 7, "index": "14"}, {"day": 7, "index": "15"}, {"day": 7, "index": "16"}, {"day": 7, "index": "17"}, {"day": 7, "index": "18"}, {"day": 7, "index": "19"}, {"day": 7, "index": "20"}, {"day": 7, "index": "21"}, {"day": 7, "index": "22"}, {"day": 7, "index": "23"}, {"day": 7, "index": "24"}, {"day": 7, "index": "25"}, {"day": 7, "index": "26"}, {"day": 7, "index": "27"}, {"day": 7, "index": "28"}, {"day": 7, "index": "29"}, {"day": 7, "index": "30"}, {"day": 7, "index": "31"}, {"day": 7, "index": "32"}]'),
	(10, 2024, 10, 7, '[]'),
	(11, 2024, 11, 7, '[{"day": 2, "index": "22"}, {"day": 2, "index": "23"}, {"day": 2, "index": "24"}, {"day": 2, "index": "25"}, {"day": 2, "index": "27"}, {"day": 2, "index": "26"}, {"day": 2, "index": "28"}, {"day": 2, "index": "29"}, {"day": 2, "index": "30"}, {"day": 6, "index": "6"}, {"day": 6, "index": "7"}, {"day": 6, "index": "8"}, {"day": 6, "index": "9"}, {"day": 6, "index": "10"}, {"day": 6, "index": "11"}, {"day": 6, "index": "12"}, {"day": 6, "index": "13"}, {"day": 6, "index": "14"}, {"day": 6, "index": "15"}, {"day": 6, "index": "16"}, {"day": 6, "index": "17"}, {"day": 6, "index": "19"}, {"day": 6, "index": "18"}, {"day": 6, "index": "20"}, {"day": 6, "index": "21"}, {"day": 6, "index": "22"}, {"day": 6, "index": "23"}, {"day": 6, "index": "24"}, {"day": 6, "index": "25"}, {"day": 6, "index": "27"}, {"day": 6, "index": "26"}, {"day": 6, "index": "28"}, {"day": 6, "index": "29"}]');

-- Dumping structure for table availability_db.squad
CREATE TABLE IF NOT EXISTS `squad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `metadata` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table availability_db.squad: ~3 rows (approximately)
INSERT INTO `squad` (`id`, `name`, `metadata`) VALUES
	(2, 'Squad name', '{"created_on": "2024-03-06 18:03:28", "created_by_email": "test@test.test"}'),
	(3, 'Test', '{"created_on": "2024-03-07 09:03:17", "created_by_email": "me@samfarhan.uk"}'),
	(4, 'Mgz', '{"created_on": "2024-03-07 13:03:30", "created_by_email": "b.berbers@live.nl"}');

-- Dumping structure for table availability_db.squad_user
CREATE TABLE IF NOT EXISTS `squad_user` (
  `squad_id` int NOT NULL,
  `user_id` int NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`squad_id`,`user_id`),
  UNIQUE KEY `squad_id_user_id` (`squad_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table availability_db.squad_user: ~6 rows (approximately)
INSERT INTO `squad_user` (`squad_id`, `user_id`, `role`) VALUES
	(2, 1, 'Coach'),
	(3, 2, 'Coach'),
	(4, 1, 'Rower'),
	(4, 2, 'Rower'),
	(4, 3, 'Rower'),
	(4, 4, 'Coach');

-- Dumping structure for table availability_db.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL DEFAULT '0',
  `last_name` varchar(50) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL DEFAULT '0',
  `metadata` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table availability_db.user: ~8 rows (approximately)
INSERT INTO `user` (`id`, `first_name`, `last_name`, `password`, `email`, `metadata`) VALUES
	(1, 'Test', 'Man', '$2b$10$aCkZaSWy02p5gmkqinWx1Oo5yy7pfhC4sFFcdbujhWI5PdmatvM.C', 'test@test.test', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0", "last_login": "2024-03-06 18:03:97"}'),
	(2, 'Sam', 'Farhan', '$2b$10$miazWb7rEnHoflJ2uZeUluqu..xbzfjw1fZwrJgeqtimcAE5IegE.', 'me@samfarhan.uk', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0", "last_login": "2024-03-08 08:28:37"}'),
	(3, 'Thijn', 'van Vliet', '$2b$10$/ZoOUYGNsRF9naGtgu604etBvIe7btMZW3l35oieDYDIaRYnRfTv6', 'thijn.van.vliet@hotmail.com', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36", "last_login": "2024-03-07 13:29:01"}'),
	(4, 'Bart', 'Berbers', '$2b$10$MuMAsl6xVQOHjKCGPirgOuQa3f2Ozf5cKi19sUhM29cgO2oqb2xmO', 'b.berbers@live.nl', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (Linux; Android 11; ONEPLUS A6013) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36", "last_login": "2024-03-07 13:30:42"}'),
	(5, 'Mirko', 'de Pagter', '$2b$10$OMvtOxVJbtFLvIaDsOgxJulB1yvF6guCWAs4OAcKcg3VvMGrm5nWa', 'm.a.c.depagter@students.uu.nl', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1", "last_login": "2024-03-07 13:36:50"}'),
	(6, 'Igor', 'Chládek', '$2b$10$FnzaUDZRyWkB/cdMU6uaNupGAccfkHhdv/y5a6N.RjUYl5JoAdWc.', 'igichladek@gmail.com', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36", "last_login": "2024-03-07 13:50:59"}'),
	(7, 'Igor', 'Chládek', '$2b$10$LPJPYMb5ldjvhCZKr84e3e/YGn9ZQGFi4Rn5jdRYuqVqkrdPYU8Cm', 'i.chladek@students.uu.nl', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36", "last_login": "2024-03-07 13:53:12"}'),
	(8, 'Beau', 'De Jong', '$2b$10$DLrNG8qHibQumXEsL00/KeCRN6.G.dX25dvAabFbGRHyeZKh9zKnK', 'beau-xx@live.nl', '{"ip": "::ffff:127.0.0.1", "agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1", "last_login": "2024-03-08 06:46:21"}');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
