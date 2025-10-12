
const log = (text = "xd") => console.log(text);

const GetTags = tag => document.getElementsByTagName(tag);

const Find = id => document.getElementById(id);

const Create = element => document.createElement(element);


function CompareLess(a, b)
{
    if (!a || !b)
        return null;

    return a < b;
}

function CompareBigger(a, b)
{
    if (!a || !b)
        return null;

    return a > b;
}

//#region Collection getters
Document.prototype.GetTags = function (tag)
{
    return this.getElementsByTagName(tag);
}
Element.prototype.GetTags = function (tag)
{
    return this.getElementsByTagName(tag);
}
//#endregion

//#region Element getters
Document.prototype.Find = function (id)
{
    return this.getElementById(id);
}
Element.prototype.Find = function (id)
{
    return this.getElementById(id);
}
Document.prototype.FindTag = function (tag, index = 0)
{
    return this.GetTags(tag)[index];
}
Element.prototype.FindTag = function (tag, index = 0)
{
    return this.GetTags(tag)[index];
}
//#endregion

//#region Attribute getters
Document.prototype.Attr = function (name)
{
    return this.getAttribute(name);
}
Element.prototype.Attr = function (name)
{
    return this.getAttribute(name);
}

Element.prototype.Has = function (tag)
{
    let found = false;
    this.forEach(element => {
        if (element.tagName === tag)
            found = true;
    })

    return found;
}
//#endregion


HTMLCollection.prototype.forEach = function (func)
{
    Array.from(this).forEach(func);
}

Element.prototype.forEach = function (func)
{
    this.children.forEach(func);
}