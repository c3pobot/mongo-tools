let logLevel = process.env.LOG_LEVEL || 'info';
function getTimeStamp(){
  let parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Etc/GMT+5',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(new Date())
  let map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return `${map.month}/${map.day}/${map.year} ${map.hour}:${map.minute}:${map.second}`
}
function error(err){
  try{
    console.error(`${getTimeStamp(Date.now())} ERROR ${err}`)
    if(err?.stack && logLevel == 'debug') console.error(err)
  }catch(e){
    console.error(e)
  }
}
function info(msg){
  try{
    console.log(`${getTimeStamp(Date.now())} INFO ${msg}`)
  }catch(e){
    console.error(e)
  }
}
function debug(msg){
  try{
    if(logLevel?.toLowerCase() !== 'debug') return
    console.log(`${getTimeStamp(Date.now())} DEBUG ${msg}`)
  }catch(e){
    console.error(e)
  }
}
export default { info, error, debug }
