import log from './logger.js'
import mongoDump from './mongo_dump.js'
import cleanOldFiles from './clean_old_files.js'

import fs from 'fs'
let config
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
  return `${map.year}_${map.month}_${map.day}_${map.hour}_${map.minute}_${map.second}`;
}
function getConfig(){
  try{
    let data = fs.readFileSync(`/app/src/config.json`)
    if(data) return JSON.parse(data)
  }catch(e){
    log.error(e)
  }
}
export default async function(){
  try{
    let config = getConfig()
    if(!config || config?.length == 0) return
    let output = getTimeStamp()
    if(!output) return
    for(let i in config){
      await mongoDump(config[i], output)
    }
    await cleanOldFiles()
  }catch(e){
    log.error(e)
  }
}
