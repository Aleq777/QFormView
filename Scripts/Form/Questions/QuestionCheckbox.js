

class QuestionCheckbox extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let checkbox = Create("input");
        checkbox.type = "checkbox";
        checkbox.id = Form.GetCellID();
        
        this.Cell.appendChild(checkbox);

        this.HTML = checkbox;

        this.Reset();
    }

    Check()
    {
        if (!this.CheckIsFilledIfRequired())
            return false;

        return this.HideErrors();
    }

    ShowError(errorType)
    {
        super.ShowBaseError(Question.ErrorMessages, errorType);
    }

    Reset()
    {
        this.HTML.checked = this.Default;
    }

    CheckIsFilledIfRequired()
    {
        if (this.IsRequired && !this.HTML.checked)
        {
            this.ShowBaseError(Question.ErrorMessages, Question.ErrorTypes.FieldRequired);
            return false;
        }

        return true;
    }
}