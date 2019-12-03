
var oracledb = require("oracledb");

const config = require("../../config");

const { createDbPool } = require('../pool.js')

/* Connection Contain Variable */
var dbConnection;

var doConnect = function (callback) {

  if (dbConnection != null || dbConnection != undefined) {
    return callback(null, dbConnection);
  }
  createDbPool(async (err, pool) => {
    if (err) {
      console.log("ERROR: ", new Date(), ": createPool() callback: " + err.message);
      return callback(err);
    }
    await pool.getConnection(function (err, connection) {
      console.log("INFO: Module getConnection() called - attempting to retrieve a connection using the node-oracledb driver");
      if (err) {
        console.log("ERROR: Cannot get a connection: ", err);
        return callback(err);
      }
      // If pool is defined - show connectionsOpen and connectionsInUse
      if (typeof pool !== "undefined") {
        console.log("INFO: Connections open: " + pool.connectionsOpen);
        console.log("INFO: Connections in use: " + pool.connectionsInUse);
      }
      return callback(err, connection);
    });
  });
};
var doExecute = function (connection, sql, params, callback) {
  connection.execute(sql, params, { autoCommit: false, outFormat: oracledb.OBJECT, maxRows: 1000 }, function (err, result) {

    // Something went wrong - handle the data and release the connection
    if (err) {
      console.log("ERROR: Unable to execute the SQL: ", err);
      //releaseConnection(connection);
      return callback(err);
    }
    // Return the result to the request initiator
    // console.log("INFO: Result from Database: ", result)
    return callback(err, result);
  });
}

var doCommit = function (connection, callback) {
  connection.commit(function (err) {
    if (err) {
      console.log("ERROR: Unable to COMMIT transaction: ", err);
    }
    return callback(err, connection);
  });
}


var doRollback = function (connection, callback) {
  connection.rollback(function (err) {
    if (err) {
      console.log("ERROR: Unable to ROLLBACK transaction: ", err);
    }
    return callback(err, connection);
  });
}

var doRelease = function (connection) {
  if (connection) {
    connection.release(function (err) {
      if (err) {
        console.log("ERROR: Unable to RELEASE the connection: ", err);
      }
      return;
    });
  }
}

module.exports.doConnect = doConnect;
module.exports.doExecute = doExecute;
module.exports.doCommit = doCommit;
module.exports.doRollback = doRollback;
module.exports.doRelease = doRelease;