const fs = require('fs');

var data = JSON.parse(fs.readFileSync('./overall.json'));

var result = {
  total: 0
};

data.forEach(element => {
  element.data.forEach(detail => {
    var duration = detail.duration;
    var hour = Math.round(duration / 3600);
    console.log(result[hour]);
    result.total++;
    if (result[hour] !== undefined) {
      result[hour] = result[hour] + 1;
    } else {
      result[hour] = 1;
    }
  });
});

fs.writeFileSync('durationDistribution.json', JSON.stringify(result));
console.log(result);
