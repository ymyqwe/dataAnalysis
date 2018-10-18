const fs = require("fs");
const moment = require("moment");

var data = JSON.parse(fs.readFileSync("./overall.json"));

var result = [];

data.forEach(element => {
  element.data.forEach(detail => {
    // var duration = detail.duration;
    var endTime =
      moment(detail.endTs).hours() + moment(detail.endTs).minutes() / 60;
    var startTime =
      moment(detail.startTs).hours() + moment(detail.startTs).minutes() / 60;
    result.push({startTime, endTime});
  });
});

fs.writeFileSync("startEndDistribution.json", JSON.stringify(result));
