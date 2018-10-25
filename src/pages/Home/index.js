import React, { Component } from 'react';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/sleep/averageSum.json';
import durationData from '../../data/sleep/duration.json';
import weekdayAvgData from '../../data/sleep/weekdayOverall.json';
import startEndDistributionData from '../../data/sleep/startEndDistribution.json';
import moment from 'moment';
const DataView = DataSet.DataView;

class Home extends Component {
  setLine = () => {
    var chart = new G2.Chart({
      container: 'mountNode',
      forceFit: true,
      padding: [20, 20, 40, 30]
    });
    var newData = data.map(element => {
      element.avg = Number((element.avg / 3600).toFixed(2));
      var duration = moment.duration(element.avg * 1000);
      element.timeString = `${
        duration.get('hours') ? duration.get('hours') + '小时' : ''
      }${
        duration.get('minutes') ? duration.get('minutes') + '分' : ''
      }${duration.get('seconds')}`;
      return element;
    });
    chart.source(newData);
    chart.scale('avg', {
      min: 5,
      max: 8,
      alias: '睡眠平均时间(小时)'
    });
    chart.scale('month', { range: [0, 1], alias: '月份', label: '月份' });
    chart.tooltip();
    chart.line().position('month*avg');
    chart
      .point()
      .position('month*avg')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    chart.render();
  };
  setRose = () => {
    var chart = new G2.Chart({
      container: 'roseNode',
      forceFit: true
    });
    chart.source(durationData, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + '%';
          return val;
        }
      }
    });
    chart.coord('theta', {
      radius: 0.75
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}次</li>'
    });
    chart
      .intervalStack()
      .position('percent')
      .color('duration')
      .label('percent', {
        formatter: function formatter(val, item) {
          return item.point.duration + ': ' + val;
        }
      })
      .tooltip('duration*count', function(duration, count) {
        return {
          name: duration,
          value: count
        };
      })
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  };
  setRadar = () => {
    console.log(weekdayAvgData);
    // var dv = ds.createView().source(weekdayAvgData);
    var newData = weekdayAvgData.map(one => {
      one.duration = Number((one.duration / 3600).toFixed(2));
      one.awakeTime = Number((one.awakeTime / 3600).toFixed(2));
      one.lightSleepTime = Number((one.lightSleepTime / 3600).toFixed(2));
      one.soundSleepTime = Number((one.soundSleepTime / 3600).toFixed(2));
      return one;
    });
    var dv = new DataView().source(newData);
    dv.transform({
      type: 'fold',
      fields: ['duration', 'lightSleepTime', 'soundSleepTime'], // 展开字段集
      key: 'weekDay', // key字段
      value: 'time' // value字段
    });
    var chart = new G2.Chart({
      container: 'radarNode',
      forceFit: true,
      height: window.innerHeight,
      padding: [20, 20, 95, 20]
    });
    chart.source(dv, {
      time: {
        min: 0,
        max: 8
      }
    });
    chart.coord('polar', {
      radius: 0.8
    });
    chart.axis('weekday', {
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          lineDash: null
        },
        hideFirstLine: false
      }
    });
    chart.axis('time', {
      line: null,
      tickLine: null,
      grid: {
        type: 'polygon',
        lineStyle: {
          lineDash: null
        }
      }
    });
    chart.legend('weekDay', {
      marker: 'circle',
      offset: 30
    });
    chart
      .line()
      .position('weekday*time')
      .color('weekDay')
      .size(2);
    chart
      .point()
      .position('weekday*time')
      .color('weekDay')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1
      });
    chart.render();
  };
  setBox = () => {
    var ds = new DataSet({
      state: {
        sizeEncoding: false
      }
    });
    var dv = ds.createView('diamond').source(startEndDistributionData);
    dv.transform({
      type: 'map',
      callback(row) {
        // 加工数据后返回新的一行，默认返回行数据本身
        if (row.startTime > 12) {
          row.startTime = row.startTime - 24;
        }
        return row;
      }
    });
    dv.transform({
      sizeByCount: false, // calculate bin size by binning count
      type: 'bin.rectangle',
      fields: ['startTime', 'endTime'], // 对应坐标轴上的一个点
      bins: [20, 10]
    });

    var chart = new G2.Chart({
      container: 'boxNode',
      forceFit: true,
      height: window.innerHeight
    });
    chart.source(dv);
    chart.legend({
      // offset: 40
    });
    chart.axis('x', {
      label: {
        formatter: val => {
          console.log(val, typeof val);
          if (val < 0) {
            return Number(val) + 24 + ':00';
          } else {
            return val + ':00';
          }
        }
      }
    });
    chart.axis('y', {
      label: {
        formatter: val => val + ':00'
      }
    });
    chart.tooltip(false);
    chart
      .polygon()
      .position('x*y')
      .color('count', '#BAE7FF-#1890FF-#0050B3');
    chart.render();
  };
  componentDidMount() {
    this.setLine();
    this.setRose();
    this.setRadar();
    this.setBox();
  }

  render() {
    return (
      <div>
        <div>折线图</div>
        <div id="mountNode" />
        <div>玫瑰图</div>
        <div id="roseNode" />
        <div>雷达图</div>
        <div id="radarNode" />
        <div>分箱图</div>
        <div id="boxNode" />
      </div>
    );
  }
}

export default Home;
