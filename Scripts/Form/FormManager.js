

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

    GetFormByName(name)
    {
        let result = null;

        this.Instances.forEach(form => {
            if (form.Name === name && result === null)
                result = form;
        })

        return result;
    }
}