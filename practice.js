Plotly.newPlot("spaceman", [{x:[2,4,6], y:[1,2,3,4]}]);

var trace =[{
    x: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "bar"
}];

var layout = {
    title: "Beverage Popularity",
    xaxis: {title: "Beverage"},
    yaxis: {title: "Percentage of Total Orders"}
};

Plotly.newPlot("noBooze", trace, layout);

var data =[{
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "pie"
}];

var pieLayout = {
    title: "'Pie' Chart",
};

Plotly.newPlot("pie", data, pieLayout);


var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [10, 15, 35, 27,32],
    mode: "markers",
    type: "scatter"
};

var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
};

var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
};

var data = [trace1, trace2, trace3];

Plotly.newPlot('scattered', data);