

class QuestionCheckbox extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let checkbox = Create("input");
        checkbox.type = "checkbox";
        checkbox.id = Form.GetCellID();
        
        td.appendChild(checkbox);

        tr.appendChild(td);

        return tr;
    }
}