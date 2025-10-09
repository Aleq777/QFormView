

class QuestionRadio extends ComplexQuestion
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML()
    {
        let tr = this._GetBaseHTML();

        let td = Create("td");

        const name = ComplexQuestion.GetInteractiveName();
        
        this.Answers.forEach(answer => {


            let label = Create("label");

            let input = Create("input");
            input.type = "radio";
            input.id = Form.GetCellID();
            input.name = name;
            input.value = answer.Value;
            input.checked = this.Default === answer.Value;
            label.appendChild(input);

            let title = Create("span");
            title.innerHTML = answer.Content;
            label.appendChild(title);

            td.appendChild(label);

        });

        tr.appendChild(td);

        return tr;
    }

    
}