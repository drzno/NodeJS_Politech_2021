const text="Погода у місті ";
let first
let url = "https://raw.githubusercontent.com/alexanderkuzmenko/weatherapplication/master/cities.json";
fetch(url)
    .then(response=>response.json())
    .then(cities=>{
        CityList(cities);
        Weather();
    })
    .catch(error=>console.log(error));

let currentBlue=undefined;
function CityList(cities){
    let div = document.getElementById("cityList");
    let ul = document.createElement("ul");
    for(let city =0; city<cities.length; city++){
        let temp = document.createElement("li");
        temp.innerText = translateToRus(cities[city].city);
        ul.appendChild(temp);
        temp.addEventListener("click", function (){
            if(currentBlue!== undefined){
                currentBlue.className ="";
            }
            currentBlue = temp;
            temp.className = "bluemini";
        })
    }
    ul.id="StyleLi";
    div.appendChild(ul);
}




function Weather(){
    let field = document.querySelector("#cityList");
    let first = document.querySelector('#StyleLi').firstChild;
    let city = first.innerText;
    findWeather(city);
    field.addEventListener('click', function (e){
        let target = e.target;
        city = target.innerText;
        findWeather(city);
    });
}
function translateToRus(c){
    let res;
    switch (c){
        case "Kyiv":
            res="Київ";
            break;
        case "Zhytomyr":
            res="Житомир";
            break;
        case "New York":
            res="Нью-Йорк";
            break;
        case "Warsaw, PL":
            res="Варшава";
            break;
        case "London":
            res="Лондон";
            break;
    }
    return res;
}


function findWeather(city){
    let key = '400bd4af8731c414c67ffd9c00f8d283';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city+ '&appid=' + key)
        .then(response => response.json())
        .then(data => checkData(data))
        .catch(error=>console.log(error));

    InsertCityName.innerHTML = text + city;
}


function checkData(data){
    let temp="";
    if(Math.round(data.main.temp-273)>0){
        temp="+"+Math.round(data.main.temp-273);
    }
    else if(Math.round(data.main.temp-273)===0){

        temp=" "+Math.round(data.main.temp-273);
    }
    else{
        temp="-"+Math.round(data.main.temp-273);
    }
    pressure.innerHTML = data.main.pressure.toString()+"мм";
    humidity.innerHTML = data.main.humidity.toString()+"%";
    temperature.innerHTML = temp;
    image.src="https://openweathermap.org/img/wn/"+data.weather[0]['icon']+"@2x.png";
}
