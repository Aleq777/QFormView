

class QuestionFile extends Question
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        let file = Create("input");
        file.type = "file";
        file.id = Form.GetCellID();

        this.Cell.appendChild(file);
    }
}