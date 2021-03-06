import React, { Component } from 'react';
import ruralLoveData from '../../data/ruralLove/relationship.json';
import './ruralLove.css';
import * as d3 from 'd3';

const data = ruralLoveData;
class index extends Component {
  componentDidMount() {
    var width = 1200;
    var height = 1000;

    var text = {
      nodes: [],
      links: [],
    };

    data.nodes.forEach(function(d, i) {
      text.nodes.push({ node: d });
      text.nodes.push({ node: d });
      text.links.push({
        source: i * 2,
        target: i * 2 + 1,
      });
    });

    console.log('text', data);
    var textLayout = d3
      .forceSimulation(text.nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force(
        'link',
        d3
          .forceLink(text.links)
          .distance(0)
          .strength(2)
      );

    var nodeLayout = d3
      .forceSimulation(data.nodes)
      .force('charge', d3.forceManyBody().strength(-10000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(1))
      .force('y', d3.forceY(height / 2).strength(1))
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id(function(d) {
            return d.id;
          })
          .distance(50)
          .strength(1)
      )
      .on('tick', ticked);

    var svg = d3
      .select(this.dom)
      .attr('width', width)
      .attr('height', height);
    var container = svg.append('g');

    var link = container
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', d => Math.sqrt(d.value));

    var linkText = container
      .append('g')
      .selectAll('text')
      .data(data.links)
      .enter()
      .append('text')
      .attr('class', 'link-text')
      .text(function(d, i) {
        return d.relathionship;
      });

    var node = container
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('image')
      .attr('x', -15)
      .attr('y', -45)
      .attr('width', 50)
      .attr('height', 50)
      .attr('xlink:href', function(d) {
        return d.avatar;
      })
      .on('mouseover', function(d, i) {
        //显示连接线上的文字
        linkText.style('fill-opacity', function(edge) {
          console.log('dddddddd', d.id, edge.source.id, edge.target.id);
          if (edge.source.id === d.id || edge.target.id === d.id) {
            console.log(d, edge);
            return 1.0;
          }
        });
      })
      .on('touchstart', function(d, i) {
        //显示连接线上的文字
        linkText.style('fill-opacity', function(edge) {
          console.log('dddddddd', d.id, edge.source.id, edge.target.id);
          if (edge.source.id === d.id || edge.target.id === d.id) {
            console.log(d, edge);
            return 1.0;
          }
        });
      })
      .on('touchend', function(d, i) {
        //隐去连接线上的文字
        linkText.style('fill-opacity', function(edge) {
          if (edge.source.id === d.id || edge.target.id === d.id) {
            return 0.0;
          }
        });
      })
      .on('mouseout', function(d, i) {
        //隐去连接线上的文字
        linkText.style('fill-opacity', function(edge) {
          if (edge.source.id === d.id || edge.target.id === d.id) {
            return 0.0;
          }
        });
      });

    // .enter()
    // .append('circle')
    // .attr('r', 5)
    // .attr('fill', function(d) {
    //   return color(d.group);
    // });

    var textNode = container
      .append('g')
      .attr('class', 'labelNodes')
      .selectAll('text')
      .data(text.nodes)
      .enter()
      .append('text')
      .text(function(d, i) {
        return i % 2 === 0 ? '' : d.node.id;
      })
      .style('fill', 'rgb(31, 119, 180);')
      .style('font-family', 'Arial')
      .style('font-size', 13);

    node.call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

    function ticked() {
      node.call(updateNode);
      link.call(updateLink);
      linkText.call(updateLinkText);

      textLayout.alphaTarget(0.3).restart();
      textNode.each(function(d, i) {
        d.x = d.node.x - 8;
        d.y = d.node.y + 20;
      });
      textNode.call(updateNode);
    }
    function fixna(x) {
      if (isFinite(x)) return x;
      return 0;
    }
    function updateLink(link) {
      link
        .attr('x1', function(d) {
          return fixna(d.source.x);
        })
        .attr('y1', function(d) {
          return fixna(d.source.y);
        })
        .attr('x2', function(d) {
          return fixna(d.target.x);
        })
        .attr('y2', function(d) {
          return fixna(d.target.y);
        });
    }
    function updateLinkText(linkText) {
      linkText.attr('transform', function(d) {
        return 'translate(' + fixna((d.source.x + d.target.x) / 2) + ',' + fixna((d.source.y + d.target.y) / 2) + ')';
      });
    }
    function updateNode(node) {
      node.attr('transform', function(d) {
        return 'translate(' + fixna(d.x) + ',' + fixna(d.y) + ')';
      });
    }
    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) nodeLayout.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) nodeLayout.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    return (
      <div className="container" style={{ width: '1200px', height: '1000px' }}>
        <h2 className="title">
          乡村爱情人物关系图 <span>(请在PC端体验)</span>
        </h2>
        <svg ref={dom => (this.dom = dom)} />
      </div>
    );
  }
}

export default index;
