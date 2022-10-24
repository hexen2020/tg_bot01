function bestpage_page()
{
    let page_body={
        id:"my_body",
        rows:[
           
            {
                view:"datatable",
                id:"datatable",
               
                columns:[
                    { id:"id",   header:"Рейтинг МФО",  fillspace:true},
                   
                ],
                data:[]
                    }

        ]
    }
    return page_body
}