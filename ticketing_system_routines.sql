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
-- Dumping events for database 'ticketing_system'
--

--
-- Dumping routines for database 'ticketing_system'
--
/*!50003 DROP PROCEDURE IF EXISTS `getProjectAndTicketSummary` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProjectAndTicketSummary`()
begin 
 SELECT 
    p.created_at,
    u.name AS project_manager_name,  -- Added project manager's name
    p.project_manager_id,
    p.name AS project_name,
    p.project_id AS project_id,
    project_summary.total_tickets,
    project_summary.open_tickets_high,
    project_summary.open_tickets_medium,
    project_summary.open_tickets_low,
    project_summary.in_progress_tickets_high,
    project_summary.in_progress_tickets_medium,
    project_summary.in_progress_tickets_low,
    project_summary.resolved_tickets_high,
    project_summary.resolved_tickets_medium,
    project_summary.resolved_tickets_low,
    project_summary.closed_tickets_high,
    project_summary.closed_tickets_medium,
    project_summary.closed_tickets_low
FROM 
    projects p
LEFT JOIN 
    user u ON p.project_manager_id = u.user_id  -- Join with user table to get project manager's name
LEFT JOIN 
    (
        SELECT 
            p.project_id,
            COUNT(t.ticket_id) AS total_tickets,
            -- Open Tickets
            SUM(CASE WHEN t.status = 'In open' AND t.priority = 'high' THEN 1 ELSE 0 END) AS open_tickets_high,
            SUM(CASE WHEN t.status = 'In open' AND t.priority = 'medium' THEN 1 ELSE 0 END) AS open_tickets_medium,
            SUM(CASE WHEN t.status = 'In open' AND t.priority = 'low' THEN 1 ELSE 0 END) AS open_tickets_low,
            -- In Progress Tickets
            SUM(CASE WHEN t.status = 'In progress' AND t.priority = 'high' THEN 1 ELSE 0 END) AS in_progress_tickets_high,
            SUM(CASE WHEN t.status = 'In progress' AND t.priority = 'medium' THEN 1 ELSE 0 END) AS in_progress_tickets_medium,
            SUM(CASE WHEN t.status = 'In progress' AND t.priority = 'low' THEN 1 ELSE 0 END) AS in_progress_tickets_low,
            -- Resolved Tickets
            SUM(CASE WHEN t.status = 'Resolved' AND t.priority = 'high' THEN 1 ELSE 0 END) AS resolved_tickets_high,
            SUM(CASE WHEN t.status = 'Resolved' AND t.priority = 'medium' THEN 1 ELSE 0 END) AS resolved_tickets_medium,
            SUM(CASE WHEN t.status = 'Resolved' AND t.priority = 'low' THEN 1 ELSE 0 END) AS resolved_tickets_low,
            -- Closed Tickets
            SUM(CASE WHEN t.status = 'Closed' AND t.priority = 'high' THEN 1 ELSE 0 END) AS closed_tickets_high,
            SUM(CASE WHEN t.status = 'Closed' AND t.priority = 'medium' THEN 1 ELSE 0 END) AS closed_tickets_medium,
            SUM(CASE WHEN t.status = 'Closed' AND t.priority = 'low' THEN 1 ELSE 0 END) AS closed_tickets_low
        FROM 
            projects p
        LEFT JOIN 
            tickets t
        ON 
            p.project_id = t.project_id
        GROUP BY 
            p.project_id
    ) AS project_summary
ON 
    p.project_id = project_summary.project_id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUser`(IN userId INT)
BEGIN 
    SELECT * FROM user ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_LIST_PROJECT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_LIST_PROJECT`(IN USERID INT)
BEGIN
SELECT 
    p.project_id, 
    p.name, 
    p.description, 
    pp.phase_name, 
    p.due_date,
    p.created_at,
    s.name AS manager_name,
    COUNT(t.ticket_id) AS total_tickets  -- Count tickets for each project
FROM project_user u  
JOIN projects p ON p.project_id = u.project_id  
JOIN user s ON p.project_manager_id = s.user_id  -- Fetch manager name
LEFT JOIN tickets t ON p.project_id = t.project_id 
left JOIN project_phases pp ON p.phase_id = pp.id
WHERE u.user_id = USERID  -- Use parameterized queries for security
GROUP BY p.project_id, p.name, p.description, p.phase_id, p.due_date, s.name;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_PROJECT_DETAILS_WITH_TICKETS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PROJECT_DETAILS_WITH_TICKETS`(IN projectID BIGINT, IN userID INT)
BEGIN
	  -- Fetch project details
		SELECT 
			p.project_id, 
			p.name, 
			p.description, 
			u.name AS manager_name
		FROM projects p
		JOIN user u ON p.project_manager_id = u.user_id
		WHERE p.project_id = projectID;

		-- Fetch assigned tickets to the user
		SELECT 
			t.ticket_id, 
			t.tittle AS title,  
			t.status, 
			t.priority,
			t.due_date  
		FROM tickets t
		WHERE t.project_id = projectID 
		  AND t.assigin_id = userID;

		
		-- Fetch tickets assigned to others
		SELECT 
			t.ticket_id, 
			t.tittle AS title, 
			t.status, 
			t.priority, 
            t.due_date ,
			u.name AS assigned_to_name -- Show who is assigned to the ticket
		FROM tickets t
		JOIN user u ON t.assigin_id = u.user_id
		WHERE t.project_id = projectID 
		  AND t.assigin_id != userID 
		  AND t.assigin_id IS NOT NULL;
		-- Fetch unassigned tickets
		
		SELECT 
			t.ticket_id, 
			t.tittle AS title, 
			t.status, 
			t.priority, 
            t.due_date ,
			u.name AS assigned_to_name -- Show who is assigned to the ticket
		FROM tickets t
		JOIN user u ON t.assigin_id = u.user_id
		WHERE t.project_id = projectID 
		  AND t.assigin_id IS  NULL;

		-- Fetch assignable users (who can take the unassigned tickets)
		SELECT u.user_id, u.name 
FROM user u
JOIN project_user pu ON pu.user_id = u.user_id
WHERE pu.project_id = projectID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test_proc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test_proc`()
BEGIN
    DECLARE uid INT;
    SET uid = @user_id;
    SELECT uid;
END ;;
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

-- Dump completed on 2025-06-05 13:04:18
