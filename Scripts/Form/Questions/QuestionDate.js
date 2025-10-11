

class QuestionDate extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let date = Create("input");
        date.type = "date";
        date.id = Form.GetCellID();

        this.Cell.appendChild(date);
    }
}