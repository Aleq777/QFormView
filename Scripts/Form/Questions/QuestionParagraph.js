

class QuestionParagraph extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        let textarea = Create("textarea");
        textarea.id = Form.GetCellID();

        td.appendChild(textarea);

        tr.appendChild(td);

        return tr;
    }
}