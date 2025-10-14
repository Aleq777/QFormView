

class QuestionMultiObject extends QuestionObject
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

        this.Answers.forEach((answer, index) => {

            let option = Create("option");
            option.value = index;
            option.innerHTML = answer[this.KeyLabel];
            select.appendChild(option);

        });

        this.Cell.appendChild(select);

        this.HTML = select;

        this.Reset();
    }

    _FillAnswers()
    {
        this.Answers = eval(this.XML.Attr("Source"));
    }

    GetValue()
    {
        return this.GetSelectedValues(this.HTML);
    }

    GetSelectedValues(multiObject)
    {
        let result = [];

        multiObject.forEach(option => {
            switch (option.tagName.toLowerCase())
            {
                case "option":
                    if (option.selected)
                        result.push(this.Answers[option.value]);
                    break;
                case "optgroup":
                    let innerOptions = this.GetSelectedValues(option);

                    innerOptions.forEach(item => {
                        result.push(item);
                    });
                    break;
                default:
                    break;
            }
        });

        return result;
    }
}