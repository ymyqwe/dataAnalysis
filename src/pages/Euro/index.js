import React, { Component } from 'react';
import euroData from '../../data/euro/routes.json';
import './euro.css';
import d3 from 'd3';

export default class Euro extends Component {
  componentDidMount() {
    var map = new window.google.maps.Map(d3.select('#map').node(), {
      zoom: 6.5,
      center: new window.google.maps.LatLng(48.17312, 11.038454),
      mapTypeId: 'roadmap',
      styles: [
        {
          featureType: 'administrative.locality',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        }
      ]
    });

    var overlay = new window.google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
      var layer = d3
        .select(this.getPanes().overlayLayer)
        .append('div')
        .attr('class', 'stations');

      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      overlay.draw = function() {
        var projection = this.getProjection();

        layer.select('svg').remove();
        var svg = layer
          .append('svg')
          .attr('width', window.innerWidth)
          .attr('height', window.innerHeight);

        var lineFunction = d3.svg
          .line()
          .x(function(d) {
            console.log(latLongToPos(d));
            return latLongToPos(d).x;
          })
          .y(function(d) {
            return latLongToPos(d).y;
          })
          .interpolate('monotone');

        svg
          .append('path')
          .attr('d', lineFunction(euroData.nodes))
          .attr('stroke', '#00b2ff')
          .attr('stroke-width', 4)
          .attr('fill', 'none')
          .call(transition);

        function transition(path) {
          path
            .transition()
            .duration(8000)
            .attrTween('stroke-dasharray', tweenDash)
            .each('end', function() {
              d3.select(this).call(transition);
            });
        }

        function tweenDash() {
          var l = this.getTotalLength(),
            i = d3.interpolateString('0,' + l, l + ',' + l);
          return function(t) {
            return i(t);
          };
        }
        var node = svg
          .selectAll('.stations')
          .data(euroData.nodes)
          .enter()
          .append('g')
          .each(transform)
          .attr('class', 'node');

        // var link = svg
        //   .selectAll('.link')
        //   .data(euroData.links)
        //   .enter()
        //   .append('line')
        //   .attr('class', 'link')
        //   .attr('fill', 'white')
        //   .each(drawlink);

        node.append('circle').attr('r', 4.5);

        node
          .append('text')
          .attr('x', (d) => d.offsetX)
          .attr('y', (d) => d.offsetY)
          .attr('dy', '.31em')
          .attr('fill', 'black')
          .text(function(d) {
            return d.name;
          });

        function latLongToPos(d) {
          var p = new window.google.maps.LatLng(d.lat, d.long);
          p = projection.fromLatLngToDivPixel(p);
          return p;
        }

        function transform(d) {
          var p = latLongToPos(d);
          return d3.select(this).attr('transform', 'translate(' + p.x + ',' + p.y + ')');
        }
      };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
  }
  render() {
    return <div id="map" style={{ width: window.innerWidth, height: window.innerHeight }} />;
  }
}
