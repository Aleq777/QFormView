

class QuestionText extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let text = Create("input");
        text.type = "text";
        text.id = Form.GetCellID();

        this.Cell.appendChild(text);
    }
}