

class QuestionNumber extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let num = Create("input");
        num.type = "number";
        num.id = Form.GetCellID();

        td.appendChild(num);

        tr.appendChild(td);

        return tr;
    }
}