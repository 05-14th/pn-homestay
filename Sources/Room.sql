CREATE DATABASE roomdb;
use roomdb;
CREATE TABLE rooms(
    `room_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `room_description` TEXT NOT NULL,
    `price` INT(11) NOT NULL,
    `status` VARCHAR(255) DEFAULT 'Available',
    `booking_date` DATE NOT NULL,
    `booking_time` TIME NOT NULL,
    `checkout_date` DATE NOT NULL,
    `checkout_time` TIME NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

CREATE TABLE users(
    `user_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fullname` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `contact_number` INT(20) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

CREATE TABLE feedbacks(
    `feedback_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` TEXT NOT NULL,
    `email` VARCHAR(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;