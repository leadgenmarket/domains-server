package images

import (
	"bufio"
	"bytes"
	filestore "domain-server/internal/services/file_store"
	"domain-server/pkg/imagesservice"
	"image"
	"image/jpeg"
	"mime/multipart"
)

type MultipartImages interface {
	ResizeAndSaveMultipartImage(imageIn *multipart.FileHeader, width int, height int) (string, error)
	ResizeAndSaveMultipartImagesList(imagesInput []*multipart.FileHeader, width int, height int) (map[string]string, error)
}

type multipartImages struct {
	fileStore     filestore.FileStore
	imagesService imagesservice.ImagesService
}

func NewImages(fileStore filestore.FileStore, imagesService imagesservice.ImagesService) MultipartImages {
	return &multipartImages{
		fileStore:     fileStore,
		imagesService: imagesService,
	}
}

func (mi *multipartImages) ResizeAndSaveMultipartImage(imageIn *multipart.FileHeader, width int, height int) (string, error) {
	fileHeader, _ := imageIn.Open()
	defer fileHeader.Close()
	fileReader := bufio.NewReader(fileHeader)
	imageDec, _, err := image.Decode(fileReader)
	if err != nil {
		return "", err
	}
	buf := new(bytes.Buffer)
	err = jpeg.Encode(buf, imageDec, nil)
	if err != nil {
		return "", err
	}
	filename, err := mi.fileStore.SaveFileToStore(buf.Bytes(), imageIn.Filename)
	if err != nil {
		return "", err
	}
	return filename, nil
}

func (mi *multipartImages) ResizeAndSaveMultipartImagesList(imagesInput []*multipart.FileHeader, width int, height int) (map[string]string, error) {
	notConvertedImagesList := map[string]image.Image{}
	for _, imageIn := range imagesInput {
		fileHeader, _ := imageIn.Open()
		defer fileHeader.Close()
		fileReader := bufio.NewReader(fileHeader)
		imageDec, _, err := image.Decode(fileReader)
		if err != nil {
			return nil, err
		}
		notConvertedImagesList[imageIn.Filename] = imageDec
	}
	convertedImagesList := mi.imagesService.ResizeImageList(notConvertedImagesList, width, height)
	result := map[string]string{}
	for fileInputName, image := range convertedImagesList {
		buf := new(bytes.Buffer)
		err := jpeg.Encode(buf, image, nil)
		if err != nil {
			return nil, err
		}
		filename, err := mi.fileStore.SaveFileToStore(buf.Bytes(), fileInputName)
		if err != nil {
			return nil, err
		}
		result[fileInputName] = filename
	}

	return result, nil
}
