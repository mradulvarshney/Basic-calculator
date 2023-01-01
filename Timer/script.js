var audio = document.getElementById("audio");

var hour = document.getElementById("hour");
var min = document.getElementById("min");
var sec = document.getElementById("sec");

var pause = 0;
function timer()
{

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

    if(sec>=0)
    {
        if(sec<10)
        {
            document.getElementById("sec").value = "0"+sec;
            audio.src = "./sound/countDown.mp3";
            sec--;
        }
        else if(sec>=10)
        {
            document.getElementById("sec").value = sec;
            audio.src = "./sound/countDown.mp3";
            sec--;
        }
        
        if(sec == -1 && min>0)
        {
            sec = 59;
            document.getElementById("sec").value = sec;
            sec--;
            min--;
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
        else if(sec == -1 && min==0 && hour>0)
        {
            min = 59;
            document.getElementById("min").value = min;
            min--;
            sec = 59;
            document.getElementById("sec").value = sec;
            sec--;
            hour--;
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
    
    else if(sec==-1 && min==0 && hour==0)
    {
        audio.src = "./sound/timeUp.mp3";
        t=0;
        document.getElementById("reset").classList.add("add");
        document.getElementById("start").classList.remove("add");
        document.getElementById("pause").classList.add("add");
        clearInterval(id);
        return;
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
        if(hour>0)
        {
            if(hour<10)
            {
                document.getElementById("hour").value = "0"+hour;
            }
            else if(hour>10)
            {
                document.getElementById("hour").value = hour;
            }
        }

        min = parseInt(getMin());
        if(min>60)
        {
            hour = parseInt(hour);
            hour += parseInt(min/60);
            if(hour<10)
            {
                document.getElementById("hour").value = "0"+hour;
            }
            else if(hour>10)
            {
                document.getElementById("min").value = hour;
            }
            min = min%60;
            if(min<10)
            {
                document.getElementById("min").value = "0"+min;
            }
            else if(min>10)
            {
                document.getElementById("min").value = min;
            }
        }

        sec = parseInt(getSec());
        console.log(sec);
        if(sec>59 && sec<3600)
        {
            min = parseInt(min);
            min += parseInt(sec/60);
            if(min<10)
            {
                document.getElementById("min").value = "0"+min;
            }
            else if(min>10)
            {
                document.getElementById("min").value = min;
            }
            sec = sec%60;
            if(sec<10)
            {
                document.getElementById("sec").value = "0"+sec;
            }
            else if(sec>10)
            {
                document.getElementById("sec").value = sec;
            }
        }
        else if(sec>3599)
        {
            hour = parseInt(hour);
            hour += parseInt(sec/3600);
            console.log(hour);
            if(hour<10)
            {
                document.getElementById("hour").value = "0"+hour;
            }
            else if(hour>10)
            {
                document.getElementById("hour").value = hour;
            }

            min = parseInt(min);
            sec = sec%3600;
            min += parseInt(sec/60);
            console.log(min);
            if(min<10)
            {
                document.getElementById("min").value = "0"+min;
            }
            else if(min>10)
            {
                document.getElementById("min").value = min;
            }

            sec = sec%60;
            if(sec<10)
            {
                document.getElementById("sec").value = "0"+sec;
            }
            else if(sec>10)
            {
                document.getElementById("sec").value = sec;
            }
        }
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
