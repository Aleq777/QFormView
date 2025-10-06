const EnumQuestionTypes = {
    Text:       "Text",
    Number:     "Number",
    Password:   "Password",
    Range:      "Range",
    Radio:      "Radio",
    Select:     "Select",
    Multi:      "Multi",
    Date:       "Date",
    Color:      "Color",
    Textarea:   "Textarea",
    File:       "File"
};

class Question
{
    XML;
    Title;
    Key;
    IsRequired;
    PossibleAnswers;
    DefaultValue;

    constructor (xml)
    {
        this.XML = xml;

        this.Title = xml.FindTag("Title");
        this.Key = xml.Attr("Key");
        this.IsRequired = xml.Attr("Required") == "true";
        this.DefaultValue = xml.Attr("Default");

        this.PossibleAnswers = [];

        this._GetPossibleAnswers();
    }

    _GetPossibleAnswers()
    {

    }
}