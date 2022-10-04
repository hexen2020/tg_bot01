CREATE DATABASE [IF NOT EXISTS] tgbase1;
USE tgbase1;

CREATE TABLE questionnaires
(
Id INT,
Age INT CHECK(Age >17),
loans INT,
region VARCHAR(20),
amount INT
term INT
);



