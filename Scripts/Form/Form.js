


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

        this.ID = Form.GetIDFromName(xml.Attr("Name"));
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
        this.HTML = document.getElementById(`${this.ID}`);
        
        this._InitialiseHTML();

        this._FillForm();
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
        switch (xml.Attr("Type"))
        {
            case EnumQuestionTypes.Text:
                return new QuestionText(xml);

            case EnumQuestionTypes.Checkbox:
                return new QuestionCheckbox(xml);

            case EnumQuestionTypes.Color:
                return new QuestionColor(xml);

            case EnumQuestionTypes.Date:
                return new QuestionDate(xml);

            case EnumQuestionTypes.File:
                return new QuestionFile(xml);

            case EnumQuestionTypes.MultiSelect:
                return new QuestionMultiSelect(xml);

            case EnumQuestionTypes.Number:
                return new QuestionNumber(xml);

            case EnumQuestionTypes.ObjectMultiSelect:
                return new QuestionMultiSelect(xml);

            case EnumQuestionTypes.ObjectSelect:
                return new QuestionObjectSelect(xml);

            case EnumQuestionTypes.Paragraph:
                return new QuestionParagraph(xml);

            case EnumQuestionTypes.Radio:
                return new QuestionRadio(xml);

            case EnumQuestionTypes.Range:
                return new QuestionRange(xml);

            case EnumQuestionTypes.Select:
                return new QuestionSelect(xml);

            case EnumQuestionTypes.Text:
                return new QuestionText(xml);

            default:
                return null;
        }
    }

    _FillForm()
    {

        this.Questions.forEach(question => {
            let q = question.CreateHTML();
            this.HTML.appendChild(q);
        });
    }

}