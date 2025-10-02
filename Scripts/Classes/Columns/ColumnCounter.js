

class ColumnCounter extends Column
{
    StartFrom;

    constructor (xml)
    {
        super (xml);

        let startFrom = xml.Attr("StartFrom");

        this.StartFrom = startFrom ? parseInt(startFrom) : 0;
    }

    CreateCell(tr, index)
    {
        Column._CreateCell(tr, cell => {
            cell.innerText = index + this.StartFrom;
        });
    }
}