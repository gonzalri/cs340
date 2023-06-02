SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;



DROP TABLE IF EXISTS `Customers`;
-- Customers Table Creation
CREATE OR REPLACE TABLE Customers
(
    customerID int NOT NULL UNIQUE AUTO_INCREMENT,
    customerFirstName varchar(50) NOT NULL,
    customerLastName varchar(50) NOT NULL,
    customerEmail varchar(50) NOT NULL,
    customerStreetAddress varchar(100) NOT NULL,
    customerCity varchar(50) NOT NULL,
    customerZipcode varchar(5) NOT NULL,
    customerState varchar(2) NOT NULL,
    customerPhone varchar(15) NOT NULL,
    PRIMARY KEY (customerID)

);


DROP TABLE IF EXISTS `Vinyls`;
-- Vinyls Table Creation
CREATE OR REPLACE TABLE Vinyls
(
    vinylID int NOT NULL UNIQUE AUTO_INCREMENT,
    vinylTitle varchar(30) NOT NULL,
    vinylArtist varchar(50) NOT NULL,
    vinylGenre varchar(30) NOT NULL,
    vinylReleaseYear int NOT NULL,
    vinylFormat varchar(10) NOT NULL,
    vinylRecordLabel varchar(50) NOT NULL,
    vinylCondition varchar(10) NOT NULL,
    vinylPrice decimal(5,2) NOT NULL,
    PRIMARY KEY (vinylID)

);

DROP TABLE IF EXISTS `Orders`;
-- Orders Table Creation
CREATE OR REPLACE TABLE Orders
(
    orderID int NOT NULL UNIQUE AUTO_INCREMENT,
    customerID int NOT NULL,
    orderStatus varchar(10) NOT NULL,
    orderDate date NOT NULL,
    orderTotal decimal(10,2) NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE

);

DROP TABLE IF EXISTS `Inventory`;
-- Inventory Table Creation
CREATE OR REPLACE TABLE Inventory
(
    inventoryID int NOT NULL UNIQUE AUTO_INCREMENT,
    vinylID int NOT NULL,
    inventoryQty int NOT NULL,
    PRIMARY KEY (inventoryID),
    FOREIGN KEY (vinylID) REFERENCES Vinyls(vinylID) ON DELETE CASCADE
   
);

DROP TABLE IF EXISTS `OrderItems`;
-- OrderItems Table Creation
CREATE OR REPLACE TABLE OrderItems
(
    orderID int NOT NULL,
    inventoryID int NOT NULL,
    vinylQty int NOT NULL,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY (inventoryID) REFERENCES Inventory(inventoryID) ON DELETE CASCADE

);

-- Customers Values Insertion
INSERT INTO Customers (customerFirstName, customerLastName, customerEmail, customerStreetAddress, customerCity, customerZipcode, customerState, customerPhone)
VALUES ("Scott", "Fisher", "sfish@gmail.com", "335 Cloverfield Dr", "Corvallis", "56675", "Montana", "345-553-4323"),
("Jessica", "James", "jess.1@gmail.com", "2787 Highland Ave", "Eugene", "86776", "Oregon", "541-344-3432"),
("Jake", "Taylor", "jakey@gmail.com", "1212 Circle Blvd", "Portland", "98657", "Maine", "576-897-6783"),
("Sarah", "Garcia", "sgar.3@gmail.com", "6574 Kings Blvd", "Seattle", "66645", "Washington", "234-534-4245"),
("Tanner", "Smith", "tannner@gmail.com", "2323 Hollywood Ln", "Miami", "34535", "Florida", "987-866-7746");

-- Vinyls Values Insertion
INSERT INTO Vinyls (vinylTitle, vinylArtist, vinylGenre, vinylReleaseYear, vinylFormat, vinylRecordLabel, vinylCondition, vinylPrice)
VALUES ("Channel Orange", "Frank Ocean", "R&B", 2012, "LP", "Death Row", "New", 39.99),
("Colors", "Jamie XX", "House", 2015, "LP", "Universal", "New", 29.99),
("Skins", "Flume", "Electronic", 2016, "EP", "Sony", "Used", 28.99),
("Actual Life 1", "Fred Again", "Electronic", 2020, "EP", "Atlantic", "New", 24.99),
("Currents", "Tame Impala", "Alternative", 2015, "LP", "Indie", "Used", 34.99);

-- Orders Values Insertion
INSERT INTO Orders (customerID, orderStatus, orderDate, orderTotal)
VALUES (4, "Shipped", '2023-01-05', 24.99),
(3, "Delivered", '2023-01-01', 34.99),
(1, "Shipped", '2023-01-06', 28.99),
(2, "Returned", '2023-01-01', 39.99),
(5, "Preparing", '2023-01-07', 59.98);


-- Inventory Values Insertion
INSERT INTO Inventory (vinylID, inventoryQty)
VALUES (5, 8),
(3, 2),
(2, 1),
(1, 5),
(4, 3);

-- OrderItems Values Insertion
INSERT INTO OrderItems (orderID, inventoryID, vinylQty)
VALUES (1, 5, 1),
(2, 1, 1),
(3, 2, 1),
(4, 4, 1),
(5, 3, 2);
