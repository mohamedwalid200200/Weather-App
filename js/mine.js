let todayName= document.getElementById("todayName");
let today= document.getElementById("todayDate");
let countryName= document.getElementById("countryName");
let todayTemp= document.getElementById("todayTemp");
let todayImg=document.getElementById("todayImg");
let todayCondition= document.getElementById("todayCondition");
let todayPrecent= document.getElementById("todayPrecent");
let todayWindSpeed= document.getElementById("todayWindSpeed");
let todayWindDirection= document.getElementById("todayWindDirection");

let nextDay=document.getElementsByClassName("nextDay");
let nextImage=document.getElementsByClassName("nextImage");
let nextMin=document.getElementsByClassName("nextMin");
let nextMax=document.getElementsByClassName("nextMax");
let nextCondition=document.getElementsByClassName("nextCondition");

let search= document.getElementById("search");

async function getWeather(city){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=240004b7fd5f4fc0b6b220146242001&q=${city}&days=3`);
    let weatherData= await weatherResponse.json();
    return weatherData
}
function todayData(data){
    let todayDate= new Date();
    todayName.innerHTML=todayDate.toLocaleDateString("en-Us",{weekday: "long"});
    today.innerHTML=todayDate.getDate() + " " + todayDate.toLocaleDateString("en-Us",{month: "long"});
    countryName.innerHTML=data.location.name;
    todayTemp.innerHTML=data.current.temp_c;
    todayCondition.innerHTML=data.current.condition.text;
    todayImg.setAttribute("src" , data.current.condition.icon);
    todayPrecent.innerHTML=data.current.humidity;
    todayWindSpeed.innerHTML=data.current.wind_kph;
    todayWindDirection.innerHTML=data.current.wind_dir;
}
function nextDayData(data){
    for (let i = 0; i < 2; i++) {
        let nextDayDate=new Date(data.forecast.forecastday[i+1].date);
        nextMax[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c;
        nextMin[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c;
        nextCondition[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
        nextImage[i].setAttribute("src" , data.forecast.forecastday[i+1].day.condition.icon);
        nextDay[i].innerHTML=nextDayDate.toLocaleDateString("en-Us",{weekday: "long"});
    }
}
async function dataDisplay(city="london"){
    let weather = await getWeather(city);
    console.log(weather);
    todayData(weather);
    nextDayData(weather);
}
dataDisplay();
search.addEventListener("keyup", function(){
    dataDisplay(search.value);
})