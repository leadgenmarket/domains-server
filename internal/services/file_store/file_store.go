package filestore

import (
	"io/ioutil"
	"strings"

	uuid "github.com/nu7hatch/gouuid"
)

type FileStore interface {
	SaveFileToStore(file []byte, incomingFileName string) (string, error)
}

type filestore struct {
	rootPath string
}

func NewFileStoreService(rootPath string) FileStore {
	return &filestore{
		rootPath: rootPath,
	}
}

func (f *filestore) SaveFileToStore(file []byte, incomingFileName string) (string, error) {
	fileSet := strings.Split(incomingFileName, ".")[len(strings.Split(incomingFileName, "."))-1]
	id, _ := uuid.NewV4()
	fileName := id.String() + "." + fileSet

	err := ioutil.WriteFile(f.rootPath+"/"+fileName, file, 0644)
	if err != nil {
		return "", err
	}
	return fileName, nil
}
