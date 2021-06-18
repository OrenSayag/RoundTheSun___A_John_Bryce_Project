-- CREATE DATABASE project_3_oren_sayag;
-- USE project_3_oren_sayag;

-- CREATE TABLE users (
-- 	id INT auto_increment,
--     user_name VARCHAR(255),
--     mail VARCHAR(255),
--     hashed_pass VARCHAR(255),
--     f_name VARCHAR(255),
--     l_name VARCHAR(255),
-- 		type VARCHAR(255),
--     credits INT,
--     img_src VARCHAR(255),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE locations(
-- 	id INT auto_increment,
--     name VARCHAR(255),
--     country VARCHAR(255),
--     x INT,
--     y INT,
--     img_src VARCHAR(255),
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE club_products (
-- 	id INT AUTO_INCREMENT,
--     name VARCHAR(255),
--     price INT,
--     start_date DATE,
--     end_date DATE,
--     img_src VARCHAR(255),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE vacations(
-- 	id INT AUTO_INCREMENT,
--     name VARCHAR(255),
--     price INT,
--     discount INT,
--     start_date DATE,
-- 	description TEXT,
--     end_date DATE,
--     credits INT,
--     location_id INT,
--     img_src VARCHAR(255),
--     PRIMARY KEY (id),
--     FOREIGN KEY (location_id) REFERENCES locations(id)
-- );

-- CREATE TABLE messages (
-- 	id INT AUTO_INCREMENT,
--     text TEXT,
-- type VARCHAR(255),
--     date_time DATETIME DEFAULT NOW(),
--     PRIMARY KEY (id),
--     FOREIGN KEY (from_user) REFERENCES users(id),
--     FOREIGN KEY (to_user) REFERENCES users(id)
-- );

-- CREATE TABLE vacation_follows (
-- 	id INT AUTO_INCREMENT,
--     vacation_id INT,
--     user_id INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (vacation_id) REFERENCES vacations(id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE users_fav_locations (
-- 	id INT AUTO_INCREMENT,
--     user_id INT,
--     location_id INT,
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (location_id) REFERENCES locations(id)
-- );

-- CREATE TABLE vacation_comments (
-- 	id INT AUTO_INCREMENT,
--     vacation_id INT,
--     user_id INT,
--     date DATETIME DEFAULT NOW(),
--     text VARCHAR(255),
--     PRIMARY KEY (id),
--     FOREIGN KEY (vacation_id) REFERENCES vacations(id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE vacation_likes (
-- 	id INT AUTO_INCREMENT,
--     vacation_id INT,
--     user_id INT,
--     date DATETIME DEFAULT NOW(),
--     PRIMARY KEY (id),
--     FOREIGN KEY (vacation_id) REFERENCES vacations(id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE purchases (
-- 	id INT AUTO_INCREMENT,
--     user_id INT,
--     vacation_id INT,
--     club_product_id INT,
--     date DATETIME DEFAULT NOW(),
--     amount_of_currency INT,
--     PRIMARY KEY (id),
-- 		FOREIGN KEY (vacation_id) REFERENCES vacations(id),
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (club_product_id) REFERENCES club_products(id)
-- );

-- CREATE TABLE blog_posts (
-- 	id INT auto_increment,
--     text TEXT,
--     title VARCHAR(255),
--     date DATETIME DEFAULT NOW(),
--     PRIMARY KEY (id)
-- );

-- INSERT INTO users(user_name, hashed_pass, type)
-- VALUES ('admin2', '$2b$10$CpU50cJwUxIotv9yODBiV.yGC6ahnotEdA0bTBk8pajtltXYo6Tu2', 'admin')

-- FOR YOSI: admin pass: 12345678Aa




