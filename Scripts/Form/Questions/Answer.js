

class Answer
{
    XML;
    Value;
    Content;

    constructor (xml)
    {
        this.XML = xml;
        this.Value = xml.Attr("Value");
        this.Content = xml.innerHTML.trim();
    }
}