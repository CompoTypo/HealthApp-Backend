#### SQL

create table users (
    UID INTEGER PRIMARY KEY AUTOINCREMENT,
	Fname TEXT NOT NULL,
    Lname TEXT NOT NULL,
    Uname TEXT NOT NULL,
    Email TEXT NOT NULL,
    Hash TEXT NOT NULL,
    DOB TEXT NOT NULL,
	Sex TEXT,
    Race TEXT,
    Type TEXT NOT NULL
);

insert into vitals.Wght, 

create table doctorinfo (
    Hash TEXT NOT NULL,
    License TEXT NOT NULL,
    Spec TEXT NOT NULL,
    Degree TEXT NOT NULL,
    Almat TEXT NOT NULL
);

create table patientinfo (
    Hash TEXT NOT NULL,
    Title TEXT,
    Descr TEXT,
    RTime INTEGER NOT NULL
);

create table dates (
    Hash TEXT NOT NULL,
    Title TEXT,
    Descr TEXT,
    RTime INTEGER NOT NULL
);

create table msgs (
    Hash TEXT NOT NULL,
    Tokey TEXT NOT NULL,
    Sub TEXT,
    Body TEXT,
    RTime INTEGER NOT NULL
);

create table bp (
    Hash TEXT NOT NULL,
 
    RTime INTEGER NOT NULL    
);

create table vitals (
    Hash TEXT NOT NULL,
    Temp REAL,    
    Wght Real,   
    Sys INTEGER,    
    Dia INTEGER,    
    Pulse INTEGER, 
    RTime INTEGER NOT NULL    
);


# edges connecting users and describing it
create table relations (
    Hash TEXT NOT NULL,
    Temp REAL NOT NULL,    
    Wght Real NOT NULL,    
    RTime INTEGER NOT NULL    
);

SELECT users.Fname, users.Lname
FROM users
INNER JOIN users ON users.CustomerID=Customers.CustomerID;
