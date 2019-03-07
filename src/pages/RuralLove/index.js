import React, { Component } from 'react';
import ruralLoveData from '../../data/ruralLove/relationship.json';
// import './euro.css';
import * as d3 from 'd3';

const data = ruralLoveData;
class index extends Component {
  color = () => {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return (d) => scale(d.group);
  };
  drag = (simulation) => {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };
  componentDidMount() {
    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));
    const texts = data.nodes.map((d) => Object.create(d));
    const width = 1200,
      height = 600;

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    var textSimulation = d3
      .forceSimulation(texts)
      .force('link', d3.forceLink(links).id((d) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3
      .select(this.dom)
      .attr('width', width)
      .attr('height', height);

    var container = svg.append('g');

    const link = container
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = container
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 4)
      .attr('fill', this.color())
      .call(this.drag(simulation));

    const text = container
      .append('g')
      .selectAll('text')
      .data(texts)
      .join('text')
      .text((d) => d.id)
      .attr('fill', 'red')
      .call(this.drag(simulation));
    // const texts = svg
    //   .selectAll('text')
    //   .data(nodes)
    //   .enter()
    //   .filter((d) => d.value >= 30)
    //   .append('text')
    //   .attr('font-family', 'sans-serif')
    //   .attr('dx', 12)
    //   .attr('dy', '0.35em')
    //   .text((d) => d.id);
    // node
    //   // .attr('x', (d) => d.offsetX)
    //   .append('text')
    //   .attr('y', 60)
    //   .attr('x', 0)
    //   .attr('fill', 'black')
    //   .text(function(d) {
    //     return d.id;
    //   });
    // .append('title').text((d) => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      textSimulation.alphaTarget(0.3).restart();
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      text.attr('x', (d) => d.x).attr('y', (d) => d.y);
      // text.call(updateNode);
    });

    function updateNode(node) {
      node.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    }
    // invalidation.then(() => simulation.stop());

    svg.node();
  }
  render() {
    return (
      <div style={{ width: '1200px', height: '600px' }}>
        <svg ref={(dom) => (this.dom = dom)} />
      </div>
    );
  }
}

export default index;
