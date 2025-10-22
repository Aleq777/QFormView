
const EnumButtonTypes = {
    Action: "Action",
    Submit: "Submit",
    Clear: "Clear",
    Confirm: "Confirm",
    Cancel: "Cancel",

    Edit: "Edit",
    Remove: "Remove"
};

const EnumDefaultActions = {
    // Form
    Submit: function (index, item) {
        const mgr = formManager.GetByName(index);

        if (mgr.Check())
            mgr.Submit();
    },

    Clear: function (index, item) {
        formManager.GetByName(index).Clear();
    },

    Confirm: function (index, item) {
        const mgr = formManager.GetByName(index);

        if (mgr.Check())
            mgr.Confirm();
    },

    Cancel: function (index, item) {
        formManager.GetByName(index).Cancel();
    },
};

class Action
{
    Title;
    Procedure;
    Type;
    XML;
    HTML;

    constructor (xml)
    {
        this.XML = xml;
        this.Type = xml.Attr("Type") ?? EnumButtonTypes.Action;

        let title = xml.textContent.trim();
        this.Title = title.length === 0 ? this.Type : title;

        let action = xml.Attr("Action") ?? EnumDefaultActions[this.Type];
        
        this.Procedure = function (index, item)
        {
            log(eval(action));
            ( eval(action) )(index, item);
        }

        this.HTML = null;
    }

    SetHTML(html)
    {
        this.HTML = html;
    }
}