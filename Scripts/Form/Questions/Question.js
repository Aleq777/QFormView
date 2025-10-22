
const EnumQuestionTypes = {
    Text: "Text",
    Paragraph: "Paragraph",
    Number: "Number",
    Range: "Range",
    Radio: "Radio",
    Checkbox: "Checkbox",
    Select: "Select",
    MultiSelect: "MultiSelect",
    Object: "Object",
    MultiObject: "MultiObject",
    Date: "Date",
    File: "File",
    Color: "Color",
}

class Question
{
    Title;
    Description;
    IsRequired;
    Key;
    Default;
    XML;
    HTML;
    // Cell in the table
    Cell;
    // The cell of the Error
    ErrorCell;

    // Possible errors
    static ErrorTypes = {
        FieldRequired: "FieldRequired",
        UnknownError: "UnknownError",
    }

    static ErrorMessages = {
        FieldRequired: () => `To pole jest wymagane!`,
        UnknownError: data => {
            log(data);
            return `Nieznany błąd! W konsoli szczegóły`;
        },
    };

    constructor (xml)
    {
        this.XML = xml;
        this.HTML = null;
        this.Title = xml.FindTag("Title")?.innerHTML;
        this.Description = xml.FindTag("Description")?.innerHTML;
        this.IsRequired = xml.Attr("Required") == "true";
        this.Key = xml.Attr("Key");
        this.Default = xml.Attr("Default");
        this.Cell = null;
        this.ErrorCell = null;
    }

    CreateHTML()
    {
        return null;
    }

    _SetBaseHTML(obj)
    {
        let tr = Create("tr");

        let th = Create("th");
        th.innerText = this.Title;
        tr.appendChild(th);

        let td = Create("td");
        tr.appendChild(td);
        this.Cell = td;

        let error = Create("td");
        error.hidden = true;
        tr.appendChild(error);
        this.ErrorCell = error;

        obj.appendChild(tr);
    }

    // abstract
    GetValue()
    {
        return this.HTML.value;
    }

    // abstract
    Reset()
    {
        this.HTML.value = this.Default;
    }

    Check()
    {
        return true;
    }

    CheckIsFilledIfRequired()
    {
        const result = !this.IsRequired || this.GetValue().length > 0;

        if (result)
            return true;
        
        this.ShowBaseError(Question.ErrorMessages, Question.ErrorTypes.FieldRequired);
        return false;
    }

    // abstract
    ShowError(errorType)
    {
        return false;
    }

    ShowBaseError(errorFeed, errorType, data)
    {
        let errorMsg;

        switch (errorType)
        {
            case Question.ErrorTypes.FieldRequired:
                errorMsg = Question.ErrorMessages.FieldRequired(data);
                break;
            case Question.ErrorTypes.UnknownError:
                errorMsg = Question.ErrorMessages.UnknownError(data);
                break;
            default:
                errorMsg = errorFeed[errorType](data);
                break;
        }

        this.ErrorCell.innerHTML = errorMsg;
        this.ErrorCell.hidden = false;
        return false;
    }

    HideErrors()
    {
        this.ErrorCell.hidden = true;
        return true;
    }

    _ActivateError(content)
    {
        const obj = this.ErrorCell;
        obj.innerHTML = content;
        obj.hidden = false;
    }

    _DeactivateError()
    {
        this.ErrorCell.hidden = true;
    }
}