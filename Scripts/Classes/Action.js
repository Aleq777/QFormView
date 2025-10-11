
const EnumButtonTypes = {
    Action: "Action",
    Submit: "Submit",
    Clear: "Clear"
};

class Action
{
    Title;
    Procedure;

    constructor (title, procedure)
    {
        this.Title = title;
        this.Procedure = procedure;
    }
}