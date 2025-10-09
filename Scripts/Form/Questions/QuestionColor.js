

class QuestionColor extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let color = Create("input");
        color.type = "color";
        color.id = Form.GetCellID();

        td.appendChild(color);

        tr.appendChild(td);

        return tr;
    }
}