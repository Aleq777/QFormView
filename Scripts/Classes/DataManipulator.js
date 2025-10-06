

class DataManipulator
{
    // Real ID of the data table
    ID;
    // Reference to XML source
    XML;
    // Reference to HTML (as DOM)
    HTML;
    // Raw identifiers before eval
    RawDataSources;
    // Data sources after eval
    DataSources;

    constructor (xml)
    {
        this.ID = null;
        this.XML = xml;
        this.HTML = null;
        this.RawDataSources = { };
        this.DataSources = { };

        this._SetDataSources();
    }

    _SetDataSources()
    {
        const data = this.XML.FindTag("Data");

        if (!data)
            return;

        const sources = data.GetTags("Source");

        switch (sources.length)
        {
            case 0:

                break;
            case 1:
                this._SetSingleSource(sources[0]);
                break;
            default:
                sources.forEach(source => {
                    this._SetSource(source)
                });
                break;
        }
    }

    _SetSingleSource(source)
    {
        const value = source.innerHTML.trim();
        this.RawDataSources.Main = value;
        this.DataSources.Main = eval(value);
    }

    _SetSource(source)
    {
        const alias = source.Attr("Alias");
        const value = source.innerHTML.trim();
        this.RawDataSources[alias] = value;
        this.DataSources[alias] = eval(value);
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