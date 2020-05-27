import React, { Component } from 'react';
import { Chart } from '@antv/g2';
// import DataSet from '@antv/data-set';
import data from '../../data/commuting/rate.json';
//
console.log('data', data);
//
class Home extends Component {
  componentDidMount() {
    // dv.transform({
    //   type: 'bin.histogram',
    //   field: 'value',
    //   binWidth: 1,
    //   groupBy: ['type'],
    //   as: 'value'
    // });
    var chart = new Chart({
      container: 'mountNode',
      forceFit: true,
      height: window.innerHeight,
      padding: [20, 170, 50, 50],
    });
    chart.data(data);
    chart.scale('value', {
      alias: '权重分',
    });
    chart.axis('city', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      tickLine: {
        alignWithLabel: false,
        length: 0,
      },
    });
    chart.axis('value', {
      label: {
        textStyle: {
          fill: '#aaaaaa',
        },
      },
      title: {
        offset: 80,
      },
    });
    chart.legend({
      position: 'right-center',
    });
    chart.interval().position('city*value');
    chart.render();
  }

  render() {
    return (
      <div>
        <div>堆叠直方图</div>
        <div id="mountNode" />
      </div>
    );
  }
}

export default Home;
