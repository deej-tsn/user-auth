package main

import (
	"fmt"

	"deej-tsn/user-auth-example/struct-db/controllers"
	"deej-tsn/user-auth-example/struct-db/sqldb"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type ()

func main() {

	db := sqldb.ConnectToDB()

	handler := controllers.NewBaseHandler(db)

	e := echo.New()

	fmt.Println("db connectly properly")

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	// Routes
	e.POST("/users/createUser", handler.CreateUser)
	e.POST("/users/login", handler.GetUser)
	e.POST("users/auth/jwt", handler.AuthenticateJwt)
	e.GET("/posts/:rank", handler.GetPosts)
	e.POST("/posts", handler.GetPostsUser)
	/*

		e.PUT("/users/:id", updateUser)
		e.DELETE("/users/:id", deleteUser)
		e.GET("/users", getUsers)
	*/

	// Start server
	e.Logger.Fatal(e.Start(":1323"))

}
