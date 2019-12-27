cityArr = [];
var APIKey = "cda6d992003316bb25ecdc1ba9f95bcc"; //"31deb4a0aa0fd513e099894690e4c592";

function renderButtons () {
    var renderCities = JSON.parse(localStorage.getItem('cities')); //getting values stored in local storage and converting them back into array
    renderCities.forEach(function(city, index) {
        // (this is necessary otherwise you will have repeat duplicate buttons)
        //$("#buttons-view").empty();
        //creating a new button
        var newButton = $('<input/>').attr({
            type: 'button',
            name: index, //probably don't need this
            value: city,
            class: 'cityButton row col-md-10 btn btn-light'
        })
        //newButton.addClass('row col-md-9 btn btn-light');
        //appending it to the page
        $('#buttons-view').append(newButton);
    })
}
//AJAX call for 5 day forecast
function getFiveDayForecast () {
var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${locationCity},us&appid=${APIKey}&units=metric`;
$('#fiveDay').empty(); //emptying out 5day's screen to show only one city (instead of appending multiple)
var forecastHeader = $('<h2>').text("Five Day Forecast: ").attr({
    class: "w-100 p-3"
});
$('#fiveDay').append(forecastHeader);
// var forecastBr = $('<br>');
// $('#fiveDay').append(forecastBr);
$.ajax({
    url: query5DayURL,
    method: "GET"
    }).then(function(response) {
  
    var newDiv1 = $('<div>').attr({
        class: "card text-white bg-primary mb-3 fiveDayForecast"
    }); //new div to store the goodies
    
    var dateForecast1 = $('<h5>').text(moment(response.list[0].dt_txt).format("MM/DD/YYYY"));
    dateForecast1.appendTo(newDiv1);
    
    $('<br>').appendTo(dateForecast1);        
    
    var iconForecast1 = $('<img>').attr('src', "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
    dateForecast1.append(iconForecast1);

    var forecastTemp1 = $('<p>').text("Temp: "+Math.round(response.list[0].main.temp)+"C"+String.fromCharCode(176)+' or '+(Math.round(response.list[0].main.temp*9/5+32))+' F'+String.fromCharCode(176));
    forecastTemp1.appendTo(newDiv1);
        
    var forecastHum1 = $('<p>').text("Humidity: "+response.list[0].main.humidity + " %");
    forecastHum1.appendTo(newDiv1);
        
    $('#fiveDay').append(newDiv1); // appending 5 day forecast
    
});
}
//first AJAX call to get one day forecast
function getTodaysForecast () {
    //console.log(this.value);
    locationCity = this.value;
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=${APIKey}&units=metric`;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(this);
        var newDiv = $('<div>').attr({
            class: "w-100 p-3 todaysForecast"
        }); //new div to store the goodies
        $('#today').empty(); //emptying out today's screen to show only one city (insted of appending multiple)
        var cityLoc = $('<h1>').text(response.name +' '+ moment().format('(MM/DD/YYYY)'));
        cityLoc.appendTo(newDiv);
        var cityIcon = $('<img>').attr('src', "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        cityLoc.append(cityIcon);
        var cityTemp = $('<p>').text('Temperature: '+Math.round(response.main.temp)+' C'+String.fromCharCode(176)+' or '+(Math.round(response.main.temp*9/5+32))+' F'+String.fromCharCode(176));
        cityTemp.appendTo(newDiv);
        var cityHum = $('<p>').text('Humidity: '+response.main.humidity);
        cityHum.appendTo(newDiv);
        var cityWind = $('<p>').text('Wind: '+response.wind.speed);
        cityWind.appendTo(newDiv);
        $('#today').append(newDiv);
        
    });
    getFiveDayForecast();
}


$('.jumbotron').on("click", ".cityButton", getTodaysForecast);

$(".btn-primary").on("click", function (e) {
    e.preventDefault();
    var newCity = $(".form-control").val().trim(); //grabbing input from text box
    cityArr.push(newCity);
    localStorage.setItem('cities', JSON.stringify(cityArr));
    $(".form-control").val(""); // clear out search form for next entry
    renderButtons();
});
renderButtons();
