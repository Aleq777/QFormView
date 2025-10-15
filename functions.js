// Write here your custom functions to use inside Form or View
// JavaScript has a tendency to "lose context of invokation", so you should do something like this
// function Foo(argument)
// {
//     MyFancyObject.Method(argument);
// }
// 
// because MyFancyObject.Method(argument) won't work as an Action="..."

function EditViewRecordInForm(index, item)
{
    // Name of your Form
    formManager.GetByName("creator").Edit(index);
}