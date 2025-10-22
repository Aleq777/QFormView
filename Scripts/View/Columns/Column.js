
const EnumColumnTypes = {
    Custom: "Custom",
    Field: "Field",
    Action: "Action",
    Active: "Active",
    Counter: "Counter"
};

class Column
{
    Title;
    XML;

    constructor (xml)
    {
        this.XML = xml;
        
        let title = xml.FindTag("Title");
        this.Title = title ? title.innerHTML.trim() : "Column";
    }

    static _CreateCell(tr, func)
    {
        let cell = Create("td");
        func(cell);
        tr.appendChild(cell);
    }

    CreateCell()
    {  }
}