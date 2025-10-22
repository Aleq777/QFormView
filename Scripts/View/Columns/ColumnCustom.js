

class ColumnCustom extends Column
{
    Aliases;

    constructor (xml)
    {
        super (xml);

        this._SetAliases(xml);
    }

    CreateCell(tr, item, dataSource, index)
    {
        Column._CreateCell(tr, cell => {
            const each = this.XML.FindTag("Each");
            cell.innerHTML = Table._DecodeEach(item, this, each, dataSource, index);
        });
    }

    _SetAliases(xml)
    {
        const each = xml.FindTag("Each");
        const prompt = each.Attr("Using")?.trim();
        const hardSpaces = each.Attr("HardSpaces") === "true";
        let result = { };

        let key = "",
            value = "";
        let afterSetter = false;

        if (!prompt)
            return;

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