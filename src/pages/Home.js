import React, {Component} from "react";
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
import data from "../data/averageSum.json";
import durationData from "../data/duration.json";
import weekdayAvgData from "../data/weekdayDurationAvg.json";
import moment from "moment";
const DataView = DataSet.DataView;

class Home extends Component {
  setLine = () => {
    var chart = new G2.Chart({
      container: "mountNode",
      forceFit: true,
      height: window.innerHeight
    });
    var newData = data.map(element => {
      element.avg = Number((element.avg / 3600).toFixed(2));
      var duration = moment.duration(element.avg * 1000);
      element.timeString = `${
        duration.get("hours") ? duration.get("hours") + "小时" : ""
      }${
        duration.get("minutes") ? duration.get("minutes") + "分" : ""
      }${duration.get("seconds")}`;
      return element;
    });
    chart.source(newData);
    chart.scale("avg", {
      min: 0,
      alias: "睡眠平均时间(小时)"
    });
    chart.scale("month", {range: [0, 1], alias: "月份", label: "月份"});
    chart.tooltip();
    chart.line().position("month*avg");
    chart
      .point()
      .position("month*avg")
      .size(4)
      .shape("circle")
      .style({
        stroke: "#fff",
        lineWidth: 1
      });
    chart.render();
  };
  setRose = () => {
    var chart = new G2.Chart({
      container: "roseNode",
      forceFit: true
    });
    chart.source(durationData, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + "%";
          return val;
        }
      }
    });
    chart.coord("theta", {
      radius: 0.75
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}次</li>'
    });
    chart
      .intervalStack()
      .position("percent")
      .color("duration")
      .label("percent", {
        formatter: function formatter(val, item) {
          return item.point.duration + ": " + val;
        }
      })
      .tooltip("duration*count", function(duration, count) {
        return {
          name: duration,
          value: count
        };
      })
      .style({
        lineWidth: 1,
        stroke: "#fff"
      });
    chart.render();
  };
  setRadar = () => {
    console.log(weekdayAvgData);
    // var dv = ds.createView().source(weekdayAvgData);
    var newData = weekdayAvgData.map(one => {
      one.duration = Number((one.duration / 3600).toFixed(2));
      one.weekday = "星期" + one.weekday;
      return one;
    });
    var dv = new DataView().source(newData);
    dv.transform({
      type: "fold",
      fields: ["duration"], // 展开字段集
      key: "weekDay", // key字段
      value: "time" // value字段
    });
    var chart = new G2.Chart({
      container: "radarNode",
      forceFit: true,
      height: window.innerHeight,
      padding: [20, 20, 95, 20]
    });
    chart.source(dv, {
      time: {
        min: 6,
        max: 8
      }
    });
    chart.coord("polar", {
      radius: 0.8
    });
    chart.axis("weekday", {
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          lineDash: null
        },
        hideFirstLine: false
      }
    });
    chart.axis("time", {
      line: null,
      tickLine: null,
      grid: {
        type: "polygon",
        lineStyle: {
          lineDash: null
        }
      }
    });
    chart.legend("weekDay", {
      marker: "circle",
      offset: 30
    });
    chart
      .line()
      .position("weekday*time")
      .color("weekDay")
      .size(2);
    chart
      .point()
      .position("weekday*time")
      .color("weekDay")
      .shape("circle")
      .size(4)
      .style({
        stroke: "#fff",
        lineWidth: 1,
        fillOpacity: 1
      });
    chart
      .area()
      .position("weekday*time")
      .color("weekDay");
    chart.render();
  };
  componentDidMount() {
    this.setLine();
    this.setRose();
    this.setRadar();
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
      </div>
    );
  }
}

export default Home;
