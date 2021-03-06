package logger

import (
	"os"

	runtime "github.com/banzaicloud/logrus-runtime-formatter"
	formatter "github.com/fabienm/go-logrus-formatters"
	"github.com/sirupsen/logrus"
)

type Log interface {
	GetInstance() *logrus.Logger
}

type logger struct {
	log *logrus.Logger
}

func NewLogger(serviceName string, logLevel uint32, file *os.File) Log {
	log := logrus.New()
	log.SetLevel(logrus.Level(logLevel))
	gelFmt := formatter.NewGelf(serviceName)
	runtimeFormatter := &runtime.Formatter{ChildFormatter: gelFmt}
	log.SetFormatter(runtimeFormatter)
	log.SetOutput(file)
	//hook := graylog.NewGraylogHook(greyLogHost, map[string]interface{}{})
	//log.AddHook(hook)

	return &logger{
		log: log,
	}
}

func (lg *logger) GetInstance() *logrus.Logger {
	return lg.log
}
