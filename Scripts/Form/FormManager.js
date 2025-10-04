

class FormManager
{
    static FormsXML = null;
    static Forms = [];

    static Start()
    {
        const parser = new DOMParser();

        FormManager.FormsXML = parser.parseFromString( Find("forms").innerHTML, "application/xml" );

        FormManager.InitialiseForms();
    }
}