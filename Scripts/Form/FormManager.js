

class FormManager extends Manager
{
    constructor ()
    {
        super ();
    }

    Start(htmlSourceID = "forms")
    {
        super.Start(htmlSourceID);
    }

    _InitializeInstances()
    {
        super._InitializeInstances("Form", Form);
    }
}