package utils

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
)

func GenerateHashPassword(password string, salt string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}

func ScriptForTemplate(data interface{}) string {
	jsonStruct, _ := json.Marshal(data)
	return string(jsonStruct)
}
