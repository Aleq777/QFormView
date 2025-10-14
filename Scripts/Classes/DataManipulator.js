

class DataManipulator
{
    // Real ID of the data table
    ID;
    // Reference to XML source
    XML;
    // Reference to HTML (as DOM)
    HTML;
    // Raw identifiers before eval
    RawDataSource;
    // Data sources after eval
    DataSource;
    // Data Type (for new() operator)
    DataType;

    constructor (xml)
    {
        this.ID = null;
        this.XML = xml;
        this.HTML = null;
        this.RawDataSource = null;
        this.DataSource = { };

        let dataType = xml.Attr("DataType");
        this.DataType = dataType ? eval(dataType) : null;

        this._SetDataSource();
    }

    _SetDataSource()
    {
        const data = this.XML.FindTag("Data");

        if (!data)
            return;

        this._SetSource(data);
    }

    _SetSource(source)
    {
        const value = source.innerHTML.trim();
        this.RawDataSource = value;
        this.DataSource = eval(value);
    }

    // abstract
    Display()
    { }

    // Indirect inheritance
    static _InitialiseHighHTML(T, object)
    {
        let fieldset = Create("fieldset");

        let legend = Create("legend");
        legend.innerHTML = `<h3>${object.Title}</h3>`
        fieldset.appendChild(legend);

        if (object.Description)
        {
            let desc = Create("div");
            desc.innerHTML = object.Description;
            fieldset.appendChild(desc);
        }

        let table = Create("table");
        table.id = T.GetIDFromName(object.Name);
        fieldset.appendChild(table);

        Find(object.Name).appendChild(fieldset);
    }

    static _SetHighBasics(object)
    {
        object.Name = object.XML.Attr("Name");
        object.Title = object.XML.Attr("Title");
        
        if (object.XML.Has("Description"))
            object.Description = object.XML.FindTag("Description").innerHTML.trim();
    }
}