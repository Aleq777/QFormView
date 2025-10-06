

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

    static InitialiseForms()
    {
        const forms = FormManager.FormsXML.GetTags("Form");
        log(FormManager.FormsXML);
        forms.forEach(form => {
            let f = new Form(form);

            FormManager.Forms.push(f);

            f.Display();
        });
    }
}