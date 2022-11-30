

var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();

var topSevenCities = sortedCities.slice(0,7);

var topSevenCityNames = topSevenCities.map(city => city.City);

var topSevenCityGrowths = 
topSevenCities.map(city => parseInt(city.Increase_from_2016));



var topFiveCities = sortedCities.slice(0,5);

var topFiveCityNames = topFiveCities.map(city => city.City);

var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));

console.log(topFiveCityGrowths)

// var trace = {
//     x: topFiveCityNames,
//     y: topFiveCityGrowths,
//     type: "bar"
// };

// var data = [trace]

// var layout = {
//     title: "Most Rapidly Growing Cities",
//     xaxis: {title: "City"},
//     yaxis: {title: "Population Growth, 2016-2017"}
// };


var trace1 = {
    x: topSevenCityNames,
    y: topSevenCityGrowths,
    type: "bar"
};

var data1 = [trace1]

var layout1 = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City"},
    yaxis: {title: "Population Growth, 2016-2017"}
};

Plotly.newPlot("bar-plot", data1, layout1);