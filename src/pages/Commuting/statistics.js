import React, { Component } from 'react';
import { Chart } from '@antv/g2';
import data from '../../data/commuting/handledTrainData.json';
import { min } from 'moment';

class Home extends Component {
  componentDidMount() {
    const chart = new Chart({
      container: 'container',
      // autoFit: true,
      height: 500,
      width: 800,
      // padding: [20],
    });

    chart.data(data);
    chart.scale({
      start_date: {
        alias: '日期',
        type: 'time',
      },
      minutes: {
        alias: '出发时间',
        sync: true, // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
        ticks: [500, 520, 540, 560, 580, 600],
        formatter: (text, item) => {
          const hour = Math.floor(Number(text) / 60);
          const minutes = Number(text) % 60;
          console.log('textt', text);
          return `${hour < 10 ? '0' + hour : hour}:${minutes === 0 ? '00' : minutes}`;
        },
      },
      count: {
        alias: '次数',
      },
    });

    chart.axis('minutes', {
      label: {},
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart
      .line()
      .position('start_date*minutes')
      .color('status_name', ['#1890ff', '#ced4d9']);

    chart
      .point()
      .position('start_date*minutes')
      .color('status_name')
      .shape('circle');
    // chart
    //   .line()
    //   .position('date*time')
    //   .color('#9AD681')
    //   .shape('dash');

    chart.render();
  }

  render() {
    return (
      <div>
        <div>折线图</div>
        <div id="container" style={{ padding: '50px' }} />
      </div>
    );
  }
}

export default Home;
