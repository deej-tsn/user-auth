package encryption

import (
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"

	"github.com/golang-jwt/jwt/v5"

	"time"

	"os"

	"github.com/joho/godotenv"
)

func Load(secretkey *[]byte) {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
	}
	var key, exist = os.LookupEnv("SECRET_KEY")
	if !exist {
		panic("encrytion key not found")
	}
	*secretkey = []byte(key)

}

var SECRET_KEY = []byte("")

type (
	CustomClaim struct {
		Name string `json:"name"`
		Rank string `json:"rank"`
		jwt.RegisteredClaims
	}
)

func Encrypt(password string) string {
	passByte := []byte(password)
	hashedPassword, err := bcrypt.GenerateFromPassword(passByte, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(hashedPassword))

	return string(hashedPassword)
}

func Compare(hashedPassword string, password string) bool {
	hashByte := []byte(hashedPassword)
	passByte := []byte(password)
	err := bcrypt.CompareHashAndPassword(hashByte, passByte)
	if err == nil {
		return true
	} else {
		fmt.Println(err)
		return false
	}
}

func GenJWT(Name string, Rank string) (string, error) {
	Load(&SECRET_KEY)
	claims := CustomClaim{
		Name,
		Rank,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			Issuer:    "deej-tsn",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(SECRET_KEY)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	return tokenString, nil
}

func AuthJWT(tokenString string) (CustomClaim, error) {

	Load(&SECRET_KEY)

	userToken, err := jwt.ParseWithClaims(tokenString, &CustomClaim{}, func(t *jwt.Token) (interface{}, error) {
		return SECRET_KEY, nil
	})
	user := new(CustomClaim)
	if err != nil {
		return *user, err
	}
	if !userToken.Valid {
		return *user, errors.New("invalid token")
	}

	claims, ok := userToken.Claims.(*CustomClaim)
	if ok {
		fmt.Println(claims.Name + " " + claims.Rank)
	}
	return *claims, nil
}
