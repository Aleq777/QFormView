

class Question
{
    XML;
    Title;
    Key;
    IsRequired;
    PossibleAnswers;

    constructor (xml)
    {
        this.XML = xml;

        this.Title = xml.FindTag("Title");
        this.Key = xml.Attr("Key");
        this.IsRequired = xml.Attr("Required") == "true";

        this.PossibleAnswers = [];

        this._GetPossibleAnswers();
    }

    _GetPossibleAnswers()
    {

    }
}