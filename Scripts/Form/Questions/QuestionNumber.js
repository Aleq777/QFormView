

class QuestionNumber extends Question
{
    Min;
    Max;
    Step;

    constructor (xml)
    {
        super (xml);
        this.Min = xml.Attr("Min");
        this.Max = xml.Attr("Max");
        this.Step = xml.Attr("Step");
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let num = Create("input");
        num.type = "number";
        num.id = Form.GetCellID();

        if (this.Min)
            num.min = this.Min;

        if (this.Max)
            num.max = this.Max;

        if (this.Step)
            num.step = this.Step;

        this.Cell.appendChild(num);
    }
}