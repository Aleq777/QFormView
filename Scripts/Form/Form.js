


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
    ConnectedView;
    // null - not
    // object - yes its editing
    Editing;

    constructor (xml)
    {
        super (xml);

        this.ID = Form.GetIDFromName(xml.Attr("Name"));
        this.Name = null;
        this.Title = null;
        this.Description = null;
        this.Editing = null;

        this.Questions = [];
        this.Actions = [];

        this.ConnectedView = xml.Attr("ConnectedView");

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
        );
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
        });
    }

    Display()
    {
        this._InitialiseHTML();

        this.HTML = document.getElementById(`${this.ID}`);

        this._InitialiseButtons();

        this._FillForm();
    }

    _InitialiseHTML()
    {
        DataManipulator._InitialiseHighHTML(Form, this);
    }

    _InitialiseButtons()
    {
        this.Actions.forEach(item => {
            let button = Create("button");
            button.type = "button";
            button.innerHTML = item.Title;
            button.onclick = () => {
                item.Procedure(this);
            };

            Find(this.Name).FindTag("fieldset").appendChild(button);
        });
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

            case EnumQuestionTypes.Paragraph:
                return new QuestionParagraph(xml);

            case EnumQuestionTypes.Radio:
                return new QuestionRadio(xml);

            case EnumQuestionTypes.Range:
                return new QuestionRange(xml);

            case EnumQuestionTypes.Select:
                return new QuestionSelect(xml);

            case EnumQuestionTypes.Object:
                return new QuestionObject(xml);

            case EnumQuestionTypes.MultiObject:
                return new QuestionMultiObject(xml);

            case EnumQuestionTypes.Text:
            default:
                return new QuestionText(xml);
        }
    }

    _FillForm()
    {
        this.Questions.forEach(question => {
            question.CreateHTML(this.HTML);
        });
    }

    _SetActions()
    {
        const actions = this.XML.FindTag("Actions");
        
        actions.forEach(item => {

            let action = this.NewAction(item);

            this.Actions.push(action);

        });
    }

    NewAction(action)
    {
        let title = action.Attr("Title");
        let procedure;
        const type = action.Attr("Type");
        const formInstance = this;

        switch (type)
        {
            case EnumButtonTypes.Clear:
                title ??= "Resetuj";
                return new Action(title, function () {
                    formInstance.Clear();
                }, "Reset");
                
            case EnumButtonTypes.Submit:
                title ??= "Dodaj";
                return new Action(title, function () {
                    if (formInstance.Check())
                        formInstance.Submit();
                }, "Submit");

            case EnumButtonTypes.Action:
            default:
                title ??= "Akcja";
                procedure = eval(action.Attr("Action"));
                return new Action(title, function (data) {
                    if (formInstance.Check())
                        procedure(data)

                }, "Action");
        }
    }

    Submit()
    {
        if (!this.Check())
            return;

        let result = { };

        this.Questions.forEach(question => {
            result[question.Key] = question.GetValue();
        });

        this.DataSource.push(result);

        if (this.ConnectedView)
            viewManager.GetByName(this.ConnectedView).Reload();
    }

    Clear()
    {
        this.Questions.forEach(question => {
            question.Reset();
        });
    }

    Check()
    {
        let isCorrect = true;

        this.Questions.forEach(question => {
            isCorrect &&= question.Check(); // must be all true
        });

        return isCorrect;
    }

    GetQuestionByKey(key)
    {
        let result = null;

        this.Questions.forEach(question => {
            if (result === null && question.Key === key)
                result = question;
        });

        return result;
    }

    GetActionByTag(tag)
    {
        let result = null;

        this.Actions.forEach(action => {
            if (result === null && action.Tag === tag)
            {
                result = action;
            }
        });

        return action;
    }

    Edit(index)
    {
        this.Editing = eval(this.RawDataSource)[index];

        Object.entries(this.Editing).forEach(entry => {
            const [key, value] = entry;

            let question = this.GetQuestionByKey(key);

            if (!question)
                return;
            
            question.HTML.value = value;
        });
    }

}