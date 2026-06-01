--INSERT INTO AuctionSystem.dbo.Users VALUES('arjun@gmail.com','Arjun','Anish','07516955754','TEST')  
  
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','Corsair Vengeance','...','https://m.media-amazon.com/images/I/61EVf-QxpvL._AC_UY327_FMwebp_QL65_.jpg','235','200','185','2024-02-28 14:36:00','Electronics','[]')
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','iPhone 14 Pro Max','...','https://i.ebayimg.com/images/g/L0gAAOSwOANkjIBk/s-l960.png','900','900','900','2024-03-14 12:00:00','Electronics','[]')
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','2009 BMW  116I ES','.','https://cs.copart.com/v1/AUTH_svc.pdoc00001/lpp/1123/abf53bf67fc54e528ba8f17070338752_ful.jpg','4700','4700','4700','2024-02-18 15:00:00','Cars','[]')
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','2019 AUDI A1 SPORT 3','.','https://cs.copart.com/v1/AUTH_svc.pdoc00001/lpp/0923/9bac4cfbf2184c6c9cf27f8eac3773c4_ful.jpg','4700','4700','4700','2024-02-18 21:34:09','Cars','[]')
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','November. Last roses','.','https://d3rf6j5nx5r04a.cloudfront.net/kN9E7hvYPeqqB1BjB2iPDBXaduc=/1120x0/product/1/9/110c121a7cd84f71b4444233fc338f80_opt.jpg','200','200','200','2024-02-09 19:43:00','Antique','[]')
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','Tango No.1','.','https://d3rf6j5nx5r04a.cloudfront.net/mTM7K3xLmF4gz9mS6WPFAgRLQUM=/1120x0/product/c/3/b549153651bd450fa7cf394b2896ecaf_opt.jpg','400','400','400','2024-02-07 17:56:00','Antique','[]')
--INSERT INTO AuctionSystem.dbo.Auction VALUES('arjunrc@gmx.co.uk','Stone Pendant','.','https://content.thewosgroup.com/productimage/12143548/12143548_1.jpg?impolicy=zoom','700','700','700','2024-02-22 11:10:00','Jewelerry','[]')
   

--CREATE TABLE AuctionSystem.dbo.Users(Email varchar(50) PRIMARY KEY NOT NULL, Forename varchar (50) NOT NULL, Surname varchar(50) NOT NULL ,PhoneNumber varchar(25) NOT NULL,Password varchar(200) NOT NULL)
--CREATE TABLE AuctionSystem.dbo.Auction(AuctionID int IDENTITY (1,1) PRIMARY KEY NOT NULL,Email varchar(50) REFERENCES Users(Email) NOT NULL, ItemName varchar(50) NOT NULL,ItemDescription varchar(1000) NOT NULL,ImageURL varchar(1000) NOT NULL,EstimatedValue real NOT NULL,StartingPrice real NOT NULL,ReservePrice real NOT NULL, EndDate datetime NOT NULL, Category varchar(100) NOT NULL,AutomaticBids varchar(1000) NOT NULL)
--CREATE TABLE AuctionSystem.dbo.Bids(BidID int IDENTITY (1,1) PRIMARY KEY NOT NULL,Email varchar(50) REFERENCES Users(Email) NOT NULL,AuctionID int REFERENCES Auction(AuctionID),Amount real NOT NULL, BidDate datetime NOT NULL)

--UPDATE AuctionSystem.dbo.Auction SET EndDate = '03/09/2024' WHERE AuctionID = 5
--INSERT INTO AuctionSystem.dbo.Bids VALUES('arjun@gmail.com','1','475', GETDATE())
--DELETE FROM AuctionSystem.dbo.Auction WHERE AuctionID = 1022

--SELECT * FROM AuctionSystem.dbo.Auction	
SELECT * FROM AuctionSystem.dbo.Bids	
--SELECT * FROM AuctionSystem.dbo.Users
--CREATE TABLE Ariels.dbo.Ticket(Email varchar(50) PRIMARY KEY NOT NULL, Name varchar (50) NOT NULL, Departure varchar(100), Arrival varchar(100), Flight varchar(100))
--SELECT * FROM Ariels.dbo.Ticket
--CREATE TABLE Ticket	(Email varchar(50) NOT NULL, Name varchar (50) NOT NULL, Departure varchar(100), Arrival varchar(100), Flight varchar(100), PRIMARY KEY (Email))







  
