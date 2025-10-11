

class QuestionNumber extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let num = Create("input");
        num.type = "number";
        num.id = Form.GetCellID();

        this.Cell.appendChild(num);
    }
}