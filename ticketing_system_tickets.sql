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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `ticket_id` bigint NOT NULL,
  `Tittle` varchar(200) NOT NULL,
  `description` text,
  `priority` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `project_id` bigint NOT NULL,
  `reported_id` int DEFAULT NULL,
  `assigin_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Due_date` date DEFAULT NULL,
  `Tagging` varchar(150) DEFAULT NULL,
  `Ip_address` varchar(200) DEFAULT NULL,
  `type` enum('bug','error','feature','query') DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `tickets_ibfk_1` (`project_id`),
  KEY `tickets_ibfk_2` (`reported_id`),
  KEY `tickets_ibfk_3` (`assigin_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (2272000001,'Bug in User Login Page 1 and 2','this testing process ','very low','resolved',2272025110502,23,32,'2025-02-27 05:38:36','2025-03-28 13:29:58','2025-02-28','','49.37.210.85','bug'),(2272000002,'Bug in User Login Page 1 and 2 and 3','this for testing purpose','Medium','In progress',2272025110502,41,37,'2025-02-27 05:41:53','2025-03-28 14:05:51','2025-02-28','','49.37.210.85','bug'),(2272000003,'Bug in User Login Page 1 and 2 and 3 and 4','this for tstting','High','Open',2272025110502,41,32,'2025-02-27 05:42:53','2025-03-28 14:19:44','2025-02-28','','49.37.210.85','bug'),(2272000004,'Change Date format to mm/dd/yyyy','Change globally the date format from dd/mm/yyyy to mm/dd/yyyy','High','In progress',2272025110502,23,37,'2025-02-27 06:47:08','2025-04-23 12:55:01','2025-02-27','date format, mm/dd/yyyy','49.37.210.85','bug'),(2272000005,'Acasdfasdfsdv','sdsvasdvas','High','In progress',2272025110502,23,42,'2025-03-04 07:15:18','2025-03-28 13:10:33','2025-03-27','','152.59.218.241','bug'),(2272000006,'new ticket ','dssffd','high','Resolved',2272025110502,23,17,'2025-03-24 08:15:31','2025-03-24 08:15:31','2025-03-04','','49.37.210.85','bug'),(2272000007,'new ddd','ddd','Medium','In Progress',2272025110502,23,32,'2025-03-31 13:14:19','2025-03-31 13:22:18','2025-03-05','','152.59.218.60','bug'),(2272000008,'SsfdSFSFA','VXVSDVD','very low','Resolved',2272025110502,23,9,'2025-04-15 08:38:15','2025-04-15 08:38:15','2025-05-01','DDDDD','183.82.178.143','bug'),(2272000009,'affv','cvdsfbsfb','very low','In open',2272025110502,23,32,'2025-04-15 09:53:52','2025-04-23 06:27:43','2025-05-02','fddfvsrfvwr','49.37.212.227','bug'),(2272000010,'afefrfrf','adfvdafvadfv','Low','In open',2272025110502,23,21,'2025-04-15 09:57:36','2025-04-15 09:57:36','2025-04-17','sdsdsd','49.37.212.227','bug'),(2272000011,'fdffsdfgt','eqrgregqre','Low','Resolved',2272025110502,23,9,'2025-04-15 10:08:59','2025-04-15 10:08:59','2025-05-01','ggg','49.37.212.227','bug'),(2272000012,'htdud','uyfflifduyf','Medium','resolved',2272025110502,23,36,'2025-04-15 10:17:14','2025-04-23 06:36:21','2025-04-23','jhvucc','49.37.212.227','bug'),(2272000013,'adfvadfgfgfe','adffadfgadfvgad','very low','In Progress',2272025110502,23,21,'2025-04-15 10:25:48','2025-04-15 10:25:48','2025-05-02','fdvdfvd','49.37.212.227','bug'),(2272000014,'fgfzdfsh','dsggg','Low','In open',2272025110502,23,38,'2025-04-15 10:27:23','2025-04-23 06:36:06','2025-05-01','ddd','49.37.212.227','bug'),(2272000015,'scfwvwfvf','edcfedcvrd','very low','resolved',2272025110502,23,37,'2025-04-15 10:36:41','2025-04-23 07:41:01','2025-04-30','','49.37.212.227','bug'),(2272000016,'gdhtdhd','fgrsgrs','high','resolved',2272025110502,23,36,'2025-04-15 10:42:36','2025-04-23 07:13:17','2025-04-24','','49.37.212.227','bug'),(2272000017,'net ticket ','this about this ','high','In open',2272025110502,23,38,'2025-04-15 13:54:07','2025-04-23 07:10:12','2025-04-07','','183.82.178.143','bug'),(2272000018,'gcudut','hglivi','high','In open',2272025110502,23,40,'2025-04-16 08:43:15','2025-04-23 06:43:16','2025-05-02','','49.37.208.143','bug'),(2272000019,'dadfsdfsdf','cvvvcvc','high','In open',2272025110502,23,36,'2025-04-17 13:27:23','2025-04-23 06:50:41','2025-04-13','','152.58.224.255','bug'),(2272000020,'new ticket 43343','happy ','high','In open',2272025110502,23,32,'2025-04-17 13:29:43','2025-04-23 06:49:26','2025-04-17','','152.58.224.255','bug'),(2272000021,'new tickert5333 ',' ereerrer','high','In open',2272025110502,23,8,'2025-04-23 07:12:31','2025-04-23 07:12:31','2025-04-10','','183.82.31.64','bug'),(2272000022,'jbilvjvhk','hvjkvfyuv','Low','Closed',2272025110502,23,8,'2025-04-23 07:43:21','2025-04-23 07:43:21','2025-04-24','','183.82.31.64','bug'),(2272000024,'Urgent Issue - ProjectID#3172025105923','Hello Team,\r\n\r\nWe\'re experiencing a critical issue with feature XYZ. Please look into this\r\nASAP.\r\n\r\nThanks,\r\nJohn Doe\r\n','low','In progress',3172025105923,NULL,43,'2025-03-19 13:42:50','2025-04-22 10:36:55',NULL,NULL,NULL,'bug'),(2272000025,'Urgent Issue1- ProjectID#3172025105923','hi how are u\r\n','low','open',3172025105923,23,NULL,'2025-03-19 13:46:56','2025-04-23 07:58:06',NULL,NULL,NULL,'bug'),(4242000001,'Adding  the new pop up windows','Adding  the new pop up windows222222','Medium','In open',4242025120921,44,43,'2025-04-24 03:58:34','2025-04-24 03:58:34','2025-05-02','','183.82.206.0','bug'),(4242000002,'Adding  the new pop up windows 1','Adding  the new pop up windows 1','high','Closed',4242025120921,44,44,'2025-04-24 09:29:57','2025-06-03 10:15:08','2025-05-03','','183.82.206.0','bug'),(4242000003,'Adding  the new pop up windows 3','Adding  the new pop up windows 3','high','In open',4242025120921,44,45,'2025-04-24 09:30:25','2025-04-24 09:30:25','2025-04-16','','183.82.206.0','bug'),(4242000004,'hissssSDAsd','','','In Progress',4242025120921,44,44,'2025-04-28 04:55:48','2025-05-07 09:21:32',NULL,'','49.37.210.240','bug'),(4242000005,'fgfgg','','','In Hold',4242025120921,44,44,'2025-04-28 06:12:00','2025-05-07 09:22:54',NULL,'','157.51.140.171','bug'),(4242000006,'\'AVAIDVNPSDOJwefow','','','In Hold',4242025120921,44,44,'2025-04-28 11:01:58','2025-05-07 09:20:02',NULL,'','157.51.140.171','bug'),(4242000007,'ddddd','','','Resolved',4242025120921,44,44,'2025-04-28 13:29:55','2025-05-06 12:02:45',NULL,'','49.206.96.27','bug'),(4242000008,'hi','','','Resolved',4242025120921,44,44,'2025-04-29 05:56:39','2025-05-06 12:02:27',NULL,'','157.51.114.14','bug'),(4242000009,'newww','','','In Hold',4242025120921,44,44,'2025-04-29 05:58:58','2025-05-06 12:02:33',NULL,'','157.51.114.14','bug'),(4242000010,'ssssssfeewrgwt4 gq','','','New',4242025120921,44,44,'2025-04-29 11:37:35','2025-05-07 09:35:21',NULL,'','157.51.114.14','bug'),(4242000011,'ssssssfeewrgwt4 gq','','','New',4242025120921,44,45,'2025-04-29 11:37:49','2025-05-07 09:32:59',NULL,'','157.51.114.14','bug'),(4242000012,'new new tickert ','hi ','High','New',4242025120921,44,17,'2025-05-06 06:45:27','2025-05-06 06:45:27','2025-05-06','','49.47.216.35','bug'),(4242000013,'gggggggggggggggggggggggg','','','In Hold',4242025120921,44,44,'2025-05-06 12:03:36','2025-05-07 09:27:01',NULL,'','157.51.97.177','bug'),(4292000001,'frist ticket ','new ','','New',4292025182031,44,29,'2025-04-29 12:51:41','2025-05-06 06:38:43',NULL,'','157.51.128.253','bug'),(4292000002,'hi','','','New',4292025182031,44,29,'2025-04-30 11:37:45','2025-05-07 09:37:38',NULL,'','152.59.219.237','bug'),(4292000003,'hi 1','','','New',4292025182031,44,44,'2025-04-30 11:38:08','2025-06-03 07:43:42',NULL,'','152.59.219.237','bug'),(4292000004,'SDDFREEFEFVEF','','High','Open',4292025182031,44,44,'2025-06-02 13:03:50','2025-06-03 06:51:48',NULL,'','49.47.216.21','bug'),(4292000005,'DAFVAVAVAVREFERR','','High','New',4292025182031,44,28,'2025-06-02 13:06:45','2025-06-02 13:06:45',NULL,'','49.47.216.21','bug'),(4292000006,'aggergqergg','','High','New',4292025182031,44,28,'2025-06-02 13:21:28','2025-06-02 13:21:28',NULL,'','49.47.216.21','bug'),(4292000007,'hieieieieie','','High','New',4292025182031,44,44,'2025-06-03 09:09:50','2025-06-03 09:09:50',NULL,'','183.82.31.43','bug'),(5062000001,'alpha one','','','Resolved',5062025143345,44,29,'2025-05-06 09:07:30','2025-05-07 09:58:25',NULL,'','157.51.97.177','bug'),(5062000002,'sragaafdsSD','','','New',5062025143345,44,45,'2025-05-07 04:10:31','2025-05-07 04:10:48','2025-05-06','TAG','157.51.143.0','bug'),(5062000003,'THE NEW TICKET','HI ','High','Open',5062025143345,44,44,'2025-05-07 04:49:08','2025-06-03 07:11:04','2025-05-21','tag','157.51.143.0','bug'),(5062000004,'dddddddd','','','New',5062025143345,44,NULL,'2025-06-03 08:31:40','2025-06-03 08:31:40',NULL,'','183.82.31.43','bug'),(6032000001,'fr','','Medium','New',6032025144815,44,26,'2025-06-03 09:18:52','2025-06-03 09:18:52',NULL,'','183.82.31.43','bug'),(6032000002,'new','','Low','New',6032025144815,44,42,'2025-06-03 09:21:17','2025-06-03 09:21:17',NULL,'','183.82.31.43','bug');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_ticket_insert` AFTER INSERT ON `tickets` FOR EACH ROW BEGIN
  
  -- Insert into activity_logs
  INSERT INTO activity_logs (action_type, table_name, record_id, user_id, message)
  VALUES ('INSERT', 'TICKET', NEW.ticket_id,NEW.reported_id , CONCAT('New ticket created by user ',NEW.reported_id));

  -- Insert into change_history for each field
  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES 
    ('TICKET', NEW.ticket_id, 'ticket_id', NULL, NEW.ticket_id,NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'title', NULL, NEW.Tittle, NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'priority', NULL, NEW.priority, NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'status', NULL, NEW.status, NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'assignee_id', NULL, NEW.assigin_id, NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'due_date', NULL, NEW.due_date, NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'type', NULL, NEW.type, NEW.reported_id),
    ('TICKET', NEW.ticket_id, 'Tagging', NULL, NEW.Tagging, NEW.reported_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_ticket` AFTER DELETE ON `tickets` FOR EACH ROW BEGIN
  DECLARE uid INT;
  SET uid = @user_id;

  -- Insert into activity_logs (log the deletion)
  INSERT INTO activity_logs (action_type, table_name, record_id, user_id, message)
  VALUES ('DELETE', 'TICKET', OLD.ticket_id, uid, CONCAT('Ticket deleted by user ', uid));

  -- Insert into change_history for each field (log the old values before deletion)
  
  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'ticket_id', OLD.ticket_id, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'title', OLD.Tittle, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'priority', OLD.priority, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'status', OLD.status, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'assigin_id', OLD.assigin_id, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'Due_date', OLD.Due_date, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'Tagging', OLD.Tagging, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'type', OLD.type, NULL, uid);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_ticket_` AFTER DELETE ON `tickets` FOR EACH ROW BEGIN
  DECLARE uid INT;
  SET uid = 23;

  -- Insert into activity_logs (log the deletion)
  INSERT INTO activity_logs (action_type, table_name, record_id, user_id, message)
  VALUES ('DELETE', 'TICKET', OLD.ticket_id, uid, CONCAT('Ticket deleted by user ', uid));

  -- Insert into change_history for each field (log the old values before deletion)
  
  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'ticket_id', OLD.ticket_id, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'title', OLD.Tittle, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'priority', OLD.priority, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'status', OLD.status, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'assigin_id', OLD.assigin_id, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'Due_date', OLD.Due_date, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'Tagging', OLD.Tagging, NULL, uid);

  INSERT INTO change_history (table_name, record_id, column_name, old_value, new_value, changed_by)
  VALUES ('TICKET', OLD.ticket_id, 'type', OLD.type, NULL, uid);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-05 13:04:14
