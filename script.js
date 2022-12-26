var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");
var hist = document.querySelector("#history");

display.textContent = 0;
var str = "";
var operator = null;
var ans = 0;
function isOperator(value) 
{
    return value == "+" || value == "-" || value == "*" || value == "/";
}

var text = display.textContent.trim();

for (var i = 0; i < buttons.length; i++) 
{
    buttons[i].addEventListener('click', function () 
    {

        var value = this.getAttribute('data-value');

        if (isOperator(value)) 
        {
            if(str != "" && operator == null)
            {
                if(str.charAt(str.length-1)==".")
                {
                    str += 0;
                }
                operator = value;
                operand1 = parseFloat(text);
                str += value;
                display.textContent = "";
                display.textContent += str;
            }
            else if(str.length>0 && operator != null)
            {
                str = str.substring(0, str.length-1);
                str += value;
                display.textContent = "";
                display.textContent += str;
            }
        } 
        else if (value == "ac") 
        {
            display.textContent = "0";
            str = "";
            operator = null;
            hist.innerText = "";
            ans = 0;
        } 
        else if (value == "sign") 
        {
            if (text.length) 
            {
                str = ""+ -1*parseFloat(str);
                display.innerText = str;
            }
        } 
        else if (value == ".") 
        {
            let t = 0;
            if (text.length) 
            {
                for(var i=str.length-1; i>=0; i--)
                {
                    if(str.charAt(i) == '+' || str.charAt(i) == '-' || str.charAt(i) == '*' || str.charAt(i) == '/')
                    {
                        var store = str.substring(i+1);
                        if(store.includes("."))
                        {
                            break;
                        }
                        store = store+".";
                        str = str.substring(0,i+1);
                        str = str+store;
                        display.innerText = "";
                        display.innerText = str;
                        t=1;
                        break;
                    }
                }

                if(t==0 && !str.includes("."))
                {
                    if(str == 0)
                    {
                        str = "0.";
                    }
                    else
                    {
                        str += ".";
                    }
                    display.innerText = str;
                }
            }
        } 
        else if (value == "%") 
        {
            let t = 0;
            if(!(str.charAt(str.length-1) == '+' || str.charAt(str.length-1) == '-' || str.charAt(str.length-1) == '*' || str.charAt(str.length-1) == '/'))
            {
                for(var i=str.length-1; i>=0; i--)
                {
                    if(str.charAt(i) == '+' || str.charAt(i) == '-' || str.charAt(i) == '*' || str.charAt(i) == '/')
                    {
                        var store = str.substring(i+1);
                        store = ""+parseFloat(store)/100;
                        str = str.substring(0,i+1);
                        str = str+store;
                        display.innerText = "";
                        display.innerText = str;
                        t=1;
                        break;
                    }
                }
                if(t==0)
                {
                    str = ""+parseFloat(str)/100;
                    display.innerText = str;
                }
            }
        } 
        else if (value == "=") 
        {
            if(str != "") 
            {
                hist.textContent = str;
                ans = eval(str);
                display.textContent = ans;
            }
            else
            {
                display.textContent = "undefined";
            }
        } 
        else if (value == "back")
        {
            str = str.substring(0,str.length-1);
            display.innerText = str;
        }
        else 
        {
            operator = null;
            str += value;
            display.innerText = "";
            display.textContent += str;
        }
    });
}


// using keyboard

document.addEventListener("keypress", mradul)

function mradul(e)
{
    console.log(e.key);
    if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/')
    {
        if(str != "" && operator == null)
        {
            if(str.charAt(str.length-1)==".")
            {
                str += 0;
            }
            operator = e.key;
            str += e.key;
            display.textContent = "";
            display.textContent += str;
        }
        else if(text.length && operator != null)
        {
            str = str.substring(0, str.length-1);
            str += e.key;
            display.textContent = "";
            display.textContent += str;
        }
    }
    else if(e.keyCode >= 48 && e.keyCode <= 57)
    {
        operator = null;
        str += e.key;
        display.innerText = "";
        display.textContent += str;
    }
    else if(e.key === "Enter")
    {
        if(str != "") 
        {
            hist.textContent = str;
            ans = eval(str);
            display.textContent = ans;
        }
        else
        {
            display.textContent = "undefined";
        }
    }
    else if (e.key == "%") 
    {
        let t = 0;
        if(!(str.charAt(str.length-1) == '+' || str.charAt(str.length-1) == '-' || str.charAt(str.length-1) == '*' || str.charAt(str.length-1) == '/'))
        {
            for(var i=str.length-1; i>=0; i--)
            {
                if(str.charAt(i) == '+' || str.charAt(i) == '-' || str.charAt(i) == '*' || str.charAt(i) == '/')
                {
                    var store = str.substring(i+1);
                    store = ""+parseFloat(store)/100;
                    str = str.substring(0,i+1);
                    str = str+store;
                    display.innerText = "";
                    display.innerText = str;
                    t=1;
                    break;
                }
            }
            if(t==0)
            {
                str = ""+parseFloat(str)/100;
                display.innerText = str;
            }
        }
    }

    else if (e.key == ".") 
    {
        let t = 0;
        if (text.length) 
        {
            for(var i=str.length-1; i>=0; i--)
            {
                if(str.charAt(i) == '+' || str.charAt(i) == '-' || str.charAt(i) == '*' || str.charAt(i) == '/')
                {
                    var store = str.substring(i+1);
                    if(store.includes("."))
                    {
                        break;
                    }
                    store = store+".";
                    str = str.substring(0,i+1);
                    str = str+store;
                    display.innerText = "";
                    display.innerText = str;
                    t=1;
                    break;
                }
            }

            if(t==0 && !str.includes("."))
            {
                if(str.length == 0)
                {
                    str = "0.";
                }
                else
                {
                    str += ".";
                }
                display.innerText = str;
            }
        }
    }
    else if (e.key == " ") 
    {
        display.textContent = "0";
        str = "";
        operator = null;
        hist.innerText = "";
        ans = 0;
    } 
    else if (e.key == "Backspace")
    {
        str = str.substring(0,str.length-1);
        display.innerText = str;
    }
}
document.addEventListener("keydown", mradul)
