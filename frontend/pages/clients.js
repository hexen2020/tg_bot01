function clients_page()
{
    let page_body={
        id:"my_body",
        rows:[
           
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
                            webix.ajax().post("https://api.messagebotfarm.ru/deleteform4",id).then(function()
                                     {
                                            $$('datatable').clearAll()
                                            $$('datatable').load("https://api.messagebotfarm.ru/hello4")
                    
                                    });               
                        })
                }}, 
                columns:[
                    { id:"id",   header:"Номер клиента",   width:80},
                    { id:"chatid",   header:"Номер чата с клиентом",   fillspace:true},
                    { id:"name",    header:"Имя клиента", fillspace:true},
                    { id:"lastname",   header:"Фамилия клиента",   fillspace:true},
                    { id:"phone",    header:"Телефон клиента", fillspace:true},
                    {id:"delete", 
                    header:"&nbsp;", 
                    width:99, 
                    template: '<span style="cursor:pointer;" class="webix_icon fa-files-o"></span>&nbsp;&nbsp;<svg width="15" height="15" class="custom_trash" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.1666 13.3334C1.1666 14.2542 2.11131 15.0001 3.27773 15.0001H11.7222C12.8886 15.0001 13.8333 14.2542 13.8333 13.3334V3.33337H1.1666V13.3334Z" fill="black"/><path d="M11.1944 0.83332L10.1388 0H4.8611L3.80551 0.83332H0.111099V2.5H14.8888V0.83332H11.1944Z" fill="black"/></svg>'
                }
                ],
                url:"https://api.messagebotfarm.ru/hello4"
                    }

        ]
    }
    return page_body
}