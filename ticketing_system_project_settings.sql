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
-- Table structure for table `project_settings`
--

DROP TABLE IF EXISTS `project_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `allow_ticket_reassign` tinyint(1) DEFAULT '0',
  `custom_priorities` json DEFAULT NULL,
  `custom_statuses` json DEFAULT NULL,
  `enable_custom_priorities` tinyint(1) DEFAULT '0',
  `enable_custom_statuses` tinyint(1) DEFAULT '0',
  `default_status` json DEFAULT NULL,
  `default_priority` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project_settings_project` (`project_id`),
  CONSTRAINT `fk_project_settings_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_settings`
--

LOCK TABLES `project_settings` WRITE;
/*!40000 ALTER TABLE `project_settings` DISABLE KEYS */;
INSERT INTO `project_settings` VALUES (18,2272025110329,1,'[\"very low\"]','[]',1,0,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(19,2272025110502,1,'[\"very low\"]','[\"in hold\"]',1,1,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(21,3172025105923,1,'[]','[]',0,0,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(22,4232025162626,1,'[]','[]',0,0,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(24,4242025120921,0,'[]','[\"In Hold\"]',0,1,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(27,4292025182031,1,'[]','[\"in hold\"]',0,0,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(28,5062025143345,1,'[\"Urgent\"]','[\"Hold\"]',1,1,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]'),(29,6032025144815,1,'[]','[]',0,0,'[\"Open\", \"In Progress\", \"Resolved\", \"Closed\"]','[\"High\", \"Medium\", \"Low\"]');
/*!40000 ALTER TABLE `project_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-05 13:04:16
