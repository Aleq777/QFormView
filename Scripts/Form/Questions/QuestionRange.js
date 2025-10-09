

class QuestionRange extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let range = Create("input");
        range.type = "range";
        range.id = Form.GetCellID();

        td.appendChild(range);

        tr.appendChild(td);

        return tr;
    }
}