import React, {Component} from "react";
import euroData from "../data/euro/routes.json";
import "./euro.css";

export default class Euro extends Component {
  componentDidMount() {
    var map = new window.google.maps.Map(window.d3.select("#map").node(), {
      zoom: 6.5,
      center: new window.google.maps.LatLng(48.17312, 11.038454),
      mapTypeId: "roadmap",
      styles: [
        {
          featureType: "administrative.locality",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        }
      ]
    });

    var overlay = new window.google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
      var layer = window.d3
        .select(this.getPanes().overlayLayer)
        .append("div")
        .attr("class", "stations");

      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      overlay.draw = function() {
        var projection = this.getProjection(),
          padding = 10;

        layer.select("svg").remove();
        var svg = layer
          .append("svg")
          .attr("width", 800)
          .attr("height", 800);

        var node = svg
          .selectAll(".stations")
          .data(euroData.nodes)
          .enter()
          .append("g")
          .each(transform)
          .attr("class", "node");

        var link = svg
          .selectAll(".link")
          .data(euroData.links)
          .enter()
          .append("line")
          .attr("class", "link")
          .attr("fill", "white")
          .each(drawlink);

        node.append("circle").attr("r", 4.5);

        node
          .append("text")
          .attr("x", 7)
          .attr("y", 0)
          .attr("dy", ".31em")
          .attr("fill", "white")
          .text(function(d) {
            return d.name;
          });

        function latLongToPos(d) {
          var p = new window.google.maps.LatLng(d.lat, d.long);
          p = projection.fromLatLngToDivPixel(p);
          p.x = p.x - padding;
          p.y = p.y - padding;
          return p;
        }

        function transform(d) {
          var p = latLongToPos(d);
          return window.d3
            .select(this)
            .attr("transform", "translate(" + p.x + "," + p.y + ")");
        }

        function drawlink(d) {
          var p1 = latLongToPos(euroData.nodes[d.source]),
            p2 = latLongToPos(euroData.nodes[d.target]);
          window.d3
            .select(this)
            .attr("x1", p1.x)
            .attr("y1", p1.y)
            .attr("x2", p2.x)
            .attr("y2", p2.y)
            .style("fill", "none")
            .style("stroke", "steelblue");
        }
        // var marker = layer
        //   .selectAll("svg")
        //   .data(window.d3.entries(euroData))
        //   .each(transform) // update existing markers
        //   .enter()
        //   .append("svg")
        //   .each(transform)
        //   .attr("class", "marker");

        // // Add a circle.
        // marker
        //   .append("circle")
        //   .attr("r", 4.5)
        //   .attr("cx", padding)
        //   .attr("cy", padding);

        // // Add a label.
        // marker
        //   .append("text")
        //   .attr("x", padding + 7)
        //   .attr("y", padding)
        //   .attr("dy", ".31em")
        //   .attr("fill", "white")
        //   .text(function(d) {
        //     return d.key;
        //   });

        // function transform(d) {
        //   d = new window.google.maps.LatLng(d.value[0], d.value[1]);
        //   d = projection.fromLatLngToDivPixel(d);
        //   return window.d3
        //     .select(this)
        //     .style("left", d.x - padding + "px")
        //     .style("top", d.y - padding + "px");
        // }
      };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
  }
  render() {
    return <div id="map" />;
  }
}
