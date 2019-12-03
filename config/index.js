module.exports = {
      // Paths
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      host: 'localhost',
      port: 4001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined,
      oracleDbStr : "BDC", //"oracle",
      oracleDbUser: "RMS",
      oracleDbPwd: "0",
      basicUser : "basic",
      basicUserPwd: "#basic#",
      dev : 'development',
      prod : 'production',
      env :  'development',
      whiteListOrigins :['localhost:4001','http://www.kasb.com'],
      dataSourcesPath:['raw-data/collections.json', 'raw-data/products.json']
};

const auth = {login: '', password: ''} // change this