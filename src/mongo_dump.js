import log from './logger.js'
import { spawn } from 'child_process'
function dump(opts){
  return new Promise((resolve)=>{
    let child = spawn('mongodump', opts)
    child.stderr.on('data', (data) => log.info(`${data}`));

    child.on('exit', (code) => {
      if (code === 0) {
        log.info('Backup successful!');
      } else {
        log.error(`Backup failed with code ${code}`);
      }
      resolve()
    });
  })
}
export default async function({ name, uri, db, collections }, output){
  try{
    if(!uri || !db || !output) return
    if(collections?.length > 0){
      for(let i in collections){
        log.info(`backing up ${name}`)
        let opts = [ `--uri=${uri}`, `--out=/app/data/${output}`, `--db=${db}`, `--collection=${collections[i]}`]
        await dump(opts)
      }
    }
  }catch(e){
    log.error(e)
  }
}
