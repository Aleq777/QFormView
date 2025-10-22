

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
        DataManipulator._SetHighBasics(this);
    }

    Display()
    {
        this._InitialiseHTML();

        this.Reload();
    }

    Reload()
    {
        super.Display(
            View.GetIDFromName(this.Name),
            document
        );
    }

    _InitialiseHTML()
    {
        DataManipulator._InitialiseHighHTML(View, this);
    }

    static GetIDFromName(name)
    {
        return `${name}View`;
    }

    Remove(index)
    {
        delete eval(this.RawDataSource)[index];
        this.Reload();
    }

}