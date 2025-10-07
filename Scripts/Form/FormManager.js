

class FormManager extends Manager
{
    constructor ()
    {
        super ();
    }

    Start()
    {
        super.Start("forms");
    }

    _InitializeInstances()
    {
        super._InitializeInstances("Form", Form);
    }
}