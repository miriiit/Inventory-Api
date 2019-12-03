
const config = require('../config');
var whitelist = config.whiteListOrigins  || ['localhost:4001'];

//options for cors
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


// options for rate limiter
const rateLimitOpts = {
  //timeout: 1000 * 60 * 29,
  exactPath: true,
  cleanUpInterval: 0,
  errStatusCode: 429,
  errMessage: 'Too many requests made to this route.'
}

const dbCredt = {
  dbUser: process.env.NODE_ORACLEDB_USER || config.oracleDbUser,
  dbPassword: process.env.NODE_ORACLEDB_PASSWORD || config.oracleDbPwd,
  dbConnectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || config.oracleDbStr,
  dbExternalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
const dbOpts ={
  user: dbCredt.dbUser,
  password: dbCredt.dbPassword,
  connectString: dbCredt.dbConnectString,
  poolMax: 44,
  poolMin: 2,
  poolIncrement: 5,
  poolTimeout: 4
};

module.exports={corsOptionsDelegate, rateLimitOpts, dbOpts};