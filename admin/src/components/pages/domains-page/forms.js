const forms = [
    {
        title: 'Добавить домен',
        name: 'addDomain',
        url:"/api/domains/",
        type: "put",
        //action: (action) => {actionAdd(action)},
        fields: [
            {
                name: 'URL',
                json: 'url',
                type: 'text',
            },
            {
                name: 'Шаблон',
                json: 'template',
                type: 'select',
                options: [
                    {
                        name: "Синий",
                        value: "sdsdsd231313"
                    },
                    {
                        name: "Фиолетовый",
                        value: "sdsdsd231313"
                    },
                    {
                        name: "Whats App",
                        value: "sdsdsd231313"
                    },
                ]
            },
        ],
    },
    {
        title: 'Редактировать акцию',
        name: 'editAction',
        url: "/api/actions/",
        type: "post",
        //action: (action) => {actionEdit(action)},
        //edit: (action) => { setEditAction(action)},
        //imageurl:"public/objects/"+activeObject.ID+"/actions/", //id
        //date: editAction,
        clear:false,
        fields: [
            {
                name: 'Действует с',
                json: 'start_time',
                type: 'date',
            },
            {
                name: 'Действует до',
                json: 'end_time',
                type: 'date',
            },
            {
                name: 'Выберите как будет варьироваться скидка? (прим. до 20%, от 20% или = 20%)',
                json: 'less_than_value',
                type: 'select',
                options: [
                    {
                        name: "От",
                        value: -1
                    },
                    {
                        name: "=",
                        value: 0
                    },
                    {
                        name: "До",
                        value: 1
                    },
                    
                ]
            },
            {
                name: 'Размер скидки',
                json: 'value',
                type: 'number',
            },
            {
                name: 'Анонс (короткое описание для обложки)',
                json: 'anons',
                type: 'text',
            },
            {
                name: 'Полный заголовок акции',
                json: 'title',
                type: 'text',
            },
            {
                name: 'Описание акции',
                json: 'description',
                type: 'textarea',
            },
            {
                json: 'ID',
                type: 'hidden',
            },
            {
                name: 'Загрузите обложку',
                json: 'file',
                type: 'file',
            },
            {
                json: 'object_id',
                type: 'hidden',
                //value: activeObject.ID
            },
        ],
        
    },
    {
        title: 'Удалить акцию',
        question: 'Вы действительно хотите удалить акцию?',
        name: 'deleteAction',
        url:"/api/actions/",
        type: "delete",
        //action: (action) => { actionDelete(action)},
        //edit: () => {},
        //date: editAction,
        clear:false,
        fields: [
          {
            json: 'ID',
            type: 'hidden',
          },
        ]
      },
]

export default forms