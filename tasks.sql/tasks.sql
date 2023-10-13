-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 13 oct. 2023 à 19:54
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(2000) NOT NULL,
  `isDone` enum('true','false') NOT NULL,
  `dueDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`id`, `taskName`, `isDone`, `dueDate`) VALUES
(1, 'Natation', 'true', '2023-10-15'),
(2, 'Cours JS', 'true', '2023-10-15'),
(3, 'Cuisiner', 'false', '2023-10-15'),
(4, 'Cours de piano', 'false', '2023-10-15');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT*/;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
