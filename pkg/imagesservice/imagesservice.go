package imagesservice

import (
	"image"

	"github.com/disintegration/imaging"
)

type ImagesService interface {
	ResizeImage(image image.Image, width int, height int) image.Image
	ResizeImageList(imagesInput map[string]image.Image, width int, height int) map[string]image.Image
}

type imagesService struct {
}

func NewImagesService() ImagesService {
	return &imagesService{}
}

func (is *imagesService) ResizeImage(image image.Image, width int, height int) image.Image {
	if height != 0 {
		return imaging.Fill(image, width, height, imaging.Center, imaging.Lanczos)
	} else {
		return imaging.Resize(image, width, 0, imaging.Lanczos)
	}
}

//на вход идет мапа ключ - имя файла
func (is *imagesService) ResizeImageList(imagesInput map[string]image.Image, width int, height int) map[string]image.Image {
	imagesResult := make(map[string]image.Image, len(imagesInput))
	for name, image := range imagesInput {
		resImage := is.ResizeImage(image, width, height)
		imagesResult[name] = resImage
	}
	return imagesResult
}
