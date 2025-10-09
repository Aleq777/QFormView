

class ComplexQuestion extends Question
{
    static GlobalInteractiveName = 0;

    static UseInteractiveName()
    {
        return ComplexQuestion.GlobalInteractiveName++;
    }

    static GetInteractiveName()
    {
        return `interactive${ComplexQuestion.UseInteractiveName()}`;
    }

    Answers;

    constructor (xml)
    {
        super (xml);

        this.Answers = [];
        this.Default = this.XML.FindTag("Answers").Attr("Default");

        this._FillAnswers();
    }

    _FillAnswers()
    {
        this.XML.forEach(tag => {
            if (tag.tagName !== "Answers")
                return;

            tag.forEach(answer => {
                let a = new Answer(answer);

                this.Answers.push(a);
            });
        })
    }
}