-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: selloncreditionic
-- ------------------------------------------------------
-- Server version	5.6.37-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `product_code` varchar(45) NOT NULL,
  `product_version` varchar(45) NOT NULL,
  `product_name` varchar(45) DEFAULT NULL,
  `price` varchar(7) DEFAULT NULL,
  `product_photo` blob,
  `user_cpf` varchar(45) NOT NULL,
  PRIMARY KEY (`id_product`,`product_code`,`product_version`),
  UNIQUE KEY `id_product_UNIQUE` (`id_product`),
  KEY `fk_products_users1_idx` (`user_cpf`),
  CONSTRAINT `fk_products_users1` FOREIGN KEY (`user_cpf`) REFERENCES `users` (`cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'1234','1','bola','2',NULL,'nickname'),(2,'2222','1','mochila','15',NULL,'nickname');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `vendor_cpf` varchar(45) NOT NULL,
  `customer_cpf` varchar(45) NOT NULL,
  `products_id_product` int(11) NOT NULL,
  `products_product_code` varchar(45) NOT NULL,
  `products_product_version` varchar(45) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`vendor_cpf`,`customer_cpf`,`products_id_product`,`products_product_code`,`products_product_version`,`date_time`),
  KEY `fk_vendors_has_customers_has_products_products1_idx` (`products_id_product`,`products_product_code`,`products_product_version`),
  KEY `fk_vendors_has_customers_has_products_vendors_has_customers_idx` (`vendor_cpf`,`customer_cpf`),
  CONSTRAINT `fk_vendors_has_customers_has_products_products1` FOREIGN KEY (`products_id_product`, `products_product_code`, `products_product_version`) REFERENCES `products` (`id_product`, `product_code`, `product_version`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_vendors_has_customers_has_products_vendors_has_customers1` FOREIGN KEY (`vendor_cpf`, `customer_cpf`) REFERENCES `vendors_has_customers` (`vendor_cpf`, `customer_cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES ('nickname','123',1,'1234','1',1,'2018-02-24 14:05:00');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `cpf` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `cellphone` varchar(12) DEFAULT NULL,
  `telephone` varchar(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `photo` blob,
  PRIMARY KEY (`cpf`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('123','asc','csa','4123','4123',NULL,NULL),('3452534','JJ','John','3123','312','',NULL),('nickname','my nickname','sfd',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors_has_customers`
--

DROP TABLE IF EXISTS `vendors_has_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors_has_customers` (
  `vendor_cpf` varchar(45) NOT NULL,
  `customer_cpf` varchar(45) NOT NULL,
  PRIMARY KEY (`vendor_cpf`,`customer_cpf`),
  KEY `fk_users_has_users_users2_idx` (`customer_cpf`),
  KEY `fk_users_has_users_users1_idx` (`vendor_cpf`),
  CONSTRAINT `fk_users_has_users_users1` FOREIGN KEY (`vendor_cpf`) REFERENCES `users` (`cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users2` FOREIGN KEY (`customer_cpf`) REFERENCES `users` (`cpf`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors_has_customers`
--

LOCK TABLES `vendors_has_customers` WRITE;
/*!40000 ALTER TABLE `vendors_has_customers` DISABLE KEYS */;
INSERT INTO `vendors_has_customers` VALUES ('3452534','123'),('nickname','123'),('nickname','3452534'),('3452534','nickname');
/*!40000 ALTER TABLE `vendors_has_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'selloncreditionic'
--

--
-- Dumping routines for database 'selloncreditionic'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-24 13:33:01
