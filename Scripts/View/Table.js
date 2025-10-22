

class Table extends DataManipulator
{
    // Identyfikator dla komórki, żeby ID było zawsze wyjątkowe
    static GlobalCellID = 0;

    Columns;
    SerializedColumns;

    constructor (xml)
    {
        super (xml);

        this.Columns = [];
        this.SerializedColumns = null;
        
        this._SetColumns(this.XML);
    }

    _SetColumns(xml)
    {
        xml.forEach(element => {
            let column = null;

            switch (element.tagName)
            {
                case "Column":
                    column = Table.NewColumn(element);
                    break;
                case "Group":
                    column = new Group(element);
                    break;
                default:
                    break;
            }

            if (column)
                this.Columns.push(column);
        })

        this._SerializeColumns(this.Columns);
    }

    static NewColumn(column)
    {
        let type = column.Attr("Type") ?? EnumColumnTypes.Field;

        switch (type)
        {
            case EnumColumnTypes.Counter:
                return new ColumnCounter(column);
            case EnumColumnTypes.Active:
                return new ColumnActive(column);
            case EnumColumnTypes.Field:
                return new ColumnField(column);
            case EnumColumnTypes.Action:
                return new ColumnAction(column);
            case EnumColumnTypes.Custom:
                return new ColumnCustom(column);
            default:
                return null;
        }
    }

    _SerializeColumns(columnList)
    {
        this.SerializedColumns = [];

        columnList.forEach(column => {
            if (column instanceof Group)
                this._SerializeColumns(column.InnerColumns);
            else
                this.SerializedColumns.push(column);
        });
    }

    Display(id, sourceHTML)
    {
        this.HTML = sourceHTML.querySelector(`#${id}`);

        // Reload
        this.HTML.innerHTML = ``;

        this._CreateGroups();

        this._CreateColumns(this.Columns);

        this._FillSingleData(this.HTML);
    }

    _CreateGroups()
    {
        let groupCreated = false;
        let group;

        this.Columns.forEach(column => {

            if (!(column instanceof Group))
                return;

            if (!groupCreated)
            {
                group = Create("tr");
                groupCreated = true;
            }

            let th = Create("th");
            th.colSpan = column.InnerColumns.length;
            th.innerHTML = column.Title;
            group.appendChild(th);
        });

        if (groupCreated)
            this.HTML.appendChild(group);
    }

    _CreateColumns()
    {
        this.SerializedColumns.forEach(column => {
            let th = Create("th");
            th.innerHTML = column.Title;
            this.HTML.appendChild(th);
        });
    }

    _FillSingleData(table)
    {
        const d = eval(this.RawDataSource);

        d.forEach((item, index) => {
            let tr = Create("tr");

            this.SerializedColumns.forEach(column => {

                if (column instanceof ColumnAction)
                {
                    column.CreateCell(tr, index, item)
                }
                else if (column instanceof ColumnActive)
                {
                    column.CreateCell(tr, item, index)
                }
                else if (column instanceof ColumnCounter)
                {
                    column.CreateCell(tr, index)
                }
                else if (column instanceof ColumnCustom)
                {
                    column.CreateCell(tr, item, this.RawDataSource, index)
                }
                else if (column instanceof ColumnField)
                {
                    column.CreateCell(tr, item);
                }
                else
                {

                }
            });

            table.appendChild(tr);
        });
    }

    static _DecodeEach(data, column, each, dataSource, index)
    {
        let content = null;

        function decode(resultFunc)
        {
            if (column.Aliases)
            {
                Object.entries(column.Aliases).forEach(entry => {
                    const [key, value] = entry;
    
                    content = resultFunc(content, key, value);
                });        
            }
        }

        // As Table
        if (each.Has("Table"))
        {
            content = each.innerHTML.trim();

            decode((content, key, value) => {
                const k = `${dataSource}[${index}].${value}`;
                return content.replaceAll(key, k);
            });

            let parser = new DOMParser();
            content = parser.parseFromString(content, "application/xml");
            content = content.FindTag("Table");

            const table = new Table(content);

            let div = Create("div");
            let id = `ViewTable${Table.GlobalCellID++}`;
            div.innerHTML = `<table id="${id}"></table>`
            table.Display(id, div);
            return div.innerHTML;
        }
        // As HTML
        else
        {
            content = each.innerHTML.trim();
            decode((content, key, value) => {
                return content.replaceAll(key, data[value]);
            });

            return content;
        }
    }
}