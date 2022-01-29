
function extendStageParams(options){
  let { startYear, startMonth, startDay, startTime, endTime } = options;
  const data = [...options.data] // 浅克隆一份数据
  const oDate = new Date();
  const curTime = oDate.getTime();
  const year = startYear || oDate.getFullYear();
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    days.splice(1, 1, 29);
  }
  const result = data.map((item) => {
    if (startDay > days[startMonth - 1]) {
      startDay = 1;
      startMonth++;
    }
    if (startMonth > 12) {
      startMonth = 1;
      startYear++;
    }
    if(startDay<10){
      startDay = `0${startDay}`
    }
    item.year = startYear;
    item.month = startMonth;
    item.day = parseInt(startDay);
    item.beginTime = `${startYear}/${startMonth}/${startDay} ${startTime}`;
    item.endTime = `${startYear}/${startMonth}/${startDay} ${endTime}`;
    const bTime = new Date(item.beginTime).getTime();
    const eTime = new Date(item.endTime).getTime();
    if (curTime < bTime) {
      item.current = false;
      item.unlock = false;
      item.expired = false;
    }
    if (curTime > bTime) {
      item.current = false;
      item.unlock = true;
    }
    if (curTime > bTime && curTime < eTime) {
      item.current = true;
      item.expired = false;
    }
    if (curTime > eTime) {
      item.expired = true;
    }
    startDay++;

    return item;
  });
  return result;
}

const obj = [
  {
    id:1,
    name:'初赛'
  },
  {
    id:2,
    name:'半决赛'
  },
  {
    id:3,
    name:'总决赛'
  }
]
console.log(111,obj)

const res = extendStageParams({
  data: obj,
  startYear: 2022,
  startMonth : 1,
  startDay:29,
  startTime: '08:30:00',
  endTime: '23:59:59',
})
console.log(res)