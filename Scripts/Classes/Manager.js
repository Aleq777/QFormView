

class Manager
{
    DocumentXML;
    Instances;

    constructor ()
    {
        this.DocumentXML = null;
        this.Instances = [];
    }

    // abstract
    Start(sourceID)
    {
        const parser = new DOMParser();

        this.DocumentXML = parser.parseFromString(
            Find(sourceID).innerHTML, "application/xml"
        );

        this._InitializeInstances();
    }

    _InitializeInstances(tagName, T)
    {
        const instances = this.DocumentXML.GetTags(tagName);
        
        instances.forEach(instance => {
            let t = new T(instance);

            this.Instances.push(t);

            t.Display();
        })
    }

    GetByName(name)
    {
        let result = null;

        this.Instances.forEach(item => {
            if (result === null && item.Name === name)
                result = item;
        });

        return result;
    }
}