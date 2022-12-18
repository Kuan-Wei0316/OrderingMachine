-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-18 18:51:47
-- 伺服器版本： 10.4.25-MariaDB
-- PHP 版本： 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `ordering_machine`
--

-- --------------------------------------------------------

--
-- 資料表結構 `employee`
--

CREATE TABLE `employee` (
  `e_id` int(11) NOT NULL,
  `e_name` varchar(255) NOT NULL,
  `e_pwd_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `employee`
--

INSERT INTO `employee` (`e_id`, `e_name`, `e_pwd_hash`) VALUES
(3, 'root', '$2y$10$/2Qyw3fAhzV1bv.6MjV49uwBhfVOIcirugXQdtQb3Vklz3sTTCi3i'),
(5, 'henry', '$2y$10$sHDBZxheD3xEHm3zU8UzAeYO1S4ztpds93g0iouet4QXoryl6.Gvm');

-- --------------------------------------------------------

--
-- 資料表結構 `per_sell`
--

CREATE TABLE `per_sell` (
  `product_id` int(11) NOT NULL,
  `num` int(11) NOT NULL DEFAULT 0,
  `receipt_id` int(11) NOT NULL,
  `sell_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `per_sell`
--

INSERT INTO `per_sell` (`product_id`, `num`, `receipt_id`, `sell_id`) VALUES
(1, 5, 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_img` text NOT NULL,
  `product_label` text NOT NULL,
  `product_intro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_img`, `product_label`, `product_intro`) VALUES
(1, 'aaa', 10, 'https://i.ibb.co/PYNDkLr/80938de9f36e586f7a1aec48b2f9aa78.gif', 'Set', 'bbbbb'),
(3, '可樂', 8964, 'https://i.ibb.co/VSMhpmx/photo.png', 'Drink', '兔田配可樂'),
(4, 'qqq', 123, 'https://i.ibb.co/6WJgQBW/1.jpg', 'Drink', 'wwww');

-- --------------------------------------------------------

--
-- 資料表結構 `receipt`
--

CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment` text NOT NULL,
  `employee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `receipt`
--

INSERT INTO `receipt` (`receipt_id`, `create_time`, `comment`, `employee`) VALUES
(1, '2022-12-17 07:26:14', '半糖少冰', 0),
(2, '2022-12-17 07:39:03', '', 0),
(3, '2022-12-17 07:39:10', '', 0),
(4, '2022-12-17 07:39:56', '', 0),
(5, '2022-12-18 15:11:59', '', 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`e_id`);

--
-- 資料表索引 `per_sell`
--
ALTER TABLE `per_sell`
  ADD PRIMARY KEY (`sell_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `receipt_id` (`receipt_id`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- 資料表索引 `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`receipt_id`),
  ADD KEY `employee` (`employee`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `employee`
--
ALTER TABLE `employee`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `per_sell`
--
ALTER TABLE `per_sell`
  MODIFY `sell_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `receipt`
--
ALTER TABLE `receipt`
  MODIFY `receipt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `per_sell`
--
ALTER TABLE `per_sell`
  ADD CONSTRAINT `per_sell_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `per_sell_ibfk_2` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`receipt_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
