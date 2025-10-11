

class QuestionRange extends Question
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
        
        this.Cell.appendChild(range);
        this.Cell.appendChild(num);
    }
}