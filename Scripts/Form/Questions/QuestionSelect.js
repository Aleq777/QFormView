

class QuestionSelect extends ComplexQuestion
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);
        
        let select = Create("select");
        select.id = Form.GetCellID();

        this.Answers.forEach(answer => {
            
            let option = Create("option");
            option.value = answer.Value;
            option.innerHTML = answer.Content;
            select.appendChild(option);

        });

        this.Cell.appendChild(select);

        this.HTML = select;

        this.Reset();
    }

    Check()
    {
        if (!this.CheckIsFilledIfRequired())
            return false;

        return this.HideErrors();
    }
}