module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port : process.env.API_PORT || 3000,
    },
    post: {
        port : process.env.POST_PORT || 3002,
    },
    jwt: {
        secret : process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '1EY9rDXj7k',
        password: process.env.MYSQL_PASS || '1KXc6fFKrA',
        database: process.env.MYSQL_DB || '1EY9rDXj7k',
    },
    mysqlService: {
        host : process.env.MYSQL_SRV_HOST || 'localhost',
        port : process.env.MYSQL_SRV_PORT || 3001,
    },
    cacheService: {
        host : process.env.CACHE_SRV_HOST || 'localhost',
        port : process.env.CACHE_SRV_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-14187.c16.us-east-1-3.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || '14187',
        password: process.env.REDIS_PASS || 'Rfc5FIQOuiOrzhNa6Pj5fw5XeqozNYxK',
    },
}