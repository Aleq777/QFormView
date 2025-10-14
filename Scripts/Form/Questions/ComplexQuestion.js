

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

        let answers = this.XML.FindTag("Answers");

        this.Default = answers ? answers.Attr("Default") : null;

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