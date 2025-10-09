

class QuestionSelect extends ComplexQuestion
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");
        
        let select = Create("select");
        select.id = Form.GetCellID();

        this.Answers.forEach(answer => {
            
            let option = Create("option");
            option.value = answer.Value;
            option.innerHTML = answer.Content;
            select.appendChild(option);

        });

        td.appendChild(select);

        tr.appendChild(td);

        return tr;
    }
}