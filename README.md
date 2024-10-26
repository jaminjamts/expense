/////////////////////////all query checked and table builded commands \\\\\\\\\\\\\\\\\\\\\\\
CREATE TABLE category(
id SERIAL UNIQUE,
name VARCHAR(100),
description TEXT,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
category_icon TEXT,
icon_color TEXT);
///////////////////////////////////////////////
CREATE TABLE record(
id SERIAL UNIQUE,
user_id INT REFERENCES users(id),
name VARCHAR(100),
amount REAL NOT NULL,
transaction_type VARCHAR(3) CHECK (transaction_type IN ('INC', 'EXP')),
description TEXT,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
category_id INT REFERENCES category(id)
);
///////////////////////////////////////////////
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name TEXT UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
////////////////////////////////////////////////

Frontend server will work in http://localhost:3000

Backend server will work in http://localhost:6789
////////////////////////////////////////////////////
You need a server check you can send a
GET method
http://localhost:6789
////////////////////////////////////////////////////
SIGN UP check
POST method
http://localhost:6789/sign-up
{"name":"example",
"email":"bob@example.com",
"password":"123"}
/////////////////////////////////////////////////////
SIGN IN check
POST method
http://localhost:6789/sign-in
{"name":"example",
"password":"123"}
/////////////////////////////////////////////////////
all CATEGORYS take in
GET method
http://localhost:6789/categorys
/////////////////////////////////////////////////////
category ADD
POST method
http://localhost:6789/category
{
"name":"example",
"description": "example",
"category_icon":"example",
"icon_color" :"example"
}
/////////////////////////////////////////////////////
transaction
GET method
http://localhost:6789/transactions
{id: 12}
/////////////////////////////////////////////////////
transaction delete path parameter usage
DELETE method
http://localhost:6789/transaction/00 transaction number
{"user_id": userid}
/////////////////////////////////////////////////////
transaction filter query usage
GET method
http://localhost:6789/transaction?type=EXP&startDate=2023-10-20&endDate=2023-10-25
{"user_id":22}
/////////////////////////////////////////////////////
