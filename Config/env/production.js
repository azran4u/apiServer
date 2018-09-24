let config = {
    env: 'production',
    db: 'mongodb://localhost/contacts',
    webServerPort: process.env.PORT || 8080
};

module.exports = config;