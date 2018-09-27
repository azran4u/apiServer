module.exports = {
    env: "development",
    mongodb: {
        server: "mongodb://localhost",
        port: "27107",
        username: "root",
        password: "123456",
        database: "contacts",
        collection: "contacts"
    },
    webServer: {
        port: process.env.PORT || 8080
    }
};
