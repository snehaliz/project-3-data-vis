//copied from D3 website
//not psoitive how all of this code works
//where do I put the longitufe and latitide?

import define1 from "./interactive.js";
//need to make this still

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: 
uppercase;"><h1 style="display: none;">Costco Exploration</h1><a href="https://d3js.org/">D3</a> ›
 <a href="/@d3/gallery">Gallery</a></div>

# Costco's Growth

Maybe add an explanation here, once working`
)}
//can change above

function _date(Scrubber,d3,data){
  const dateExtent = d3.extent(data, d => d.date);
  const endDate = new Date(dateExtent[1]);
  //endDate.setDate(endDate.getDate() + 1); // Add one day to include the last date
//return(
//Scrubber(d3.utcDay.range(...d3.extent(data, d => d.date)), {format: d3.utcFormat("%Y %b %-d"), loop: false})
//)}
  return Scrubber(
  d3.utcDay.range(dateExtent[0], d3.utcDay.offset(endDate, 1)), // Use dateExtent here
  { format: d3.utcFormat("%Y %b %-d"), loop: false }
);
}

function _chart(d3,topojson,us,data)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 960, 600]);

  svg.append("path")
      .datum(topojson.merge(us, us.objects.lower48.geometries))
      .attr("fill", "#ddd")
      .attr("d", d3.geoPath());

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", d3.geoPath());


  const g = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "black");

  const dot = g.selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("r", 0)
      .attr("fill", "red");
    
    // Optional: Add a blue circle for the first data point
  //svg.append("circle")
      //.attr("fill", "blue")
      //.attr("transform", d => `translate(${data[0].x},${data[0].y})`)
      //.attr("r", 3);
  return Object.assign(svg.node(), {
    update(date) {
      dot
        .attr("r", d => d.date <= date ? 3 : 0)
        .attr("opacity", d => d.date <= date ? 1 : 0);
      }
    });
  }

  //let previousDate = -Infinity;
  ///let currentIndex = 0;
  ///return Object.assign(svg.node(), {
    ///update(date) {
      ///const index = data.findIndex(d => d.date > date);
      ///const newIndex = index === -1 ? data.length : index;

      ///if (newIndex !== currentIndex) {
        // Hide the previous dot
        ///dot.filter((_, i) => i === currentIndex)
          ///.transition().attr("r", 0);

        // Show the new dot
        ///dot.filter((_, i) => i === newIndex - 1)
          ///.transition().attr("r", 3);

        ///currentIndex = newIndex;
      ///}
    ///}
  ///});
///}
  //return Object.assign(svg.node(), {
    //update(date) {
      //dot // enter
        //.filter(d => d.date > previousDate && d.date <= date)
        //.transition().attr("r", 3);
      //dot // exit
        //.filter(d => d.date <= previousDate && d.date > date)
        //.transition().attr("r", 0);
      //previousDate = date;
    //}
  //});
//}


function _update(chart,date){return(
chart.update(date)
)}

//thisis where a lot of my chnges are occuring
async function _data(FileAttachment, projection, parseDate) {
  const csvData = (await FileAttachment("costco_data.csv").csv());
  console.log("Raw CSV data:", csvData);

  const startDate = parseDate("9/15/1983"); // FILTER the start date @ when Kirkland, WA location first appears (1983-10-11)

  return csvData
    .map(d => {
      const lat = +d.latitude;
      const lon = +d.longitude;

      // Filter out rows w/ negative latitude values, since no USA state can have negative latitude coordinate value
      if (lat < 0) return null; 

      const pos = projection([lon, lat]);
      if (pos) {
        return {
          x: pos[0],
          y: pos[1],
          date: parseDate(d.date)
        };
      }
      return null;
    })
    .filter(d => d !== null && d.date && d.date >= startDate) // Filter out ALL data before 1983-10-11
    .sort((a, b) => a.date - b.date); // Sort by date in ASC order
}


    //const p = projection(d);
    //p.date = parseDate(d.date); //changed this here
    //return p;
  //})
  //.sort((a, b) => a.date - b.date)
//)}

function _parseDate(d3){return(
d3.utcParse("%m/%d/%Y")
)}

function _projection(d3){return(
    //I may have to update this to get the x and y properly 
//d3.geoAlbersUsa().scale(1280).translate([480, 300]) //I think thsi should work, it should take longitude and latitude 
d3.geoAlbersUsa().scale(1280).translate([480, 300]) //I think thsi should work, it should take longitude and latitude 

//and project it onto a map of the US
)}

async function _us(d3)
{
  const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@1/us/10m.json"); //I think this may be formating
  us.objects.lower48 = {
    type: "GeometryCollection",
    geometries: us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")
  };
  return us;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["costco_data.csv", {url: new URL("./costco_data.csv", import.meta.url), mimeType: "text/comma-separated-values", toString}]
  ]); //changed this here
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof date")).define("viewof date", ["Scrubber","d3","data"], _date);
  main.variable(observer("date")).define("date", ["Generators", "viewof date"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","topojson","us","data"], _chart);
  main.variable(observer("update")).define("update", ["chart","date"], _update);
  main.variable(observer("data")).define("data", ["FileAttachment","projection","parseDate"], _data);
  main.variable(observer("parseDate")).define("parseDate", ["d3"], _parseDate);
  main.variable(observer("projection")).define("projection", ["d3"], _projection);
  main.variable(observer("us")).define("us", ["d3"], _us);
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
