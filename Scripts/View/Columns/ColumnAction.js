

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
                button.type = "button";
                button.innerText = action.Title;
                button.onclick = function () {
                    action.Procedure(index, item);
                };

                cell.appendChild(button);

                action.SetHTML(button);
                
            });
        });
    }

    _SetActions(xml)
    {
        xml.GetTags("Button").forEach(button => {

            const action = new Action(
                button
            );

            this.Actions.push(action);
        });
    }
}