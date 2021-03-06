-- MySQL Script generated by MySQL Workbench
-- Sun 25 Jun 2017 09:46:01 PM BRT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema SELL_ON_CREDIT_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema SELL_ON_CREDIT_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SELL_ON_CREDIT_DB` DEFAULT CHARACTER SET utf8 ;
USE `SELL_ON_CREDIT_DB` ;

-- -----------------------------------------------------
-- Table `SELL_ON_CREDIT_DB`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SELL_ON_CREDIT_DB`.`customers` (
  `cpf` VARCHAR(45) NOT NULL,
  `customer_name` VARCHAR(45) NOT NULL,
  `cellphone` VARCHAR(12) NULL,
  `telephone` VARCHAR(11) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`cpf`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SELL_ON_CREDIT_DB`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SELL_ON_CREDIT_DB`.`products` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `product_code` VARCHAR(45) NOT NULL,
  `product_version` VARCHAR(45) NOT NULL,
  `product_name` VARCHAR(45) NULL,
  `price` VARCHAR(7) NULL,
  PRIMARY KEY (`id_product`, `product_code`, `product_version`),
  UNIQUE INDEX `id_product_UNIQUE` (`id_product` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SELL_ON_CREDIT_DB`.`customers_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SELL_ON_CREDIT_DB`.`customers_has_products` (
  `customers_cpf` VARCHAR(45) NOT NULL,
  `products_id_product` INT NOT NULL,
  `products_product_code` VARCHAR(45) NOT NULL,
  `products_product_version` VARCHAR(45) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`customers_cpf`, `products_id_product`, `products_product_code`, `products_product_version`),
  INDEX `fk_customers_has_products_products1_idx` (`products_id_product` ASC, `products_product_code` ASC, `products_product_version` ASC),
  INDEX `fk_customers_has_products_customers_idx` (`customers_cpf` ASC),
  CONSTRAINT `fk_customers_has_products_customers`
    FOREIGN KEY (`customers_cpf`)
    REFERENCES `SELL_ON_CREDIT_DB`.`customers` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customers_has_products_products1`
    FOREIGN KEY (`products_id_product` , `products_product_code` , `products_product_version`)
    REFERENCES `SELL_ON_CREDIT_DB`.`products` (`id_product` , `product_code` , `product_version`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
