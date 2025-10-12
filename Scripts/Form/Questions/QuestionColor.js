

class QuestionColor extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let color = Create("input");
        color.type = "color";
        color.id = Form.GetCellID();

        this.Cell.appendChild(color);

        this.HTML = color;

        this.Reset();
    }
}