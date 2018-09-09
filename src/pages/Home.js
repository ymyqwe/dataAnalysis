import React, {Component} from "react";
import G2 from "@antv/g2";
import data from "../data/avgSum";
console.log(data);
class Home extends Component {
  componentDidMount() {
    var chart = new G2.Chart({
      container: "mountNode",
      forceFit: true,
      height: window.innerHeight
    });
    chart.source(data);
    chart.scale("avg", {min: 0});
    chart.scale("month", {range: [0, 1]});
    chart.tooltip({
      crosshairs: {
        type: "line"
      }
    });
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
  }

  render() {
    return <div id="mountNode" />;
  }
}

export default Home;
