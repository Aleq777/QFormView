

class QuestionFile extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let file = Create("input");
        file.type = "file";
        file.id = Form.GetCellID();

        td.appendChild(file);

        tr.appendChild(td);

        return tr;
    }
}