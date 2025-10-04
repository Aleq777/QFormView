

class ColumnField extends Column
{
    Key;

    constructor (xml)
    {
        super (xml);

        let title = xml.FindTag("Title");
        if (!title)
            this.Title = xml.Attr("Key");

        this.Key = xml.Attr("Key");
    }

    CreateCell(tr, item)
    {
        Column._CreateCell(tr, cell => {
            cell.innerText = item[this.Key];
        });
    }
}