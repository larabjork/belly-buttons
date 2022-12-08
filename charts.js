function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleResultsArray = samplesArray.filter(sampleObj => sampleObj.id == sample);
    //  Create a variable that holds the first sample in the samples array.
    var result = sampleResultsArray[0];

    // Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata;
    var metadataResultsArray = metadataArray.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the metadata array.
    var metaFirstSample = metadataResultsArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = (result.otu_ids);
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sortedIDs = otuIDs.sort((a,b) => b.sampleValues - a.sampleValues)
    var topTenBacteria = sortedIDs.slice(0,10);
    var yticks = topTenBacteria.map( bacterium => 'OTU ' + bacterium.toString());
 
    // Create a variable that holds the washing frequency.
    var washingFreq = parseFloat(metaFirstSample.wfreq);


    // Create the trace for the bar chart. 
    var barData = [{
        x: sampleValues,
        y: yticks,
        type: "bar",
        orientation: "h",
        marker: {color: "#0b5f97"}
    } ];
    // Create the layout for the bar chart. 
    var barLayout = {
        title: "<b>Top 10 Bacteria Cultures Found</b>",
        yaxis: {autorange: "reversed"},
        barmode: "group",
        paper_bgcolor:"#b6d7e9",
        font: {
          family: 'Verdana, sans-serif',
        }
    };

    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)

    // Create the trace for the bubble chart.
    var bubbleData = [{
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: "Portland"
        }
    } ];

     
    // Create the layout for the bubble chart.
    var bubbleLayout = {
        title: "<b>Bacteria Cultures Per Sample</b>",
        xaxis: {title: "OTU IDs"},
        hovermode: "closest",
        margins: {l: 400,
                r: 400,
                t: 400,
                b: 400},
        paper_bgcolor:"#b6d7e9",
        font: {
            family: 'Verdana, sans-serif',
          }
      };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // Create the trace for the gauge chart.
    var gaugeData = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFreq,
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week",
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 10]},
            bar: {color: "#cfcfcf"},
            steps: [
              { range: [0, 2], color: "#d91e1e"},
              { range: [2, 4], color: "ea6c30" },
              { range: [4, 6], color: "#f2aa38" },
              { range: [6, 8], color: "#bce444" },
              { range: [8, 10], color: "#55a090" },
            ]
        },
        font: {
            family: 'Verdana, sans-serif',
          }}
    ];
    
    // Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 }, 
        paper_bgcolor:"#b6d7e9"};

    // Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
