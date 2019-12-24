var cityArr = [];
console.log(cityArr);

locationCity = "";
var APIKey = "cda6d992003316bb25ecdc1ba9f95bcc"; //"31deb4a0aa0fd513e099894690e4c592";
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=${APIKey}&units=metric`;



$(".btn-primary").on("click", function (e) {
    e.preventDefault();
    var newCity = $(".form-control").val().trim(); //grabbing input from text box
    
    //cityArr.push(newCity); //add it to the array
    
    $(".form-control").val(""); // clear out search form for next entry
    
});
