function question_page()
{

    function editform(item) {
        webix.ui({
            view:"window", move:true,
            id:"window",
            position:"center", head:"Изменение вопроса",
            modal:true,  
            close:true,
            width:800, 
            body:{        
                view:"form", 
        id:"newanswer",
        elements:[
            { view:"text", label:"Вопрос анкеты", name:"question", labelPosition:"top"},
            { view:"text", label:"anketaopts", name:"anketaopts", labelPosition:"top"},
            { view:"select", label:"Тип ответа пользователя", options:[
            {"value":"age" },
            {"value":"region" },
            {"value":"history" },
            {"value":"amount" },
            {"value":"null" }], name:"type", labelPosition:"top"},
            { view:"text", label:"Ответ бота при ошибке", name:"error", labelPosition:"top"},
            { view:"text", label:"Краткий вопрос для профиля", name:"question_small", labelPosition:"top"},
            { margin:5, cols:[
                {
                     view:"button", value:"Подтвердить" , css:"webix_primary",  click:function(id,event){


                            var formvalues = $$("newanswer").getValues();
                            if (item) {
                                formvalues.id=item.id
                            }
                            webix.ajax().post("http://localhost:3000/formvalues",formvalues).then(function()
                            {
                                   $$('window').close()
                                   $$('datatable').load("http://localhost:3000/hello")        
                           });


 
                }
            },
            ]}
        ]
            }
            })
            .show();     
            if (item) {

                var setvalues = $$("newanswer").setValues(item);

            }
    }

    let page_body={
      id:"my_body",
      rows:[{
        view:"button", id:"my_button", value:"Button",
            click:function(id,event){
                editform()
        },
        type:"icon", icon:"wxi-plus",label:"Добавить строку в таблицу", fillspace:true
    },
    {
        view:"datatable",
        id:"datatable",
        
        onClick:{"custom_trash":function(e,id,node){            
            webix.confirm({
            title:"Удалить строку?",
            ok:"Да", cancel:"Нет",
            text:"Отменить удаление будет невозможно"
          })
            .then(function(){
                webix.ajax().post("http://localhost:3000/deleteform",id).then(function()
                         {
                                $$('datatable').clearAll()
                                $$('datatable').load("http://localhost:3000/hello")            
                        });        
            })},
            "custom_edit":function(e,id,node){
                let item = $$("datatable").getItem(id.row);
                editform(item)
            }},
        
        
        
        columns:[
            { id:"id",   header:"Номер вопроса",   fillspace:true},
            { id:"question",   header:"Вопрос анкеты",   fillspace:true},
            { id:"anketaopts",    header:"anketaopts", fillspace:true},
            { id:"type",   header:"Тип ответа пользователя",   fillspace:true},
            { id:"error",    header:"Ответ бота при ошибке", fillspace:true},
            { id:"question_small",   header:"Краткий вопрос для профиля",fillspace:true},
            {id:"delete", 
            header:"&nbsp;", 
            width:99, 
            template: '<span style="cursor:pointer;" class="webix_icon fa-files-o"></span>&nbsp;&nbsp;<svg width="15" height="15" class="custom_trash" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.1666 13.3334C1.1666 14.2542 2.11131 15.0001 3.27773 15.0001H11.7222C12.8886 15.0001 13.8333 14.2542 13.8333 13.3334V3.33337H1.1666V13.3334Z" fill="black"/><path d="M11.1944 0.83332L10.1388 0H4.8611L3.80551 0.83332H0.111099V2.5H14.8888V0.83332H11.1944Z" fill="black"/></svg>'
        },
        {id:"edit", 
            header:"&nbsp;", 
            width:99, 
            template: '<span style="cursor:pointer;" class="webix_icon fa-files-o"></span>&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="custom_edit" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>'
        }
        ],
        url:"http://localhost:3000/hello"
    } 


]

    }

    return page_body
}