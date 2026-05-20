import log from './logger.js'
import cron from 'node-cron'
import runBackup from './run_backup.js'
cron.schedule('0 1 * * *', () => {
  runBackup()
});
