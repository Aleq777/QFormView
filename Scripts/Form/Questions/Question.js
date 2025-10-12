
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
    HTML;
    // Cell in the table
    Cell;
    // The cell of the Error
    ErrorCell;

    // Possible errors
    static ErrorFeed = { };

    constructor (xml)
    {
        this.XML = xml;
        this.HTML = null;
        this.Title = xml.FindTag("Title").innerHTML;
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
    Reset()
    {
        this.HTML.value = this.Default;
    }

    Check()
    {
        return true;
    }

    ShowError(errorType)
    {
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