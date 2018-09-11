import React, {Component} from "react";
import G2 from "@antv/g2";
import data from "../data/averageSum.json";
import durationData from "../data/duration.json";
import moment from "moment";

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
      // height: 800,
      // width: 500
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
  componentDidMount() {
    this.setLine();
    this.setRose();
  }

  render() {
    return (
      <div>
        <div>折线图</div>
        <div id="mountNode" />
        <div>玫瑰图</div>
        <div id="roseNode" />
      </div>
    );
  }
}

export default Home;
