-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema selloncreditionic
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema selloncreditionic
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `selloncreditionic` DEFAULT CHARACTER SET latin5 ;
USE `selloncreditionic` ;

-- -----------------------------------------------------
-- Table `selloncreditionic`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `selloncreditionic`.`users` (
  `cpf` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `cellphone` VARCHAR(12) NULL DEFAULT NULL,
  `telephone` VARCHAR(11) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `photo` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `selloncreditionic`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `selloncreditionic`.`products` (
  `id_product` INT(11) NOT NULL AUTO_INCREMENT,
  `product_code` VARCHAR(45) NOT NULL,
  `product_version` VARCHAR(45) NOT NULL,
  `product_name` VARCHAR(45) NULL DEFAULT NULL,
  `price` VARCHAR(7) NULL DEFAULT NULL,
  `product_photo` BLOB NULL DEFAULT NULL,
  `user_cpf` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_product`, `product_code`, `product_version`),
  UNIQUE INDEX `id_product_UNIQUE` (`id_product` ASC),
  INDEX `fk_products_users1_idx` (`user_cpf` ASC),
  CONSTRAINT `fk_products_users1`
    FOREIGN KEY (`user_cpf`)
    REFERENCES `selloncreditionic`.`users` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `selloncreditionic`.`vendors_has_customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `selloncreditionic`.`vendors_has_customers` (
  `vendor_cpf` VARCHAR(45) NOT NULL,
  `customer_cpf` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`vendor_cpf`, `customer_cpf`),
  INDEX `fk_users_has_users_users2_idx` (`customer_cpf` ASC),
  INDEX `fk_users_has_users_users1_idx` (`vendor_cpf` ASC),
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`vendor_cpf`)
    REFERENCES `selloncreditionic`.`users` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`customer_cpf`)
    REFERENCES `selloncreditionic`.`users` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `selloncreditionic`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `selloncreditionic`.`sales` (
  `vendor_cpf` VARCHAR(45) NOT NULL,
  `customer_cpf` VARCHAR(45) NOT NULL,
  `products_id_product` INT(11) NOT NULL,
  `products_product_code` VARCHAR(45) NOT NULL,
  `products_product_version` VARCHAR(45) NOT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `date_time` DATETIME NOT NULL,
  PRIMARY KEY (`vendor_cpf`, `customer_cpf`, `products_id_product`, `products_product_code`, `products_product_version`, `date_time`),
  INDEX `fk_vendors_has_customers_has_products_products1_idx` (`products_id_product` ASC, `products_product_code` ASC, `products_product_version` ASC),
  INDEX `fk_vendors_has_customers_has_products_vendors_has_customers_idx` (`vendor_cpf` ASC, `customer_cpf` ASC),
  CONSTRAINT `fk_vendors_has_customers_has_products_products1`
    FOREIGN KEY (`products_id_product` , `products_product_code` , `products_product_version`)
    REFERENCES `selloncreditionic`.`products` (`id_product` , `product_code` , `product_version`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vendors_has_customers_has_products_vendors_has_customers1`
    FOREIGN KEY (`vendor_cpf` , `customer_cpf`)
    REFERENCES `selloncreditionic`.`vendors_has_customers` (`vendor_cpf` , `customer_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
