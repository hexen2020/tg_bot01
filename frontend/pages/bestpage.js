function bestpage_page()
{



    let page_body={
      id:"my_body",
      rows:[
    {
        view:"datatable",
        id:"datatable1",
        onClick:{
            "custom_edit":function(e,id,node){
                let item = $$("datatable1").getItem(id.row);
                webix.ui({
                    view:"window", move:true,
                    id:"window",
                    position:"center", head:"Изменение текста сообщения",
                    modal:true,  
                    close:true,
                    width:800, 
                    body:{        
                        view:"form", 
                id:"newanswer",
                elements:[
                    { view:"textarea", label:"Текст стартового сообщения", name:"msg", labelPosition:"top", height:150},   
                    { margin:5, cols:[
                        {
                             view:"button", value:"Подтвердить" , css:"webix_primary",  click:function(id,event){
        
                                
                                    var formvalues6 = $$("newanswer").getValues();
                                    if (item) {
                                        formvalues6.id=item.id
                                    }
                                    webix.ajax().post("https://api.messagebotfarm.ru/offertextstart",formvalues6).then(function()
                                    {
                                           $$('window').close()
                                           $$('datatable1').load("https://api.messagebotfarm.ru/hello6")        
                                   });
                        }
                    },
                    ]}
                ]
                    }
                    })
                    .show();     
                    if (item) {
                        $$("newanswer").setValues(item);
                    }
            }},
        
        
        
        columns:[
            { id:"msg",   header:"Текст в начале сообщения",   fillspace:true},
        {id:"edit", 
            header:"&nbsp;", 
            width:99, 
            template: '<span style="cursor:pointer;" class="webix_icon fa-files-o"></span>&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="custom_edit" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>'
        }
        ],
        url:"https://api.messagebotfarm.ru/hello6"
    },
    {
        view:"datatable",
        id:"datatable2",
        columns:[
            { id:"name",   header:"Офферы под 0%",   fillspace:true},
        ],
        url:"https://api.messagebotfarm.ru/topnull"
    }, 

    {
        view:"datatable",
        id:"datatable3",
        columns:[
            { id:"name",   header:"Офферы под обычный процент",   fillspace:true},
        ],
        url:"https://api.messagebotfarm.ru/topstandart"
    },
    {
        view:"datatable",
        id:"datatable5",
        columns:[
            { id:"name",   header:"Офферы с плохой кредитной историей",   fillspace:true},
        ],
        url:"https://api.messagebotfarm.ru/topbad"
    },

    {
        view:"datatable",
        id:"datatable4",  
        onClick:{
            "custom_edit":function(e,id,node){
                let item = $$("datatable4").getItem(id.row);
                webix.ui({
                    view:"window", move:true,
                    id:"window",
                    position:"center", head:"Изменение текста сообщения",
                    modal:true,  
                    close:true,
                    width:800, 
                    body:{        
                        view:"form", 
                id:"newanswer",
                elements:[
                    { view:"textarea", label:"Текст в конце сообщения", name:"msg", labelPosition:"top", height:150},
                    { view:"dataview",id:"dataview", height:300,width:600, xCount:4, yCount:4, template:"#text#,<span class='trash'><b> Удалить</b></span>", data:[],
                    label:"opts", name:"opts", labelPosition:"top",
                    onClick:{"trash":function(e,id,node){            
                        $$("dataview").remove(id);
                    },
                  },
                },    
                    {
                        view:"button", id:"plus", value:"Button",
                            click:function(id,event){
        
                                webix.prompt({
                                    title: "Введите вариант ответа",
                                    text: "Какой ответ вы хотите добавить?",
                                    ok: "Добавить",
                                    cancel: "Отмена",
                                    input: {
                                      required:true,
                                      placeholder:"Введите вариант ответа...",
                                    },
                                    width:350,
                                  }).then(function(result){
                                    $$("dataview").add({
                                        text:result,
                                        callback_data:result
                                    });
                                  }).fail(function(){
                                    webix.alert({
                                      type: "alert-error",
                                      text: "Отменено"
                                    });
                                  });
                        },
                        type:"icon", icon:"wxi-plus",label:"Добавить вариант ответа", fillspace:true
                    },
                  
                    { margin:5, cols:[
                        {
                             view:"button", value:"Подтвердить" , css:"webix_primary",  click:function(id,event){
        
                                
                                    var formvalues7 = $$("newanswer").getValues();
                                    formvalues7.opts=$$("dataview").serialize()
                                    if (item) {
                                        formvalues7.id=item.id
                                    }
                                    webix.ajax().post("https://api.messagebotfarm.ru/offertextend",formvalues7).then(function()
                                    {
                                           $$('window').close()
                                           $$('datatable4').load("https://api.messagebotfarm.ru/hello7")        
                                   });
        
        
         
                        }
                    },
                    ]}
                ]
                    }
                    })
                    .show();     
                    if (item) {
        
                        $$("newanswer").setValues(item);
                        $$("dataview").parse(
                            item.opts
                        );
                    }
            }},

        columns:[
            { id:"msg",   header:"Текст в конце сообщения и кнопки под ним",   fillspace:true},
        {id:"edit", 
            header:"&nbsp;", 
            width:99, 
            template: '<span style="cursor:pointer;" class="webix_icon fa-files-o"></span>&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="custom_edit" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>'
        }
        ],
        url:"https://api.messagebotfarm.ru/hello7"
    } 


]

    }

    return page_body
}