// map legend, when you click, makes those dots brighter
// map zooming when you click, center on country, change point size
// tooltips when you hover/click on a point
// dots pulse on mouseover

var color = d3.scale.ordinal().range(["#556270", "#27328C", "#F0CC00", "#4AE8C2"]);

var m_width = $("#loris-map").width(),
    width = 900,
    height = 480,
    country;

var projection = d3.geo.mercator()
    .rotate([-10,0])
    .scale(140)
    .translate([width / 2, height / 1.55]);

var svg = d3.select("#loris-map").append("svg")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", m_width)
    .attr("height", m_width * height / width);

var path = d3.geo.path()
    .projection(projection);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g");

// load and display the World
d3.json("world-110m2.json", function(error, topology) {

    var countries = topojson.feature(topology, topology.objects.countries).features;
    var country = g.selectAll(".country").data(countries);

    country
        .enter()
        .insert("path")
        .attr("class", "country")
        .attr("d", path)
        .on("click", country_clicked);

    // load and display the cities
    d3.tsv("lorisusers.tsv", function(error, data) {
        
        // Draw the project circles
        g.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                return projection([d.LONG, d.LAT])[0];
           })
           .attr("cy", function(d) {
                return projection([d.LONG, d.LAT])[1];
           })
           .attr("r", function (d) {
                return 4;
           })
           .style("fill", function(d) { return color(d.TYPE); })
           .on("click", user_clicked);

        // draw legend
        var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(30," + (height - (4*16) + (i * 16)) + ")"; })
            .on("click", legend_click);

          // draw legend colored rectangles
        legend.append("circle")
            .attr("r", 4)
            .style("fill", color);

        // draw legend text
        legend.append("text")
            .attr("x", 15)
            .attr("dy", ".25em")
            .attr("fill", "white")
            .text(function(d) { return d;});
    });

});

function get_xyz(d) {
    var bounds = path.bounds(d);
    var w_scale = (bounds[1][0] - bounds[0][0]) / width;
    var h_scale = (bounds[1][1] - bounds[0][1]) / height;
    var z = .96 / Math.max(w_scale, h_scale);
    var x = (bounds[1][0] + bounds[0][0]) / 2;
    var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
    return [x, y, z];
}

function zoom(xyz) {
  g.transition()
    .duration(750)
    .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    .selectAll(".countries")
    .style("stroke-width", 1.0 / xyz[2] + "px");
}

function legend_click(d) {
    var active = d.active ? false : true,
    newOpacity = active ? 0 : 1;
    d3.select("#tag"+d.key.replace(/\s+/g, ''))
        .transition().duration(100)
        .style("opacity", newOpacity);
    d.active = active;  
}

function country_clicked(d) {
  if (d && country !== d) {
    var xyz = get_xyz(d);
    country = d;
    zoom(xyz);
  } else {
    var xyz = [width / 2, height / 1.55, 1];
    country = null;
    zoom(xyz);
  }
}

function reset() {
  g.selectAll(".active").classed("active", active = false);
  g.transition().duration(750).attr("transform", "");
}

$(window).resize(function() {
  var w = $("#loris-map").width();
  svg.attr("width", w);
  svg.attr("height", w * height / width);
});