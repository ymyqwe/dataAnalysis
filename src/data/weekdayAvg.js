const fs = require("fs");
const moment = require("moment");

var data = JSON.parse(fs.readFileSync("./overall.json"));

var result = [];

const weekdayObj = {
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六",
  7: "星期天"
};

data.forEach(element => {
  element.data.forEach(detail => {
    var duration = detail.duration;
    var nowWeekday = moment(detail.endTs).weekday();
    if (result[nowWeekday] === undefined) {
      result[nowWeekday] = {
        duration: [duration],
        awakeTime: [detail.awakeTime],
        lightSleepTime: [detail.lightSleepTime],
        soundSleepTime: [detail.soundSleepTime]
      };
    } else {
      result[nowWeekday].duration.push(duration);
      result[nowWeekday].awakeTime.push(detail.awakeTime);
      result[nowWeekday].lightSleepTime.push(detail.lightSleepTime);
      result[nowWeekday].soundSleepTime.push(detail.soundSleepTime);
    }
  });
});
var duration = [],
  awakeTime = [],
  lightSleepTime = [],
  soundSleepTime = [],
  overallData = [];
result.forEach((element, index) => {
  var nowData = {
    weekday: weekdayObj[index + 1]
  };
  var durationAvg =
    element.duration.reduce((previous, current) => (current += previous)) /
    element.duration.length;
  // var durationObj = {
  //   duration: durationAvg,
  //   weekday: String(index + 1)
  // };
  nowData.duration = durationAvg;
  // duration.push(durationObj);
  var awakeTimeAvg =
    element.awakeTime.reduce((previous, current) => (current += previous)) /
    element.awakeTime.length;
  var awakeTimeObj = {
    awakeTime: awakeTimeAvg,
    weekday: String(index + 1)
  };
  nowData.awakeTime = awakeTimeAvg;
  // awakeTime.push(awakeTimeObj);
  var lightSleepTimeAvg =
    element.lightSleepTime.reduce(
      (previous, current) => (current += previous)
    ) / element.lightSleepTime.length;
  var lightSleepTimeObj = {
    lightSleepTime: lightSleepTimeAvg,
    weekday: String(index + 1)
  };
  nowData.lightSleepTime = lightSleepTimeAvg;
  // lightSleepTime.push(lightSleepTimeObj);
  var soundSleepTimeAvg =
    element.soundSleepTime.reduce(
      (previous, current) => (current += previous)
    ) / element.soundSleepTime.length;
  var soundSleepTimeObj = {
    soundSleepTime: soundSleepTimeAvg,
    weekday: String(index + 1)
  };
  nowData.soundSleepTime = soundSleepTimeAvg;
  // soundSleepTime.push(soundSleepTimeObj);
  overallData.push(nowData);
});
fs.writeFileSync("weekdayOverall.json", JSON.stringify(overallData));
// fs.writeFileSync("weekdayAwakeTimeAvg.json", JSON.stringify(awakeTime));
// fs.writeFileSync(
//   "weekdayLightSleepTimeAvg.json",
//   JSON.stringify(lightSleepTime)
// );
// fs.writeFileSync(
//   "weekdaySoundSleepTimeAvg.json",
//   JSON.stringify(soundSleepTime)
// );
// console.log(result);
