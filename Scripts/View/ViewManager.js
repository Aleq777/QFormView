

class ViewManager extends Manager
{
    constructor ()
    {
        super ();
    }
    
    Start()
    {
        super.Start("views");
    }

    _InitializeInstances()
    {
        super._InitializeInstances("View", View);
    }
}