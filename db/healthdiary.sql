-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.10.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for healthdiary
CREATE DATABASE IF NOT EXISTS `healthdiary` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `healthdiary`;

-- Dumping structure for table healthdiary.activities
CREATE TABLE IF NOT EXISTS `activities` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `activity_type` varchar(255) NOT NULL,
  `intensity` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `duration` time DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table healthdiary.activities: ~3 rows (approximately)
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` (`activity_id`, `user_id`, `activity_type`, `intensity`, `created_at`, `duration`) VALUES
	(1, 1, 'Running', 7, '2024-02-05 11:07:05', '00:45:00'),
	(2, 1, 'Cycling', 5, '2024-02-05 11:07:05', '01:30:00'),
	(3, 2, 'Walking', 4, '2024-02-05 11:07:05', '00:30:00');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;

-- Dumping structure for table healthdiary.diaryentries
CREATE TABLE IF NOT EXISTS `diaryentries` (
  `entry_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `entry_date` date NOT NULL,
  `mood` varchar(50) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `sleep_hours` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`entry_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `diaryentries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table healthdiary.diaryentries: ~5 rows (approximately)
/*!40000 ALTER TABLE `diaryentries` DISABLE KEYS */;
INSERT INTO `diaryentries` (`entry_id`, `user_id`, `entry_date`, `mood`, `weight`, `sleep_hours`, `notes`, `created_at`) VALUES
	(3, 1, '2024-01-11', 'Tired', 70.20, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
	(4, 2, '2024-01-10', 'Stressed', 65.00, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00'),
	(5, 1, '2024-02-01', '4', 70.50, 8, 'A good day', '2024-02-05 10:54:10'),
	(6, 1, '2024-02-02', '3', 70.20, 7, 'Feeling tired', '2024-02-05 10:54:10'),
	(7, 2, '2024-02-01', '5', 65.00, 8, 'Excellent day', '2024-02-05 10:54:10');
/*!40000 ALTER TABLE `diaryentries` ENABLE KEYS */;

-- Dumping structure for table healthdiary.measurements
CREATE TABLE IF NOT EXISTS `measurements` (
  `measurement_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `measurement_type` varchar(255) NOT NULL,
  `value` decimal(8,2) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `measurement_time` datetime DEFAULT NULL,
  PRIMARY KEY (`measurement_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `measurements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table healthdiary.measurements: ~7 rows (approximately)
/*!40000 ALTER TABLE `measurements` DISABLE KEYS */;
INSERT INTO `measurements` (`measurement_id`, `user_id`, `measurement_type`, `value`, `unit`, `notes`, `measurement_time`) VALUES
	(1, 1, 'Blood Pressure', 1.50, 'mmHg', 'Normal', NULL),
	(2, 1, 'Blood Sugar', 90.50, 'mg/dL', 'Fasting', NULL),
	(3, 2, 'Heart Rate', 75.00, 'bpm', 'Resting', NULL),
	(4, 1, 'Blood Pressure Systolic', 120.00, 'mmHg', 'Normal', NULL),
	(5, 1, 'Blood Pressure Diastolic', 80.00, 'mmHg', 'Normal', NULL),
	(6, 1, 'Blood Sugar', 90.50, 'mg/dL', 'Fasting', NULL),
	(7, 2, 'Heart Rate', 75.00, 'bpm', 'Resting', NULL);
/*!40000 ALTER TABLE `measurements` ENABLE KEYS */;

-- Dumping structure for table healthdiary.users
CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `user_level` varchar(10) DEFAULT 'regular',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table healthdiary.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `created_at`, `user_level`) VALUES
	(1, 'janedoe', 'temp-pw-2', 'janedoe@example.com', '2024-02-05 10:40:48', 'admin'),
	(2, 'mike_smith', 'temp-pw-3', 'mike@example.com', '2024-02-05 10:40:48', 'moderator');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
