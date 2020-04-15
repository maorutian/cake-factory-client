//format date Date.now() to 2019-10-10 10:10:10

export function formateDate(time) {
  if (!time) return '';
  let date = new Date(time);
  return date.getFullYear() + '-' +
    ("0" + (date.getMonth() + 1)).slice(-2) + '-' +
    ("0" + (date.getDate())).slice(-2) + ' ' +
    ("0" + date.getHours()).slice(-2) + ':' +
    ("0" + date.getMinutes()).slice(-2) + ':' +
    ("0" + date.getSeconds()).slice(-2);
}