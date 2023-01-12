const http = require('http');
const fs = require('fs');
const requests = require('requests');

const index = fs.readFileSync("./index.html", "utf-8");

function replaceVal(temp, val)
{
    if(val.cod == 404)
    {
        let temperature = temp.replace("{%status%}", 0);
        temperature = temperature.replace("{%errVal%}", "It is not a valid city");
        return temperature;
    }
    let temperature = temp.replace("{%tempval%}", Math.round(val.main.temp-273.15));
    temperature = temperature.replace("{%location%}", val.name);
    temperature = temperature.replace("{%aountry%}", val.sys.country);
    temperature =  temperature.replace("{%status%}", 1);
    return temperature;
}

const server = http.createServer((req, res) =>
{
    if(req.url == '/')
    {
        res.end(index);
    }
    else if(req.url!='/favicon.ico' && req.url != '/script.js' && req.url != '/style.css')
    {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.url.slice(1)}&appid=ccc12f70ed9aa886cf5d672fece61b9d`;

        requests(
            url,
        )
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData];
            const realTimeData = arrData.map((val) => replaceVal(index, val)).join("");
            res.write(realTimeData);
        })
        .on("end", (err) => {
            if(err)
            {
                return console.log("Error in fetching data");
            }
            res.end();
        })
    }
});
var port = 8000;
server.listen(port, "127.0.0.1");
console.log("Server is running on port :",port);