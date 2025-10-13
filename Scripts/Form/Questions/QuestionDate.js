

class QuestionDate extends Question
{
    Min;
    Max;

    constructor (xml)
    {
        super (xml);
        this.Min = xml.Attr("Min");
        this.Max = xml.Attr("Max");
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let date = Create("input");
        date.type = "date";
        date.id = Form.GetCellID();

        if (this.Min)
            date.min = this.Min;

        if (this.Max)
            date.max = this.Max;

        this.Cell.appendChild(date);

        this.HTML = date;

        this.Reset();
    }

    static ErrorTypes = {
        TooLow: "TooLow",
        TooHigh: "TooHigh"
    };

    static ErrorMessages = {
        TooLow: required => `Wartość minimalna to ${required}`,
        TooHigh: required => `Wartość maksymalna to ${required}`
    };

    Check()
    {
        if (!this.CheckIsFilledIfRequired())
            return false;

        const value = this.HTML.value;

        const min = this.Min ?? value;

        if (value < min)
            return this.ShowError(QuestionDate.ErrorTypes.TooLow);

        const max = this.Max ?? value;

        if (value > max)
            return this.ShowError(QuestionDate.ErrorTypes.TooHigh)

        return this.HideErrors();
    }

    ShowError(errorType)
    {
        let value;

        switch (errorType)
        {
            case QuestionDate.ErrorTypes.TooLow:
                value = this.Min;
                break;
            case QuestionDate.ErrorTypes.TooHigh:
                value = this.Max;
                break;
            default:
                value = null;
                break;
        }

        this._ActivateError(QuestionDate.ErrorMessages[errorType](value));
                    
        return super.ShowError(errorType);
    }
}