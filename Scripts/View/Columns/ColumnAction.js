

class ColumnAction extends Column
{
    Actions;

    constructor (xml)
    {
        super (xml);

        this.Actions = [];
        this._SetActions(xml);
    }

    CreateCell(tr, index, item)
    {
        Column._CreateCell(tr, cell => {
            this.Actions.forEach(action => {

                let button = Create("button");
                button.innerText = action.Title;
                button.onclick = function () {
                    log(action.Procedure)
                    action.Procedure(index, item);
                };

                cell.appendChild(button);
                
            });
        });
    }

    _SetActions(xml)
    {
        xml.GetTags("Button").forEach(button => {
            const action = new Action(
                button.textContent.trim(),
                eval(button.Attr("Action"))
            );

            this.Actions.push(action);
        });
    }
}