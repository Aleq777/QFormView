
const EnumQuestionTypes = {
    Text: "Text",
    Range: "Range",
    Radio: "Radio",
    Select: "Select",
    Multi: "Multi",
    Date: "Date",
    Color: "Color",
    Textarea: "Textarea",
    File: "File"
};

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
        // log(this.DataSources)

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
    }

    _SetQuestions()
    {
        this.XML.forEach(element => {
            
            let question = null;
            
            switch (element.tagName)
            {
                case "Question":
                    question = Form.NewQuestion(element);
                    break;
                default:
                    break;
            }

            if (question)
                this.Questions.push(question);
        });
    }

    static NewQuestion(question)
    {
        let type = question.Attr("Type");

        switch (type)
        {

            default:
                return null;
        }
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
        // Dane pojedyncze czy wielokrotne?
        if (this.DataSources.Main)
        {
            this._FillSignleData(this.HTML);
        }
        else
        {
            // log(2)
        }
    }

    _FillSignleData(table)
    {
        const data = this.DataSources.Main;

        data.forEach((item, index) => {
            let tr = Create("tr");

            this.Questions.forEach((question, questionIndex) => {
                log(question);
            });
        });
    }
}