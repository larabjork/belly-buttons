const url = "https://api.spacexdata.com/v2/launchpads";

// d3.json(url).then(receivedData => console.log(receivedData));

// // To get lat of single AFB (Vandenberg)
// d3.json(url).then(spaceXResults => console.log(spaceXResults[0].location.latitude));



// Use map() to print only the latitude and longitude coordinates of each SpaceX launch station.
// d3.json(url).then(function(data){
//     lat = data.map(loc => loc.lat))
// })

// d3.json("samples.json").then(function(data){
//     console.log(data);
// });

d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value])=>
    {console.log(key + ': ' + value);});
});

// Use Object.entries() and forEach() to print all the metadata of the first person in the samples.json() dataset (ID 940).

