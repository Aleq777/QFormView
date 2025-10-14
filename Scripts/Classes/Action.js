
const EnumButtonTypes = {
    Action: "Action",
    Submit: "Submit",
    Clear: "Clear"
};

class Action
{
    Title;
    Procedure;
    Tag;

    constructor (title, procedure, tag)
    {
        this.Title = title;
        this.Procedure = procedure;
        this.Tag = tag;
    }
}