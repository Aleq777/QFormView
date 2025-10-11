

class QuestionMultiSelect extends ComplexQuestion
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
        select.multiple = true;

        this.Answers.forEach(answer => {
            
            let option = Create("option");
            option.value = answer.Value;
            option.innerHTML = answer.Content;
            select.appendChild(option);

        });

        this.Cell.appendChild(select);
    }

}