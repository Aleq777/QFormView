

class QuestionRange extends QuestionNumber
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        const id = Form.GetCellID();
        
        let num = Create("span");
        num.innerText = 0;
        
        let range = Create("input");
        range.type = "range";
        range.id = id;
        range.onchange = () => {
            num.innerText = range.value;
        }
        num.innerText = range.value; // Set

        if (this.Min)
            range.min = this.Min;

        if (this.Max)
            range.max = this.Max;

        if (this.Step)
            range.step = this.Step;
        
        this.Cell.appendChild(range);
        this.Cell.appendChild(num);

        this.HTML = range;

        this.Reset();
    }

    Reset()
    {
        super.Reset();
        this.HTML.dispatchEvent(
            new Event("change")
        );
    }
}