

class QuestionCheckbox extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let checkbox = Create("input");
        checkbox.type = "checkbox";
        checkbox.id = Form.GetCellID();
        
        this.Cell.appendChild(checkbox);

        this.HTML = checkbox;
    }

    Reset()
    {
        this.HTML.checked = this.Default;
    }
}