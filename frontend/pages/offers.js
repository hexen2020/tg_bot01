function offers_page()
{

    function editform(item) {
        webix.ui({
            view:"window", move:true,
            id:"window",
            position:"center", head:"Добавить оффер",
            modal:true,  
            close:true,
            width:800, 
            body:{        
                view:"form", 
        id:"newanswer",
        elements:[
            { view:"text", label:"Название", name:"name", labelPosition:"top"},
            { view:"text", label:"Описание", name:"description", labelPosition:"top"},
            { view:"text", label:"Ссылка", name:"link", labelPosition:"top"},
            { view:"dataview",id:"dataview", height:300,width:600, xCount:4, yCount:4, template:"#term1#,#term2#,#term3#,<span class='trash'><b> Удалить</b></span>", data:[],
            label:"jsonopts", name:"jsonopts", labelPosition:"top",
            onClick:{"trash":function(e,id,node){            
                $$("dataview").remove(id);
            },
          },
        },    
            {
                view:"button", id:"plus", value:"Button",
                    click:function(id,event){
                        webix.ui({
                            view:"window",
                            id:"window_terms",
                            head:"Условия",
                            position:"center",
                            close:true,
                            width: 600,
                            height: 600,
                            body:{
                                view:"form", 
                                id:"terms",
                                elements:[ 
                                { view:"text", label:"Вопрос", name:"term1", labelPosition:"top"},
                                { view:"select", label:"Тип ответа", name:"type", labelPosition:"top",options:[
                                    {"value":"Не выбран" },
                                    {"value":"Число" },
                                    {"value":"Геолокация" },
                                    {"value":"Строка" },
                                ],
                                on:{
                                    onChange: function(newValue, oldValue, config){
                                        if (newValue=="Не выбран") {
                                            $$("min").hide()
                                            $$("max").hide()
                                            $$("line").hide()
                                        }
                                        if (newValue=="Число") {
                                            $$("min").show()
                                            $$("max").show()
                                            $$("line").hide()
                                        }
                                        if (newValue=="Геолокация") {
                                            $$("min").hide()
                                            $$("max").hide()
                                            $$("line").hide()
                                        }
                                        if (newValue=="Строка") {
                                            $$("min").hide()
                                            $$("max").hide()
                                            $$("line").show()
                                        }
                                    }
                                  }
                            },
                                { view:"text",id:"min", hidden:true, label:"Минимальное значение", name:"term2", labelPosition:"top"},
                                { view:"text",id:"max", hidden:true, label:"Максимальное значение", name:"term3", labelPosition:"top"},
                                { view:"text",id:"line", hidden:true, label:"Значение", name:"term4", labelPosition:"top"},
                                { margin:5, cols:[
                                    {
                                         view:"button", value:"Добавить" , css:"webix_primary",  click:function(id,event){
                                            var terms = $$("terms").getValues(terms);
                                            $$("dataview").add(
                                                terms
                                            );
                                            $$('window_terms').close()
                                    }
                                },
                                ]}
                            ]
                            }
                        }).show();

                },
                type:"icon", icon:"wxi-plus",label:"Добавить условие", fillspace:true
            },
            { margin:5, cols:[
                {
                     view:"button", value:"Подтвердить" , css:"webix_primary",  click:function(id,event){


                            var formvalues3 = $$("newanswer").getValues();
                            formvalues3.jsonopts=$$("dataview").serialize()
                            if (item) {
                                formvalues3.id=item.id
                            }
                            webix.ajax().post("http://localhost:3000/formvalues3",formvalues3).then(function()
                            {
                                   $$('window').close()
                                   $$('datatable').load("http://localhost:3000/hello3")        
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
                    item.jsonopts
                );

            }
    }


    let page_body={
        id:"my_body",
        rows:[
            {
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
                        webix.ajax().post("http://localhost:3000/deleteform3",id).then(function()
                                 {
                                        $$('datatable').clearAll()
                                        $$('datatable').load("http://localhost:3000/hello3")            
                                });        
                    })},
                    "custom_edit":function(e,id,node){
                        let item = $$("datatable").getItem(id.row);
                        editform(item)
                    }},


                columns:[
                    { id:"id",   header:"Номер оффера",   fillspace:true},
                    { id:"name",   header:"Название",   fillspace:true},
                    { id:"description",    header:"Описание", fillspace:true},
                    { id:"link",   header:"Ссылка",   fillspace:true},
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
                url:"http://localhost:3000/hello3"
                    }



        ]
    }
    return page_body
}