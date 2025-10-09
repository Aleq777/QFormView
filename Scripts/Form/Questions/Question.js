
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

    constructor (xml)
    {
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
}