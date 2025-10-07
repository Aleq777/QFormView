


class Form extends DataManipulator
{
    static GlobalCellID = 0;

    Name;
    Title;
    Description;

    Questions;

    constructor (xml)
    {
        super (xml);

        this.Name = null;
        this.Title = null;
        this.Description = null;

        this.Questions = [];

        this._SetBasics();

        this._SetQuestions();
    }

    _SetBasics()
    {
        DataManipulator._SetHighBasics(this);

        super.Display(
            Form.GetIDFromName(this.Name),
            document
        )
    }

    _SetQuestions()
    {
        this.XML.forEach(element => {
            let question;

            switch (element.tagName)
            {
                case "Question":
                    question = Form.NewQuestion(element);
                
                    this.Questions.push(question);
                    break;
                default:
                    break;
            }
        })
    }

    Display()
    {
        this._InitialiseHTML();

        this.HTML = document.getElementById(`${this.ID}`);
    }

    _InitialiseHTML()
    {
        DataManipulator._InitialiseHighHTML(Form, this);
    }

    static GetIDFromName(name)
    {
        return `${name}Form`;
    }

    static NewQuestion(xml)
    {
        
    }
}