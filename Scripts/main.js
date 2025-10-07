var g;

function LoadQFormView()
{
    // ViewManager.Start();
    const formManager = new FormManager();
    const viewManager = new ViewManager();

    g = formManager;
    
    formManager.Start();
    viewManager.Start();
    // FormManager.Start();
}