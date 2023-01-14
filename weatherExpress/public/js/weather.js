var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const getCurrDay = () => {
    let dt = new Date();
    let day = weekday[dt.getDay()];
    let month = months[dt.getMonth()];
    let date = dt.getDate();
    let hour = dt.getHours();
    let min = dt.getMinutes();
    let periods = "AM";

    if (hour > 11) {
        periods = "PM";
        if (hour > 12) {
            hour -= 12;
        }
    }
    if (min < 10) {
        min = "0" + min;
    }

    return `${day}   ${hour}:${min} ${periods}   ${month} ${date}`;
}

window.document.getElementById("date").innerHTML = getCurrDay();


const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const search = document.getElementById("submitBtn");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

const getInfo = async (e) =>{
    e.preventDefault();
    var value = cityName.value;
    if(value === '')
    {
        city_name.style.fontSize = "30px";
        city_name.innerHTML = "Input field can't be empty";
    }
    else
    {
        try
        {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ccc12f70ed9aa886cf5d672fece61b9d`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerHTML = Math.round(arrData[0].main.temp - 273)+"<sup>o</sup>C";
            cityName.value = "";
            // const status = arrData[0].weather[0].main;
            
            // if(status == "Clear")
            // {
            //     temp_status.innerText = `<i class="fas fa-sun" style="color: orange"></i>`;
            // }
            // else if(status == "Rain")
            // {
            //     temp_status.innerText = `<i class="fas fa-cloud-rain" style="color: blue"></i>`;
            // }
            // else
            // {
            //     temp_status.innerText = `<i class="fas fa-cloud"></i>`;
            // }
        }
        catch
        {
            city_name.innerHTML = "City not found";
            temp.innerHTML = "";
            temp_status.innerText = "";
            cityName.value = "";
        }
    }
}

search.addEventListener('click', getInfo);