

class Form extends DataManipulator
{
    static GlobalCellID = 0;

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
        this.HTML = Find(this.Name);

        this._InitialiseHTML();

        this._FillQuestions();
    }

    _InitialiseHTML()
    {
        DataManipulator._InitialiseHighHTML(Form, this);
    }

    static GetIDFromName(name)
    {
        return `${name}Form`;
    }

    _FillQuestions()
    {

    }
}