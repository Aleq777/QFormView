

class QuestionText extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let text = Create("input");
        text.type = "text";
        text.id = Form.GetCellID();

        td.appendChild(text);

        tr.appendChild(td);

        return tr;
    }
}