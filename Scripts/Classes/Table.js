

class Table
{
    ID;
    XML;
    HTML;
    // Kolumny i Grupy(Kolumn)
    Columns;
    // Płaska lista kolumn
    SerializedColumns;
    // Nazwy do referencji (string, przed eval)
    RawDataSources;
    // Bezpośrednie referencje (po eval)
    DataSources;

    // Identyfikator dla komórki, żeby ID było zawsze wyjątkowe
    static GlobalCellID = 0;

    constructor (xml)
    {
        this.XML = xml;
        this.Columns = [];
        this.RawDataSources = { };
        this.DataSources = { };
        this.HTML = null;

        this.Initialise();
    }

    Initialise()
    {
        this._SetDataSources();
        this._SetColumns(this.XML);
    }

    _SetDataSources()
    {
        const data = this.XML.FindTag("Data");

        if (!data)
            return;

        const sources = data.GetTags("Source");

        switch (sources.length)
        {
            case 0:

                break;
            case 1:
                this._SetSingleSource(sources[0]);
                break;
            default:
                sources.forEach(source => {
                    this._SetSource(source)
                });
                break;
        }
    }

    _SetSingleSource(source)
    {
        const value = source.innerHTML.trim();
        this.RawDataSources.Main = value;
        this.DataSources.Main = eval(value);
    }

    _SetSource(source)
    {
        const alias = source.Attr("Alias");
        const value = source.innerHTML.trim();
        this.RawDataSources[alias] = value;
        this.DataSources[alias] = eval(value);
    }

    _SetColumns(xml)
    {
        xml.forEach(element => {
            let column = null;

            switch (element.tagName)
            {
                case "Column":
                    column = new Column(element);
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

    _SerializeColumns(columnList)
    {
        this.SerializedColumns = [];

        columnList.forEach(column => {
            if (column.Type === "Group")
                this._SerializeColumns(column.InnerColumns);
            else
                this.SerializedColumns.push(column);
        });
    }

    Display(id, sourceHTML)
    {
        this.HTML = sourceHTML.querySelector(`#${id}`);

        this._CreateGroups();

        this._CreateColumns(this.Columns);

        this._FillData();
    }

    _CreateGroups()
    {
        let groupCreated = false;
        let group;

        this.Columns.forEach((column, index) => {

            if (column.Type !== "Group")
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

    _FillData()
    {
        // Dane są pojedyncze czy wielokrotne?
        if (this.DataSources.Main)
        {
            this._FillSingleData(this.HTML);
        }
        else
        {
            // log(2);
        }
    }

    _FillSingleData(table)
    {
        const data = this.DataSources.Main;

        data.forEach((item, index) => {
            let tr = Create("tr");

            this.SerializedColumns.forEach((column, columnIndex) => {
                switch (column.Type)
                {
                    case EnumColumnTypes.Counter:
                        Table._CreateCellCounter(tr, column, index);
                        break;
                    case EnumColumnTypes.Active:
                        Table._CreateCellActive(tr, item, index);
                        break;
                    case EnumColumnTypes.Field:
                        Table._CreateCellField(tr, item, column);
                        break;
                    case EnumColumnTypes.Action:
                        Table._CreateCellAction(tr, column, index, item);
                        break;
                    case EnumColumnTypes.Custom:
                        Table._CreateCellCustom(tr, column, item, this.RawDataSources.Main, index);
                        break;
                    default:
                        break;
                }
            });

            table.appendChild(tr);
        });
    }

    static _CreateCell(tr, func)
    {
        let cell = Create("td");
        func(cell);
        tr.appendChild(cell);
    }

    static _CreateCellCounter(tr, column, index)
    {
        Table._CreateCell(tr, cell => {
            cell.innerText = index + column.StartFrom;
        });
    }

    static _CreateCellActive(tr, item, index)
    {
        Table._CreateCell(tr, cell => {
            let deactivator = Create("input");
            deactivator.id = `deactivator_${index}`;
            deactivator.type = "checkbox";

            deactivator.onchange = element => {
                item.Active = element.target.checked;
            };

            cell.appendChild(deactivator);

        });
    }

    static _CreateCellField(tr, item, column)
    {
        Table._CreateCell(tr, cell => {

            cell.innerText = item[column.Key];

        });
    }

    static _CreateCellAction(tr, column, index, item)
    {
        Table._CreateCell(tr, cell => {
            column.Actions.forEach(action => {
                
                let button = Create("button");
                button.innerText = action.Title;
                button.onclick = () => {
                    action.Procedure(index, item);
                };

                cell.appendChild(button);

            });
        });
    }

    static _CreateCellCustom(tr, column, item, dataSource, index)
    {
        Table._CreateCell(tr, cell => {
            const each = column.XML.FindTag("Each");
            cell.innerHTML = Table._DecodeEach(item, column, each, dataSource, index, cell);
        });
    }

    static _DecodeEach(data, column, each, dataSource, index, cell)
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
            // log(each.FindTag("Table"));
            content = each.innerHTML.trim();

            decode((content, key, value) => {
                const k = `${dataSource}[${index}].${value}`;
                // log(k);
                return content.replaceAll(key, k);
            });

            let parser = new DOMParser();
            content = parser.parseFromString(content, "application/xml");
            content = content.FindTag("Table");
            // log(content.getElementsByTagName("Table")[0]);
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