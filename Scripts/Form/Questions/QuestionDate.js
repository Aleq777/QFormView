

class QuestionDate extends Question
{
    Min;
    Max;

    constructor (xml)
    {
        super (xml);
        this.Min = xml.Attr("Min");
        this.Max = xml.Attr("Max");
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let date = Create("input");
        date.type = "date";
        date.id = Form.GetCellID();

        if (this.Min)
            date.min = this.Min;

        if (this.Max)
            date.max = this.Max;

        this.Cell.appendChild(date);
    }
}