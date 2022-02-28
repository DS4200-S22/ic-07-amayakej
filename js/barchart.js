/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 

const svg1 = d3 
  .select("#hard-coded-bar") // selects the div ID containing hard-coded-bar
  .append("svg") // append an SVG element to this variable
  .attr("width", width-margin.left-margin.right) // define length of bar shape (900-100)
  .attr("height", height - margin.top - margin.bottom) // define height of bar shape (450-100)
  .attr("viewBox", [0, 0, width, height]); // scale the axis 

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? 
let maxY1 = d3.max(data1, function(d) { return d.score; }); // finds max score val from data1

// TODO: What does each line of this code do?

// general idea: for xScale1 & yScale1: creating scale functions
//  that map data values to pixel values available to plot in  

let yScale1 = d3.scaleLinear() // linear scale chosen because data in data1 in linear
            .domain([0,maxY1]) // providing inputs for function
            .range([height-margin.bottom,margin.top]); // providing outputs for function

// TODO: What does each line of this code do? 
let xScale1 = d3.scaleBand() // splits range into different buckets for x axis: matching no of values in data1: 7
            .domain(d3.range(data1.length)) // providing inputs for function
            .range([margin.left, width - margin.right]) // providing outputs for function
            .padding(0.1); // set padding for the specified value in pixels in order to return x axis 

// TODO: What does each line of this code do?  
svg1.append("g") // g is a "placeholder" svg
   .attr("transform", `translate(${margin.left}, 0)`) // ^ moves axis inside of left margin
   .call(d3.axisLeft(yScale1)) // built in function for y axis given a scale function 
   .attr("font-size", '20px'); // sets font size

// TODO: What does each line of this code do? 
svg1.append("g") // g is a "placeholder" svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // ^ moves axis to bottom of svg  
    .call(d3.axisBottom(xScale1) // built in function for bottom axis given a scale function 
            .tickFormat(i => data1[i].name))  // control tick labels: select each element from 'name'
    .attr("font-size", '20px'); // set font size 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar") // select div containing hard-coded-bar ID
                .append("div") // append a div inside of this div
                .attr('id', "tooltip1") // set ID as tooltip1
                .style("opacity", 0) // make opacity transparent
                .attr("class", "tooltip"); // assign class to new div

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) { // for a given event and datapoint
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  // highlights the name and score of a given bar
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); // sets opacity back to transparent
                                // removes highlighted name + score
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg1.selectAll(".bar") // select all div ID's containing bar
   .data(data1) // extract data from hardcoded data
   .enter()    // enter() creates a placeholder DOM element 
              // for all data that is not yet associated with 
              // a the DOM element 
   .append("rect") // append a rectangle shape
     .attr("class", "bar") // assign class 'bar'
     .attr("x", (d,i) => xScale1(i)) // extract x axis values - names 
     .attr("y", (d) => yScale1(d.score)) // extract y axis values - scores
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // set height of bars using respective max score
     .attr("width", xScale1.bandwidth()) // find width of each band
     .on("mouseover", mouseover1) // mouseover listener
     .on("mousemove", mousemove1)// mousemove listener
     .on("mouseleave", mouseleave1); // mouseleave listener


// Create a bar chart using data from barchart.csv file:

const svg2 = d3 
  .select("csv-bar") // selects the div ID containing hard-coded-bar
  .append("svg") // append an SVG element to this variable
  .attr("width", width-margin.left-margin.right) // define length of bar shape (900-100)
  .attr("height", height - margin.top - margin.bottom) // define height of bar shape (450-100)
  .attr("viewBox", [0, 0, width, height]); // scale the axis 


d3.csv("data/barchart.csv").then((data) => { 
 
let maxY1 = d3.max(data, function(d) { return d.score; }); // finds max score val from data1

// TODO: What does each line of this code do?

// general idea: for xScale1 & yScale1: creating scale functions
//  that map data values to pixel values available to plot in  

let yScale1 = d3.scaleLinear() // linear scale chosen because data in data1 in linear
            .domain([0,maxY1]) // providing inputs for function
            .range([height-margin.bottom,margin.top]); // providing outputs for function

// TODO: What does each line of this code do? 
let xScale1 = d3.scaleBand() // splits range into different buckets for x axis: matching no of values in data1: 7
            .domain(d3.range(data1.length)) // providing inputs for function
            .range([margin.left, width - margin.right]) // providing outputs for function
            .padding(0.1); // set padding for the specified value in pixels in order to return x axis 

// TODO: What does each line of this code do?  
svg1.append("g") // g is a "placeholder" svg
   .attr("transform", `translate(${margin.left}, 0)`) // ^ moves axis inside of left margin
   .call(d3.axisLeft(yScale1)) // built in function for y axis given a scale function 
   .attr("font-size", '20px'); // sets font size

// TODO: What does each line of this code do? 
svg1.append("g") // g is a "placeholder" svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // ^ moves axis to bottom of svg  
    .call(d3.axisBottom(xScale1) // built in function for bottom axis given a scale function 
            .tickFormat(i => data1[i].name))  // control tick labels: select each element from 'name'
    .attr("font-size", '20px'); // set font size 


  // add our circles with styling 
  svg2.selectAll(".bar") // select all div ID's containing bar
   .data(data1) // extract data from hardcoded data
   .enter()    // enter() creates a placeholder DOM element 
              // for all data that is not yet associated with 
              // a the DOM element 
   .append("rect") // append a rectangle shape
     .attr("class", "bar") // assign class 'bar'
     .attr("x", (d,i) => xScale1(i)) // extract x axis values - names 
     .attr("y", (d) => yScale1(d.score)) // extract y axis values - scores
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // set height of bars using respective max score
     .attr("width", xScale1.bandwidth()) // find width of each band
     .on("mouseover", mouseover1)
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1)

});





