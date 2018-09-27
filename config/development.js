module.exports = {
    env: 'development',
    mongodb: {
        database: "contactsDev",
        collection: "contactsDev"
    },
    webserver: {
        port: process.env.PORT || 8080
    }
};
