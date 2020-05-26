import React, { Component } from 'react';
import { Chart } from '@antv/g2';
import data from '../../data/commuting/handledTrainData.json';

class Home extends Component {
  componentDidMount() {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.data(data);
    chart.scale({
      start_date: {
        alias: '日期',
        type: 'time',
      },
      start_time: {
        alias: '出发时间',
        min: 0,
        sync: true, // 将 pv 字段数值同 time 字段数值进行同步
        nice: true,
      },
      // count: {
      //   alias: '次数',
      // },
    });

    chart.axis('start_time', {
      title: {},
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart
      .line()
      .position('start_date*minutes')
      .color('status_name');

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
        <div id="container" />
      </div>
    );
  }
}

export default Home;
