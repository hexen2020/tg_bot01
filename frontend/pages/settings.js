function settings_page()
{
    let page_body={
        id:"my_body",
        rows:[
           
            {
                view:"datatable",
                id:"datatable",
               
                columns:[
                    { id:"id",   header:"Настройки",  fillspace:true},
                   
                ],
                data:[]
                    }

        ]
    }
    return page_body
}