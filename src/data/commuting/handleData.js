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
const data = JSON.parse(fs.readFileSync('./fromKunshan.json'));

const result = data.map(item => {
  const week_day = new Date(item.start_date).getDay();
  return {
    start_date: item.start_date,
    week_day,
    start_time: item.start_time,
    status_name: item.status_name
  }
})

fs.writeFileSync('handledTrainData.json', JSON.stringify(result));