-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 09. Jan 2022. u 14:27
-- Verzija servera: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bendovi`
--

-- --------------------------------------------------------

--
-- Struktura tabele `bend`
--

DROP TABLE IF EXISTS `bend`;
CREATE TABLE IF NOT EXISTS `bend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) NOT NULL,
  `mesto` varchar(20) NOT NULL,
  `telefon` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cena` int(11) NOT NULL,
  `opis` text NOT NULL,
  `vrsta_muzike` json NOT NULL,
  `tip_proslave` json NOT NULL,
  `tip_grupe` enum('Bend','Orkestar','One-man','') NOT NULL,
  `slika` varchar(100) NOT NULL,
  `video` varchar(100) NOT NULL,
  `galerija` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Prikaz podataka tabele `bend`
--

INSERT INTO `bend` (`id`, `naziv`, `mesto`, `telefon`, `email`, `cena`, `opis`, `vrsta_muzike`, `tip_proslave`, `tip_grupe`, `slika`, `video`, `galerija`) VALUES
(3, 'Orkestar Aleksandra Sofronijevića', 'Beograd', 63471423, 'aleksandar.sofronijevic@gmail.com', 4000, 'Orkestar Ace Sofronijevića pratio je mnoge muzičke zvdezde domaće i javne scene.', '[\"Narodna\", \"Zabavna\", \"Pop\", \"Rok\"]', '[\"Svadba\", \"Punoletstvo\", \"Krštenje\"]', 'Orkestar', 'sofronijevic.jpg', 'y2meta.com - Aleksandar Sofronijevic Band - Billie Jean LIVE(360p).mp4', 'null'),
(13, 'Riblja Čorba', 'Beograd', 62037141, 'riblja.corba@gmail.com', 3000, 'Riblja čorba je jedna od najpopularnijih srpskih i jugoslovenskih rok grupa, osnovana u Beogradu 1978. godine.', '\"Rok\"', '[\"Kafana\", \"Klub\"]', 'Bend', 'RibljcaCorba.jfif', 'y2meta.com - Riblja Čorba  Kada padne noć Tekst HD(360p).mp4', 'null');

-- --------------------------------------------------------

--
-- Struktura tabele `rezervacije`
--

DROP TABLE IF EXISTS `rezervacije`;
CREATE TABLE IF NOT EXISTS `rezervacije` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(20) NOT NULL,
  `lokacija` varchar(40) NOT NULL,
  `telefon` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `datum_rezervacije` date NOT NULL,
  `ID_bend` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_bend` (`ID_bend`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;

--
-- Prikaz podataka tabele `rezervacije`
--

INSERT INTO `rezervacije` (`id`, `ime`, `lokacija`, `telefon`, `email`, `datum_rezervacije`, `ID_bend`) VALUES
(71, 'Aleksandar', 'Aleksandra Medvedeva 20', 6147231, 'probanodejs@hotmail.com', '2022-01-13', 3);

--
-- Ograničenja za izvezene tabele
--

--
-- Ograničenja za tabele `rezervacije`
--
ALTER TABLE `rezervacije`
  ADD CONSTRAINT `rezervacije_ibfk_1` FOREIGN KEY (`ID_bend`) REFERENCES `bend` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
