module.exports = {
    env: 'production',
    mongodb: {
        database: "contactsProd",
        collection: "contactsProd"
    },
    webserver: {
        port: process.env.PORT || 8080
    }
};
