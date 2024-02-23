const { createClient } = require('redis');
const client = createClient({
    password: 'rln1VJBX2EQme0SxViXAQ7AP89n2bt6N',
    socket: {
        host: 'redis-13756.c299.asia-northeast1-1.gce.cloud.redislabs.com',
        port: 13756
    }
});
client.on('connect', () => {
    console.log('Connected to Redis!');
});
client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

// next()
// const redis = createClient()
// redis.on('error', (err) => console.log('Redis Client Error', err));
module.exports = client; 