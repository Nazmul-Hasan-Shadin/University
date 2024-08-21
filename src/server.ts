import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'
import seedSuperAdmin from './app/DB';

let server:Server;

async function main() {
  try {

    await mongoose.connect(config.database_url as string)
 
 await seedSuperAdmin()
   server= app.listen(config.port, () => {
      console.log('hi')
    

      console.log(`Example is app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on('unhandledRejection',()=>{
  console.log(`unhandle Rejection is detected, shutting down the server`);
  
  if (Server) {
     server.close(()=>{
      process.exit(1)
     })
  }
  process.exit(1)
})


process.on('uncaughtException',()=>{
  console.log('uncaughtexception detected shutting down');
  
  process.exit(1)
})