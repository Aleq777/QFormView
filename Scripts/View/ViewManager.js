

class ViewManager extends Manager
{
    constructor ()
    {
        super ();
    }
    
    Start(htmlSourceID = "views")
    {
        super.Start(htmlSourceID);
    }

    _InitializeInstances()
    {
        super._InitializeInstances("View", View);
    }
}