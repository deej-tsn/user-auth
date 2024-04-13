# Backend

The role of the server can be seperated into approxiately 3 overlapping functions.

Route data from database to frontend server.




### Libraries
This server is written in Golang using several libraries for sending and receiving HTTP requests, communicating with database, handling encryption.

- Echo/V4 handles running of server.
- Net/HTTP handles http specific codes
- go-sql-driver-mysql handles connecting to mysql database
- database/sql handles sql commands
- crypto/bcrypt handles encrytion of passwords
- golang-jwt/jwt handles json web token functions
- godontenv handles .env files

other libraries belong to go standard library and handle simplier functions.