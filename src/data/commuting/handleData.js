const fs = require('fs');


const data = JSON.parse(fs.readFileSync('./ticket.json'));

let result = [];
data.forEach(item => {
  console.log('item.data.psr.results', item.data.psr.results)
  result = result.concat(item.data.psr.results);
});



result = result.filter(item => item.from_station_name === '昆山南');

fs.writeFileSync('fromKunshan.json', JSON.stringify(result))
// console.log('data', JSON.stringify(result))