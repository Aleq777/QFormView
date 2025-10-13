

class QuestionText extends Question
{
    MinLength;
    MaxLength;

    constructor (xml)
    {
        super (xml);

        this.MinLength = xml.Attr("MinLength");
        this.MaxLength = xml.Attr("MaxLength");
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let text = Create("input");
        text.type = "text";
        text.id = Form.GetCellID();
        
        if (this.MinLength)
            text.minLength = this.MinLength;

        if (this.MaxLength)
            text.maxLength = this.MaxLength;

        this.Cell.appendChild(text);

        this.HTML = text;

        this.Reset();
    }

    static ErrorTypes = {
        TooShortText: "TooShortText",
        TooLongText: "TooLongText",
    };

    static ErrorMessages = {
        TooShortText: data => `Minimalna długość tekstu to ${data.MinLength}`,
        TooLongText: data => `Maksymalna długość tekstu to ${data.MaxLenght}`,
    };

    Check()
    {

        if (!this.CheckIsFilledIfRequired())
            return false;

        // Required -> check if its good
        // not Required -> if its given value, it should be at least correct
        const length = this.GetValue().length;

        if (length > 0)
        {
            if (CompareLess(length, this.MinLength))
                return this.ShowError(QuestionText.ErrorTypes.TooShortText);

            if (CompareBigger(length, this.MaxLength))
                return this.ShowError(QuestionText.ErrorTypes.TooLongText);
        }

        return this.HideErrors();
    }

    ShowError(errorType)
    {
        super.ShowBaseError(QuestionText.ErrorMessages, errorType);
    }
}