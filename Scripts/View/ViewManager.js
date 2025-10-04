

class ViewManager
{
    static ViewsXML = null;
    static Views = [];

    static Start()
    {
        const parser = new DOMParser();

        ViewManager.ViewsXML = parser.parseFromString( Find("views").innerHTML, "application/xml" );

        ViewManager.InitialiseViews();
    }

    static InitialiseViews()
    {
        const views = ViewManager.ViewsXML.GetTags("View");

        views.forEach(view => {

            let v = new View(view);

            ViewManager.Views.push(
                v
            );

            v.Display();
        });
    }
}