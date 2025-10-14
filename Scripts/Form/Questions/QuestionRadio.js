

class QuestionRadio extends ComplexQuestion
{
    constructor (xml)
    {
        super (xml);
    }

    CreateHTML(obj)
    {
        this._SetBaseHTML(obj);

        const name = ComplexQuestion.GetInteractiveName();

        this.HTML = { };
        
        this.Answers.forEach(answer => {

            let label = Create("label");
            label.style.display = "inline-block";

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

            this.Cell.appendChild(label);

            this.HTML[answer.Value] = input;

        });

        this.Reset();
    }

    Reset()
    {
        Object.entries(this.HTML).forEach(entry => {
            const [key, value] = entry;
            
            value.checked = false;
            if (key === this.Default)
                value.checked = true;
        });
    }

    GetValue()
    {
        let result = null;

        Object.entries(this.HTML).forEach(entry => {
            const [k, input] = entry;

            if (result === null && input.checked)
                result = input.value;
        });

        return result;
    }
    
}