CREATE DATABASE order_machine_db;

USE order_machine_db;

CREATE TABLE `employee` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `e_name` varchar(255) NOT NULL,
  `e_pwd_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`e_id`)
)AUTO_INCREMENT=6;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` text NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_img` text NOT NULL,
  `product_label` text NOT NULL,
  `product_intro` text NOT NULL,
  PRIMARY KEY (`product_id`)
)AUTO_INCREMENT=34;

CREATE TABLE `receipt` (
  `receipt_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment` text NOT NULL,
  `employee` int(11) NOT NULL,
  `payment` tinyint(4) NOT NULL DEFAULT 0,
  `delivery` tinyint(4) NOT NULL DEFAULT 0,
  `takeout` tinyint(4) NOT NULL,
  PRIMARY KEY (`receipt_id`),
  INDEX `employee` (`employee`),
  CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`employee`) REFERENCES `employee` (`e_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
)AUTO_INCREMENT=13;

CREATE TABLE `per_sell` (
  `product_id` int(11) NOT NULL,
  `num` int(11) NOT NULL DEFAULT 0,
  `receipt_id` int(11) NOT NULL,
  `sell_id` int(11) NOT NULL AUTO_INCREMENT,
  INDEX `product_id` (`product_id`),
  INDEX `receipt_id` (`receipt_id`),
  PRIMARY KEY (`sell_id`),
  CONSTRAINT `per_sell_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `per_sell_ibfk_2` FOREIGN KEY (`receipt_id`) REFERENCES `receipt` (`receipt_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) AUTO_INCREMENT=15;

INSERT INTO `employee` (`e_id`, `e_name`, `e_pwd_hash`) VALUES
(3, 'root', '$2y$10$/2Qyw3fAhzV1bv.6MjV49uwBhfVOIcirugXQdtQb3Vklz3sTTCi3i'),
(5, 'henry', '$2y$10$sHDBZxheD3xEHm3zU8UzAeYO1S4ztpds93g0iouet4QXoryl6.Gvm');

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_img`, `product_label`, `product_intro`) VALUES
(5, '豆皮白湯烏龍麵+小牛/豚丼', 179, 'https://i.ibb.co/hLSx5jg/20221202-08-1.jpg', '季節限定', '豆皮白湯烏龍麵+小牛/豚丼'),
(6, '韓式年糕牛/豚丼', 99, 'https://i.ibb.co/6ZHwJ0h/20220913-500-X500-1.jpg', '今月一品', '韓式年糕牛/豚丼'),
(7, '牛丼(小)', 110, 'https://i.ibb.co/1XQNY5j/01-01-beef-takeout.png', '牛丼', '牛丼(小)'),
(8, '牛丼(中)', 151, 'https://i.ibb.co/1XQNY5j/01-01-beef-takeout.png', '牛丼', '牛丼(大)'),
(9, '牛丼(雙倍)', 221, 'https://i.ibb.co/1XQNY5j/01-01-beef-takeout.png', '牛丼', '牛丼(雙倍)'),
(10, '翠玉子牛肉丼(小)', 141, 'https://i.ibb.co/j62vqwk/01-02-poached-egg-beef-takeout.png', '牛丼', '翠玉子牛肉丼(小)'),
(11, '翠玉子牛肉丼', 186, 'https://i.ibb.co/j62vqwk/01-02-poached-egg-beef-takeout.png', '牛丼', '翠玉子牛肉丼'),
(12, '韓泡牛丼(小)', 141, 'https://i.ibb.co/5vHPqhx/01-03-kimchi-beef-takeout.png', '牛丼', '韓泡牛丼(小)'),
(13, '韓泡牛丼', 186, 'https://i.ibb.co/5vHPqhx/01-03-kimchi-beef-takeout.png', '牛丼', '韓泡牛丼'),
(14, '豚丼(小)', 110, 'https://i.ibb.co/Mh7RMwZ/03-01-pork-takeout.png', '豚丼', '豚丼(小)'),
(15, '豚丼(中)', 151, 'https://i.ibb.co/Mh7RMwZ/03-01-pork-takeout.png', '豚丼', '豚丼(中)'),
(16, '豚丼(雙倍)', 221, 'https://i.ibb.co/Mh7RMwZ/03-01-pork-takeout.png', '豚丼', '豚丼(雙倍)'),
(17, '翠玉子豚丼(小)', 141, 'https://i.ibb.co/FH11kq6/03-02-poached-egg-pork-takeout.png', '豚丼', '翠玉子豚丼(小)'),
(18, '翠玉子豚丼', 186, 'https://i.ibb.co/FH11kq6/03-02-poached-egg-pork-takeout.png', '豚丼', '翠玉子豚丼'),
(19, '韓泡豚丼(小)', 141, 'https://i.ibb.co/wWG4yCJ/03-03-kimchi-pork-takeout.png', '豚丼', '韓泡豚丼(小)'),
(20, '韓泡豚丼', 186, 'https://i.ibb.co/wWG4yCJ/03-03-kimchi-pork-takeout.png', '豚丼', '韓泡豚丼'),
(21, '雞丼', 151, 'https://i.ibb.co/m9qSJ9v/04-01-chicken-takeout.png', '雞丼', '雞丼'),
(22, '牛雞雙寶丼', 206, 'https://i.ibb.co/KrjkP0C/01-04-mapo-beef-takeout.png', '其他類', '牛雞雙寶丼'),
(23, '豚雞雙寶丼', 206, 'https://i.ibb.co/TWpngPx/03-04-mapo-pork-takeout.png', '其他類', '豚雞雙寶丼'),
(24, '蒲燒鯛魚丼', 201, 'https://i.ibb.co/XfQs0ZV/06-04-broiled-snapper-takeout.png', '其他類', '蒲燒鯛魚丼'),
(25, '檸檬風味紅茶', 35, 'https://i.ibb.co/FYvTJQ3/lemon-black-tea-ice-takeout.png', '飲料/湯', '檸檬風味紅茶'),
(26, '日式煎茶', 35, 'https://i.ibb.co/ZxSxQrc/sencha-takeout.png', '飲料/湯', '日式煎茶'),
(27, '熱紅茶', 35, 'https://i.ibb.co/kcPzrgF/lemon-black-tea-hot-takeout.png', '飲料/湯', '熱紅茶'),
(28, '味噌湯', 40, 'https://i.ibb.co/6njmTbN/01-01-1.jpg', '飲料/湯', '味噌湯'),
(29, '白飯', 19, 'https://i.ibb.co/C518735/rice-takeout.png', '副餐', '白飯'),
(30, '半熟玉子', 19, 'https://i.ibb.co/RgFX6xs/eggs-takeout.png', '副餐', '半熟玉子'),
(31, '牛皿', 110, 'https://i.ibb.co/2ZyMR86/beef-dish-takeout.png', '副餐', '牛皿'),
(32, '豚皿', 110, 'https://i.ibb.co/jyPhgSK/pork-dish-takeout.png', '副餐', '豚皿'),
(33, '雞皿', 110, 'https://i.ibb.co/HDxmDyZ/chicken-dish-takeout.png', '副餐', '雞皿');
