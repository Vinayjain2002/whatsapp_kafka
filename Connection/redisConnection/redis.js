const redis= require('redis')
const dotenv= require('dotenv')

dotenv.config();
const redisClient=redis.createClient(process.env.REDIS_PORT)

// redis triggers client event not the connection
redisClient.on('connect',function(){
    console.log('redis connected')
} );

redisClient.on('error', function(err){
    console.log('redis error',err)
    process.exit(-1);
})

module.exports= redisClient;