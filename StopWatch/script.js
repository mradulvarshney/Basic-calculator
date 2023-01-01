var audio = document.getElementById("audio");

var hour = document.getElementById("hour");
var min = document.getElementById("min");
var sec = document.getElementById("sec");

var pause = 0;
function timer()
{
    console.log(hour, min, sec);
    document.getElementById("reset").addEventListener("click", function(){
        clearInterval(id);
        t = 0;
        hour = 0; 
        min = 0;
        sec = -1;

        document.getElementById("reset").classList.add("add");
        document.getElementById("start").classList.remove("add");
        document.getElementById("pause").classList.add("add");

        document.getElementById("hour").value = "00";
        document.getElementById("min").value = "00";
        document.getElementById("sec").value = "00";

    })

    if(sec<60)
    {
        if(sec<9)
        {
            sec++;
            audio.src = "./sound/countDown.mp3";
            document.getElementById("sec").value = "0"+sec;
        }
        else if(sec>=9)
        {
            sec++;
            audio.src = "./sound/countDown.mp3";
            document.getElementById("sec").value = sec;
        }
        
        if(sec == 60 && min<60)
        {
            sec = 0;
            document.getElementById("sec").value = "0"+sec;
            min++;
            if(min<10)
            {
                document.getElementById("min").value = "0"+min;
                audio.src = "./sound/countDown.mp3";
            }
            else if(min>10)
            {
                document.getElementById("min").value = min;
                audio.src = "./sound/countDown.mp3";
            }
        }
        else if(sec == 60 && min == 60)
        {
            sec = 0;
            document.getElementById("sec").value = "0"+sec;
            min = 0;
            document.getElementById("min").value = "0"+min;
            hour++;
            if(hour<10)
            {
                document.getElementById("hour").value = "0"+hour;
                audio.src = "./sound/countDown.mp3";
            }
            else if(hour>10)
            {
                document.getElementById("hour").value = hour;
                audio.src = "./sound/countDown.mp3";
            }
        }
    }
}

document.getElementById("start").addEventListener("click", start);

var pau = document.getElementById("pause");
pau.onclick = p;
function p()
{
    if(pause == 0)
    {
        document.getElementById("pause").innerHTML = "RESUME";
        clearInterval(id);
        t = 0;
        document.getElementById("reset").classList.remove("add");
        document.getElementById("start").classList.add("add");
        document.getElementById("pause").classList.remove("add");
        pause = 1;
    }
    else if(pause==1)
    {
        pause = 0;
        pau=start();
    }
}


var id = null;
var t=0;
function start()
{
    if(t==0)
    {
        t=1;
        hour = parseInt(getHour());

        min = parseInt(getMin());

        sec = parseInt(getSec());
        
    }
    document.getElementById("reset").classList.remove("add");
    document.getElementById("start").classList.add("add");
    document.getElementById("pause").classList.remove("add");

    document.getElementById("pause").innerHTML = "PAUSE";
    id = setInterval(timer, 1000);
}

function getSec()
{
    return document.getElementById("sec").value;
}
function getMin()
{
    return document.getElementById("min").value;
}
function getHour()
{
    return document.getElementById("hour").value;
}
