const config ={
    user:'systemLogin',
    password: 'Oracle123',
    server: 'LAPTOP-8PIRVAVU',
    database: 'AuctionSystem',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
    },
    port: 999
}

module.exports = config