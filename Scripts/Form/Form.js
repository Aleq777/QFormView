


class Form extends DataManipulator
{
    static GlobalCellID = 0;

    static UseCellID()
    {
        return Form.GlobalCellID++;
    }

    static GetCellID()
    {
        return `cell${Form.UseCellID()}`;
    }

    Name;
    Title;
    Description;

    Questions;
    Actions;

    constructor (xml)
    {
        super (xml);

        this.ID = Form.GetIDFromName(xml.Attr("Name"));
        this.Name = null;
        this.Title = null;
        this.Description = null;

        this.Questions = [];
        this.Actions = [];

        this._SetBasics();

        this._SetQuestions();

        this._SetActions();
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
            default:
                return new QuestionText(xml);
        }
    }

    _FillForm()
    {

        this.Questions.forEach(question => {
            question.CreateHTML(this.HTML);
            // let q = question.CreateHTML();
            // this.HTML.appendChild(q);
        });
    }

    _SetActions()
    {
        const actions = this.XML.FindTag("Actions");
        
        actions.forEach(item => {

            log(item);

        });
    }

    Submit()
    {

    }

}