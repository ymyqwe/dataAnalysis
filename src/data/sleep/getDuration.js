const fs = require("fs");

var data = JSON.parse(fs.readFileSync("./durationDistribution.json"));

var result = [];

var keys = Object.keys(data);
keys.forEach(element => {
  if (element !== "total") {
    result.push({
      duration: Number(element),
      count: data[element],
      percent: Number((data[element] / data.total).toFixed(2))
    });
  }
});

// data.forEach(element => {
//   element.data.forEach(detail => {
//     var duration = detail.duration;
//     var hour = Math.round(duration / 3600);
//     console.log(result[hour]);
//     result.total++;
//     if (result[hour] !== undefined) {
//       result[hour] = result[hour] + 1;
//     } else {
//       result[hour] = 1;
//     }
//   });
// });

fs.writeFileSync("duration.json", JSON.stringify(result));
// console.log(result);
