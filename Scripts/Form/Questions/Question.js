
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

    constructor (xml)
    {
        this.XML = xml;
        this.Title = xml.FindTag("Title").innerHTML;
        this.Description = xml.FindTag("Description")?.innerHTML;
        this.IsRequired = xml.Attr("Required") == "true";
        this.Key = xml.Attr("Key");
        this.Default = xml.Attr("Default");
    }

    CreateHTML()
    {
        return null;
    }

    _GetBaseHTML()
    {
        let tr = Create("tr");

        let th = Create("th");
        th.innerText = this.Title;
        tr.appendChild(th);

        return tr;
    }
}