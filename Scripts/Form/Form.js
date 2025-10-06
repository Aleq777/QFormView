

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
            case EnumQuestionTypes.Text:
                return new QuestionText(question);
            case EnumQuestionTypes.Number:
                return new QuestionNumber(question);
            case EnumQuestionTypes.Password:
                return new QuestionPassword(question);
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