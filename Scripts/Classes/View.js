

class View extends Table
{
    Name;
    Title;
    Description;

    constructor (xml)
    {
        super (xml);
        
        this.Name = null;
        this.Title = null;
        this.Description = null;
        
        this._SetBasics();
    }

    _SetBasics()
    {
        this.Name = this.XML.Attr("Name");
        this.Title = this.XML.Attr("Title");
        
        if (this.XML.Has("Description"))
            this.Description = this.XML.FindTag("Description").innerHTML.trim();
    }

    Display()
    {
        this._InitialiseHTML();

        super.Display( View.GetIDFromName(this.Name), document );
    }

    _InitialiseHTML()
    {
        let fieldset = Create("fieldset");
        
        let legend = Create("legend");
        legend.innerHTML = `<h3>${this.Title}</h3>`;
        fieldset.appendChild(legend);

        if (this.Description)
        {
            let desc = Create("div");
            desc.innerHTML = this.Description;
            fieldset.appendChild(desc);
        }

        let table = Create("table");
        table.id = View.GetIDFromName(this.Name);
        fieldset.appendChild(table);

        Find(this.Name).appendChild(fieldset);
    }

    static GetIDFromName(name)
    {
        return `${name}View`;
    }

}