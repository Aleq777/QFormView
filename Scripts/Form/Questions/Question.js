
const EnumQuestionTypes = {
    Text: "Text",
    Paragraph: "Paragraph",
    Number: "Number",
    Range: "Range",
    Radio: "Radio",
    Checkbox: "Checkbox",
    Select: "Select",
    MultiSelect: "MultiSelect",
    ObjectSelect: "ObjectSelect",
    ObjectMultiSelect: "ObjectMultiSelect",
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
    // Cell in the table
    Cell;
    // Is the answer wrong?
    ErrorType;
    // Error Cell to display
    ErrorCell;

    // Possible errors
    static ErrorFeed = { };

    constructor (xml)
    {
        this.XML = xml;
        this.Title = xml.FindTag("Title").innerHTML;
        this.Description = xml.FindTag("Description")?.innerHTML;
        this.IsRequired = xml.Attr("Required") == "true";
        this.Key = xml.Attr("Key");
        this.Default = xml.Attr("Default");
        this.Cell = null;
        this.ErrorType = null;
        this.ErrorID = null;
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

    CheckErrorType()
    {
        this.ErrorType = null;
    }

    ReloadError()
    {
        if (this.ErrorType === null)
        {
            this.ErrorCell.hidden = true;
        }
        else
        {
            this.ErrorCell.innerHTML = Question.ErrorFeed[this.ErrorType];
            this.ErrorCell.hidden = false;
        }
    }

    // abstract
    Reset()
    { }

}