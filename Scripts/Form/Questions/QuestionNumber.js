

class QuestionNumber extends Question
{
    Min;
    Max;
    Step;

    constructor (xml)
    {
        super (xml);
        this.Min = xml.Attr("Min");
        this.Max = xml.Attr("Max");
        this.Step = xml.Attr("Step");
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let num = Create("input");
        num.type = "number";
        num.id = Form.GetCellID();

        if (this.Min)
            num.min = this.Min;

        if (this.Max)
            num.max = this.Max;

        if (this.Step)
            num.step = this.Step;

        this.Cell.appendChild(num);

        this.HTML = num;

        this.Reset();
    }

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
            return this.ShowError(QuestionDate.ErrorTypes.TooHigh);

        return this.HideErrors();
    }

    ShowError(errorType)
    {
        super.ShowBaseError(QuestionNumber.ErrorMessages, errorType, this);
    }
}