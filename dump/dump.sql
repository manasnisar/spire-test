USE testdb;
CREATE TABLE Addresses (
    id int NOT NULL AUTO_INCREMENT,
    address1 varchar(240) DEFAULT NULL,
    address2 varchar(240) DEFAULT NULL,
    city varchar(240) DEFAULT NULL,
    state varchar(120) DEFAULT NULL,
    zip varchar(10) DEFAULT NULL,
    PRIMARY KEY (id)
);