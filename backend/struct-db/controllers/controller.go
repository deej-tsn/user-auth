package controllers

import (
	"database/sql"
	"net/http"

	"deej-tsn/user-auth-example/struct-db/encryption"

	"github.com/labstack/echo/v4"
)

type (
	BaseHandler struct {
		db *sql.DB
	}

	new_user_req struct {
		//ID     int    `json:"id"`
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Rank     string `json:"rank"`
	}

	sign_in_req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	user_res struct {
		//ID int `json:id`
		Name     string `json:"name"`
		Rank     string `json:"rank"`
		Password string `json:"password"`
	}

	jwt_Json struct {
		JWT   string `json:"jwt"`
		Error string `json:"error"`
	}

	jwt_auth struct {
		JWT string `json:"jwt"`
	}

	post struct {
		Title string `json:"title"`
		Rank  string `json:"rank"`
		Text  string `json:"text"`
	}
)

func NewBaseHandler(db *sql.DB) *BaseHandler {
	return &BaseHandler{
		db: db,
	}
}

func (h *BaseHandler) AuthenticateJwt(c echo.Context) error {
	token := new(jwt_auth)
	if err := c.Bind(token); err != nil {
		return err
	}
	claims, err := encryption.AuthJWT(token.JWT)
	if err != nil {
		return err
	}
	user := map[string]string{"Name": claims.Name, "Rank": claims.Rank}
	return c.JSON(http.StatusAccepted, user)
}
func (h *BaseHandler) CreateUser(c echo.Context) error {
	sqlStatement := "INSERT INTO USERS (name, email, passhash, `rank`) VALUES (?, ?, ?, ?)"
	u := new(new_user_req)
	if err := c.Bind(u); err != nil {
		return err
	}
	passhash := encryption.Encrypt(u.Password)
	_, err := h.db.Exec(sqlStatement, u.Name, u.Email, passhash, u.Rank)
	if err != nil {
		return err
	}
	jwtToken, err := encryption.GenJWT(u.Name, u.Rank)
	if err != nil {
		return err
	}
	res := &jwt_Json{jwtToken, ""}
	return c.JSON(http.StatusCreated, res)
}

func (h *BaseHandler) SignIn(c echo.Context) {

}

func (h *BaseHandler) GetPostsUser(c echo.Context) error {
	token := new(jwt_auth)
	if err := c.Bind(token); err != nil {
		return err
	}
	claims, err := encryption.AuthJWT(token.JWT)
	if err != nil {
		return err
	}
	sqlStatement := "SELECT title, `rank`, body FROM POSTS WHERE `rank` = ? "
	posts := []post{}
	rows, err := h.db.Query(sqlStatement, claims.Rank)
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		singlePost := new(post)
		err = rows.Scan(&singlePost.Title, &singlePost.Rank, &singlePost.Text)
		if err != nil {
			// handle this error
			return err
		}
		posts = append(posts, *singlePost)

	}
	// get any error encountered during iteration
	err = rows.Err()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, posts)

}

func (h *BaseHandler) GetPosts(c echo.Context) error {
	sqlStatement := "SELECT title, `rank`, body FROM POSTS WHERE `rank` =?"
	rank := c.Param("rank")
	posts := []post{}
	rows, err := h.db.Query(sqlStatement, rank)
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		singlePost := new(post)
		err = rows.Scan(&singlePost.Title, &singlePost.Rank, &singlePost.Text)
		if err != nil {
			// handle this error
			return err
		}
		posts = append(posts, *singlePost)

	}
	// get any error encountered during iteration
	err = rows.Err()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, posts)

}

func (h *BaseHandler) GetUser(c echo.Context) error {
	signIn := new(sign_in_req)
	res := new(user_res)
	if err := c.Bind(signIn); err != nil {
		return err
	}
	sqlStatement := "SELECT name, `rank`, passhash from USERS WHERE email = ?"

	err := h.db.QueryRow(sqlStatement, signIn.Email).Scan(&res.Name, &res.Rank, &res.Password)
	if err != nil {
		return err
	}
	if encryption.Compare(res.Password, signIn.Password) {
		jwtToken, err := encryption.GenJWT(res.Name, res.Rank)
		if err != nil {
			return err
		}
		res := &jwt_Json{jwtToken, ""}
		return c.JSON(http.StatusOK, res)
	} else {
		m := &jwt_Json{"", "password incorrect"}
		return c.JSON(http.StatusUnauthorized, m)
	}
}
