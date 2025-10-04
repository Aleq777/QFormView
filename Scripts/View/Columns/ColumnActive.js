

class ColumnActive extends Column
{
    constructor (xml)
    {
        super (xml);
    }

    CreateCell(tr, item, index)
    {
        Column._CreateCell(tr, cell => {
            
            let deactivator = Create("input");
            deactivator.id = `deactivator_${index}`;
            deactivator.type = "checkbox";

            deactivator.onchange = element => {
                item.Active = !element.target.checked;
            };

            cell.appendChild(deactivator);

        });
    }
}