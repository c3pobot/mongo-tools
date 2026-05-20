import log from './logger.js'
import fs from 'fs'

const baseDir = '/app/data'

export default function(){
  try{
    let folders = fs.readdirSync(baseDir)
    if(!folders || folders?.length == 0) return
    for(let i in folders){
      let stats = fs.statSync(`${baseDir}/${folders[i]}`)
      if(!stats?.isDirectory()) continue
      
      if((Date.now() - stats.ctimeMs) > (7 * 86400 * 1000) ) fs.rmSync(`${baseDir}/${folders[i]}`, { recursive: true, force: true })
    }
  }catch(e){
    log.error(e)
  }
}
