

class QuestionDate extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let date = Create("input");
        date.type = "date";
        date.id = Form.GetCellID();

        td.appendChild(date);

        tr.appendChild(td);

        return tr;
    }
}