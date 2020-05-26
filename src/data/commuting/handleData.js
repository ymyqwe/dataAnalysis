const fs = require('fs');

// 处理原始数据
// const data = JSON.parse(fs.readFileSync('./ticket.json'));

// let result = [];
// data.forEach(item => {
//   console.log('item.data.psr.results', item.data.psr.results)
//   result = result.concat(item.data.psr.results);
// });

// result = result.filter(item => item.from_station_name === '昆山南');

// fs.writeFileSync('fromKunshan.json', JSON.stringify(result))
// console.log('data', JSON.stringify(result))

// 处理加工后数据
const data = JSON.parse(fs.readFileSync('./handledTrainData.json'));
// let result = JSON.parse(JSON.stringify(data));
const result = data.map(item => {
  // const week_day = new Date(item.start_date).getDay();
  const timeArray = item.start_time.split(':');
  const minutes = Number(timeArray[0]) * 60 + Number(timeArray[1]);
  console.log(minutes);
  return { ...item, minutes };
  // if (item.status_name === '已出站') {
  //   newObj = { ...item, status_name: '已改签' };
  //   result.push(newObj);
  // }
});

fs.writeFileSync('handledTrainData.json', JSON.stringify(result));
