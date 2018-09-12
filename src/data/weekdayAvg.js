const fs = require("fs");
const moment = require("moment");

var data = JSON.parse(fs.readFileSync("./overall.json"));

var result = [];

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
  soundSleepTime = [];
result.forEach((element, index) => {
  var durationAvg =
    element.duration.reduce((previous, current) => (current += previous)) /
    element.duration.length;
  var durationObj = {
    duration: durationAvg,
    weekday: String(index + 1)
  };
  duration.push(durationObj);
  var awakeTimeAvg =
    element.awakeTime.reduce((previous, current) => (current += previous)) /
    element.awakeTime.length;
  var awakeTimeObj = {
    awakeTime: awakeTimeAvg,
    weekday: String(index + 1)
  };
  awakeTime.push(awakeTimeObj);
  var lightSleepTimeAvg =
    element.lightSleepTime.reduce(
      (previous, current) => (current += previous)
    ) / element.lightSleepTime.length;
  var lightSleepTimeObj = {
    lightSleepTime: lightSleepTimeAvg,
    weekday: String(index + 1)
  };
  lightSleepTime.push(lightSleepTimeObj);
  var soundSleepTimeAvg =
    element.soundSleepTime.reduce(
      (previous, current) => (current += previous)
    ) / element.soundSleepTime.length;
  var soundSleepTimeObj = {
    soundSleepTime: soundSleepTimeAvg,
    weekday: String(index + 1)
  };
  soundSleepTime.push(soundSleepTimeObj);
});
fs.writeFileSync("weekdayDurationAvg.json", JSON.stringify(duration));
fs.writeFileSync("weekdayAwakeTimeAvg.json", JSON.stringify(awakeTime));
fs.writeFileSync(
  "weekdayLightSleepTimeAvg.json",
  JSON.stringify(lightSleepTime)
);
fs.writeFileSync(
  "weekdaySoundSleepTimeAvg.json",
  JSON.stringify(soundSleepTime)
);
// console.log(result);
