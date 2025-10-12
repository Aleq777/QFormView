

class QuestionParagraph extends QuestionText
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let textarea = Create("textarea");
        textarea.id = Form.GetCellID();

        this.Cell.appendChild(textarea);

        this.HTML = textarea;

        this.Reset();
    }

    Reset()
    {
        this.HTML.value = this.Default;
    }
}