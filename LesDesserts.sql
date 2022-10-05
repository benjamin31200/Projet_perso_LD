-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: LesDesserts
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

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
-- Table structure for table `desserts`
--

DROP TABLE IF EXISTS `desserts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desserts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `story` mediumtext NOT NULL,
  `difficulty` enum('easy','medium','difficult') NOT NULL,
  `preparation` int NOT NULL,
  `cooking` int NOT NULL,
  `persons` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desserts`
--

LOCK TABLES `desserts` WRITE;
/*!40000 ALTER TABLE `desserts` DISABLE KEYS */;
/*!40000 ALTER TABLE `desserts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userReaction`
--

DROP TABLE IF EXISTS `userReaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userReaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `desserts_id` int NOT NULL,
  `commentary` text NOT NULL,
  `reaction` enum('love','vomit','appetizing','funny','perplexed') NOT NULL,
  `like` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID_idx` (`users_id`),
  KEY `on_recipe_id_idx` (`desserts_id`),
  CONSTRAINT `on_recipe_id` FOREIGN KEY (`desserts_id`) REFERENCES `desserts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_has_reaction` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userReaction`
--

LOCK TABLES `userReaction` WRITE;
/*!40000 ALTER TABLE `userReaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `userReaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `pseudonyme` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `grade` enum('Admin','user') DEFAULT 'user',
  `repeat_password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `Client_id_google` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (154,'benjamin','deneux','benjamin deneux','benjamindeneux@hotmail.com','$argon2id$v=19$m=65536,t=5,p=1$wiRvNUATEzfe+nkTuhZ5HQ$8h+ok1OhuxAXHU8RJsP2o8tSyxH/X8UB6RamG3p9jdE','user','$argon2id$v=19$m=65536,t=5,p=1$ygEw5Im4SR0fJxBll+ViEA$LWYUGFXhLVL5yxLTmqmrSNZol7vFr8dFXaP49fzgJpk','https://lh3.googleusercontent.com/a/AItbvmkfvzd6eTJpDYo1hO9byvFVLhG1bqaZvh6rsV-e=s96-c','$argon2id$v=19$m=65536,t=5,p=1$xTWw8HkOE7YVCqUSyzbBew$QKfMlqEPC3rd1OY8wJ2M02zNlYM+BkArAZXhl8GKvtw'),(156,'Xx','BenBang','tortle','benden@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$i0JpiCAn2OPla7Y06b1/Vw$R6pjhxOgJPP7k9oVPLoNX/pvpZ7IwOrtwG9SCjxAjpw','user','$argon2id$v=19$m=65536,t=5,p=1$mIGmON44sOZLMD/3lry55g$rp5DFfRl2Nn12E+gVYXYkfK3tQQ6OrklHOfXfLP/WLk',NULL,NULL),(157,'Tarti','Tarti','Tarti','benjiden@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$pQzKjvfeoU1ww02PSsQqEw$HzCe9akwYZCkVq/Wfum81nDAm23LdTeiBH/sLYVh2Q4','user','$argon2id$v=19$m=65536,t=5,p=1$fwwZsPVD+jJoJQ2kz7wh+A$HRihP7oFU9Ijs2vVUc1FE9DcwPOK0OMgp1kjReCJ30M','https://lh3.googleusercontent.com/a-/AFdZucq2Kzr9ad5FCBlR7t2OXovo43Vx_wT2SiToKk_B=s96-c','$argon2id$v=19$m=65536,t=5,p=1$v0VmnaCjMrWAjThCJQ3GNw$P4FKgVLOU/jbC6YwIj3eGDI/jAV4ijHpBRyYW6z8lfQ');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variantRecipe`
--

DROP TABLE IF EXISTS `variantRecipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variantRecipe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desserts_id` int NOT NULL,
  `users_id` int NOT NULL,
  `variantRecipeDescription` text NOT NULL,
  `variantRecipeCommentary` text NOT NULL,
  `variantRecipeLike` tinyint NOT NULL,
  `variantRecipeReaction` enum('funny','vomit','perplexed','appetizing','love') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID_idx` (`users_id`),
  KEY `dessertID_idx` (`desserts_id`),
  CONSTRAINT `dessertID` FOREIGN KEY (`desserts_id`) REFERENCES `desserts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `userID` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variantRecipe`
--

LOCK TABLES `variantRecipe` WRITE;
/*!40000 ALTER TABLE `variantRecipe` DISABLE KEYS */;
/*!40000 ALTER TABLE `variantRecipe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-05 11:15:54
