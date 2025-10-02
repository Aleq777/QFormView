

class Group extends Column
{
    InnerColumns;

    constructor (xml)
    {
        super (xml, "Group");
        this.Title = xml.Attr("Title") ?? "Group";
        this.InnerColumns = [];

        this._SetInnerColumns(xml);
    }

    _SetInnerColumns(xml)
    {
        xml.forEach((column, index) => {
            let col = Table.NewColumn(column);
            // let col = new Column(column);
            this.InnerColumns.push(col);
        });
    }
}