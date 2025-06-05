CREATE DATABASE  IF NOT EXISTS `ticketing_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ticketing_system`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.2    Database: ticketing_system
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` bigint NOT NULL,
  `name` varchar(250) NOT NULL,
  `user_id` int DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `project_manager_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `phase_id` int DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `name` (`name`),
  KEY `fk_project_client` (`client_id`),
  KEY `fk_project_phase` (`phase_id`),
  KEY `fk_project_manager` (`project_manager_id`),
  KEY `projects_ibfk_1` (`user_id`),
  CONSTRAINT `fk_project_client` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_project_phase` FOREIGN KEY (`phase_id`) REFERENCES `project_phases` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (2272025110329,'project xxx',NULL,'this for testing','2025-02-27 05:33:30','2025-02-27 05:33:30',38,1,NULL,NULL),(2272025110502,'project xxx1',NULL,'this for testing','2025-02-27 05:35:17','2025-02-27 05:35:17',38,1,NULL,NULL),(3172025105923,'new project 12',NULL,'this is new','2025-03-17 05:29:25','2025-03-17 05:29:25',42,1,NULL,NULL),(4232025162626,'Project_suriya ',NULL,'The ticketing system ','2025-04-23 10:56:31','2025-04-23 10:56:31',42,1,NULL,NULL),(4242025120921,'ITS DONE',NULL,'Media Management tool','2025-04-24 06:39:34','2025-04-24 09:23:03',45,1,'2025-07-20',NULL),(4292025182031,' the project suriya',NULL,'this about suriya ','2025-04-29 12:50:32','2025-04-29 12:50:32',45,1,NULL,NULL),(5062025143345,'ppoduct alpha',22,'hi','2025-05-06 09:03:47','2025-05-07 12:50:55',45,1,NULL,NULL),(6032025144815,'the project sarathy',NULL,'gtr','2025-06-03 09:18:17','2025-06-03 09:18:17',23,2,NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-05 13:04:18
