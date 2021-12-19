package utils

import (
	"crypto/sha1"
	"fmt"
)

func GenerateHashPassword(password string, salt string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
