
const EnumColumnTypes = {
    Custom: "Custom",
    Field: "Field",
    Action: "Action",
    Active: "Active",
    Counter: "Counter"
};

class Column
{
    Type;
    Title;
    XML;
    // Type = Counter
    StartFrom;
    // Type = Field
    Key;
    // Type = Action
    Actions;
    // Type = Custom
    Aliases;

    constructor (xml, overrideType = null)
    {
        this.XML = xml;
        if (overrideType)
            this.Type = overrideType;
        else
            this.Type = xml.Attr("Type") ?? EnumColumnTypes.Custom;
        
        let title = xml.FindTag("Title");
        if (title)
            this.Title = xml.FindTag("Title").innerHTML.trim();
        else if (this.Type === EnumColumnTypes.Field)
            this.Title = xml.Attr("Key");
        else
            this.Title = this.Type;

        this.StartFrom = null;
        
        switch (this.Type)
        {
            case EnumColumnTypes.Counter:
                let startFrom = xml.Attr("StartFrom");
                if (startFrom)
                    this.StartFrom = parseInt(startFrom);
                else
                    this.StartFrom = 0;
                break;
            case EnumColumnTypes.Field:
                this.Key = xml.Attr("Key");
                break;
            case EnumColumnTypes.Action:
                this.Actions = [];
                xml.GetTags("Button").forEach(button => {
                    const action = new Action(
                        button.textContent.trim(),
                        eval(button.Attr("Action"))
                    );

                    this.Actions.push(action);
                });
                break;
            case EnumColumnTypes.Custom:
                this._SetAliases(xml);
                break;
            default:
                break;
        }
    }

    _SetAliases(xml)
    {
        const each = xml.FindTag("Each");
        const prompt = each.Attr("Using");
        const hardSpaces = each.Attr("HardSpaces") === "true";
        let result = { };

        let key = "",
            value = "";
        let afterSetter = false;

        for (let i = 0; i < prompt.length; i++)
        {
            if (!hardSpaces && prompt[i] === ' ')
                continue;

            if (prompt[i] === '=')
            {
                afterSetter = true;
                key = key.trim();
                result[key] = "";
            }
            else if (prompt[i] === ',')
            {
                if (key.length === 0)
                    continue;
                
                result[key] = value.trim();
                value = "";
                key = "";
                afterSetter = false;
            }
            else if (afterSetter)
                value += prompt[i];
            else
                key += prompt[i];
        }

        if (value.length > 0)
            result[key] = value.trim();

        this.Aliases = result;
    }
}