const apiKey = ("22bf8ba40e18863bce6fa072df9f6cf6");
let userInput = document.querySelector("#yourInput");
var userBtn = document.querySelector("#todo-form");
let cityName = document.querySelector("#cityName");
let todayTemp = document.querySelector("#ttemp");
let todayWind = document.querySelector("#twind");
let todayHumid = document.querySelector("#thumid");
let imgMain = document.querySelector("#imgMain")
let todayCal = document.querySelector("#today");
let todayDate = dayjs().format('MMM-D-YYYY');
let searchHist = document.querySelector("#searchHistory");
todoForm = document.querySelector("#todo-form");

// make the search history to be clickable
 function buttonList(){
    var city = this.textContent
    console.log(city)
    todayWeather(city);
    fivedaysWeather(city);
  }

// Initiate all the functinos inside once the 'click' has happend.
userBtn.addEventListener('submit', whatCity);
function whatCity(event){
    event.preventDefault()
    if(userInput.value !== undefined && userInput.value !== null && userInput.value !== ''){
         console.log(userInput.value);
        todayWeather(userInput.value);
        fivedaysWeather(userInput.value);
        totalHist();
    }
}

// stores the data from the localstorage
let histStorage = [];


// list creater for search history
function inputDisplay(){
    searchHist = document.querySelector("#searchHistory");
    searchHist.textContent ='';
    for(var i = 0; i < histStorage.length; i++){
        let liItem = histStorage[i].data;
        let liEl = document.createElement('li');
        liEl.textContent = liItem.toUpperCase();
        liEl.classList.add("hi");
        liEl.addEventListener("click",buttonList)
        searchHist.appendChild(liEl);
    }
}

// stores the userinput to the local storage
function inputHistory(){
    localStorage.setItem("history", JSON.stringify(histStorage));
}

// brings the saved userinput from the localstorage.
function getHistory(){
    let localHist = JSON.parse(localStorage.getItem("history"));

    if(localHist !== null){
        histStorage = localHist;
    }
}

// keeps the search history on the webpage and returns if there is no input.
function totalHist(){
    let = value = userInput.value;
    getHistory();
    inputHistory();
    inputDisplay();
    if(value === undefined || value === null ||  value === ''){
        return histStorage =[];
    }else{
        histStorage.push({data: value})
    }
    inputHistory();
    inputDisplay();
}

// function for the taday's weather at the location that is searched
function todayWeather(userRes){
    // calling openweathermap api for the current day.
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+userRes+"&appid=22bf8ba40e18863bce6fa072df9f6cf6&units=imperial")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        cityName.textContent =  data.name; // getting citie's name from the weather api
        todayTemp.textContent = data.main.temp + '°F'; // getting temperature from the weather api
        todayWind.textContent = data.wind.speed + 'MPH'; //getting wind speed from the weather api
        todayHumid.textContent = data.main.humidity + '%'; // getting humidity percentage from the weather api
        todayCal.textContent = todayDate; // dayjs getting the current day.
        imgMain.src ="http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    })
}

// function for the weather of the next five days.
function fivedaysWeather(userRes2) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+userRes2+"&appid=22bf8ba40e18863bce6fa072df9f6cf6&units=imperial")
    .then(function(statresponse) {
        return statresponse.json();
    })
    .then(data => {
        console.log(data);

        for(i=0;i<5;i++){
            document.getElementById('day' +(i+1)).textContent =  dayjs().add(i + 1, 'day').format("MMM-D-YYYY");
        }

        for(i=0;i<5;i++){
            document.getElementById("temp" + (i+1)).textContent = Number(data.list[i].main.temp).toFixed(2) + '°F';
        }
        for(i=0;i<5;i++){
            //document.querySelector("#icon" +(i+1)).src = data.list[i].weather[0].icon;
            document.querySelector("#icon" +(i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";;
        }
        for(i=0;i<5;i++){
            document.querySelector("#wind" +(i+1)).textContent = Number(data.list[i].wind.speed) + 'MPH';
        }
        for(i=0;i<5;i++){
            document.querySelector("#humid" +(i+1)).textContent = Number(data.list[i].main.humidity) + '%'
        }

    })
    .catch(err => {
        console.log(err);
    })
}

totalHist();