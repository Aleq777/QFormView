

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
    }
}