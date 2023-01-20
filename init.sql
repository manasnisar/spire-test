CREATE USER 'anas'@'localhost' IDENTIFIED BY 'super_secret';
GRANT ALL ON testdb TO 'anas'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE names (
    id int NOT NULL AUTO_INCREMENT,
    name_first varchar(40) DEFAULT NULL,
    name_last varchar(40) DEFAULT NULL,
    PRIMARY KEY (id)
);


INSERT INTO `names` (name_first, name_last) VALUES ('Clark','Kent');
INSERT INTO `names` (name_first, name_last) VALUES ('Bruce','Wayne');
INSERT INTO `names` (name_first, name_last) VALUES ('Hal','Jordan');
INSERT INTO `names` (name_first, name_last) VALUES ('Barry','Allen');
INSERT INTO `names` (name_first, name_last) VALUES ('Diana','Prince');
INSERT INTO `names` (name_first, name_last) VALUES ('Arthur','Curry');
INSERT INTO `names` (name_first, name_last) VALUES ('Oliver','Queen');
INSERT INTO `names` (name_first, name_last) VALUES ('Ray','Palmer');
INSERT INTO `names` (name_first, name_last) VALUES ('Carter','Hall');