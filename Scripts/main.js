var formManager = null;
var viewManager = null;

function LoadQFormView()
{
    // ViewManager.Start();
    viewManager = new ViewManager();
    formManager = new FormManager();
    
    formManager.Start();
    viewManager.Start();
    // FormManager.Start();
}