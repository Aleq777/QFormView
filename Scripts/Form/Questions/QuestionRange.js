

class QuestionText extends Question
{
    Min;
    Max;

    constructor (xml)
    {
        super (xml);

        this.Min = xml.Attr("Min");
        this.Max = xml.Attr("Max");
    }
}