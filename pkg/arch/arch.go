package arch

import (
	"archive/zip"
	"io/ioutil"
	"os"
)

type Arch interface {
	ZipFolder(folderPath string, outputFile string) error
}

type archiver struct {
}

func NewArchService() Arch {
	return &archiver{}
}

func (a *archiver) ZipFolder(folderPath string, outputFile string) error {
	outFile, err := os.Create(outputFile)
	if err != nil {
		return err
	}
	defer outFile.Close()

	w := zip.NewWriter(outFile)

	err = addFiles(w, folderPath, "./")
	if err != nil {
		return err
	}

	err = w.Close()
	if err != nil {
		return err
	}
	return nil
}

func addFiles(w *zip.Writer, basePath, baseInZip string) error {
	files, err := ioutil.ReadDir(basePath)
	if err != nil {
		return err
	}
	for _, file := range files {
		ignoreList := []string{".DS_Store", "diagnostic.data", "journal"}
		if contains(ignoreList, file.Name()) {
			continue
		}
		if !file.IsDir() {
			dat, err := ioutil.ReadFile(basePath + "/" + file.Name())
			if err != nil {
				return err
			}
			f, err := w.Create(baseInZip + file.Name())
			if err != nil {
				return err
			}
			_, err = f.Write(dat)
			if err != nil {
				return err
			}
		} else if file.IsDir() {
			newBase := basePath + "/" + file.Name() + "/"
			addFiles(w, newBase, baseInZip+file.Name()+"/")
		}
	}

	return nil
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
