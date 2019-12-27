cityArr = [];

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

function getForecast () {
    //console.log(this.value);
    locationCity = this.value;
    var APIKey = "cda6d992003316bb25ecdc1ba9f95bcc"; //"31deb4a0aa0fd513e099894690e4c592";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=${APIKey}&units=metric`;
    var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&appid=${APIKey}&units=metric`;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var newDiv = $('<div>'); //new div to store the goodies
        $('#today').empty(); //emptying out today's screen to show only one city (insted of appending multiple)
        var cityLoc = $('<h1>').text(response.name +' '+ moment().format('(MM/DD/YYYY)'));
        cityLoc.appendTo(newDiv);
        var cityTemp = $('<p>').text('Temperature: '+response.main.temp+' C'+String.fromCharCode(176)+' or '+(response.main.temp*9/5+32)+' F'+String.fromCharCode(176));
        cityTemp.appendTo(newDiv);
        var cityHum = $('<p>').text('Humidity: '+response.main.humidity);
        cityHum.appendTo(newDiv);
        var cityWind = $('<p>').text('Wind: '+response.wind.speed);
        cityWind.appendTo(newDiv);
        $('#today').append(newDiv);
        
    });
}

//need a second AJAX call for 5 day forecast

$('.jumbotron').on("click", ".cityButton", getForecast);

$(".btn-primary").on("click", function (e) {
    e.preventDefault();
    var newCity = $(".form-control").val().trim(); //grabbing input from text box
    cityArr.push(newCity);
    localStorage.setItem('cities', JSON.stringify(cityArr));
    $(".form-control").val(""); // clear out search form for next entry
    renderButtons();
});
renderButtons();
