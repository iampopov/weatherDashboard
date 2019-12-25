
//console.log(cityArr);
cityArr = [];
locationCity = "";
var APIKey = "cda6d992003316bb25ecdc1ba9f95bcc"; //"31deb4a0aa0fd513e099894690e4c592";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=${APIKey}&units=metric`;

function renderButtons () {
var renderCities = JSON.parse(localStorage.getItem('cities')); //getting values stored in local storage and converting them back into array



}

$(".btn-primary").on("click", function (e) {
    e.preventDefault();
    var newCity = $(".form-control").val().trim(); //grabbing input from text box
    cityArr.push(newCity);
    localStorage.setItem('cities', JSON.stringify(cityArr));
    $(".form-control").val(""); // clear out search form for next entry
    renderButtons();
});
renderButtons();
