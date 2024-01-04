const { defineConfig } = require("cypress");
const mysql = require('mysql')
// import {queryDB} from "./cypress/support/utils/api.js";
// const { queryDB} = require("./cypress/support/utils/api.js");
const connections = {
  stagingA: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
  },
  stagingB: {
    host: 'localhost',
    user: 'root',
    password: '***',
    database: 'users',
  },
}

// querying the database from Node
function queryDB(connectionInfo, query) {
  const connection = mysql.createConnection(connectionInfo)

  connection.connect()

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error)
      }

      connection.end()

      return resolve(results)
    })
  })
}


module.exports = defineConfig({
  // projectId: 'b5peg8',
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        // destructure the argument into the individual fields
        queryDatabase({ dbName, query }) {
          const connectionInfo = connections[dbName]

          if (!connectionInfo) {
            throw new Error(`Do not have DB connection under name ${dbName}`)
          }
          return queryDB(connectionInfo, query)
        },
      })
    },
  },


  env: {
    login_url: 'https://my.sagaftraplans.org/benmgr/',
    products_url: 'https://www.sagaftraplans.org',
    apiUrl: 'https://reqres.in/api/users',
    device: 'desktop',
    email: 'test@test.com',
    password: 'Cypress123',
    defaultCommandTimeout: '10',
    "DB": {
      "user": "myuser",
      "host": "127.0.0.1",
      "database": "testDB",
      "password": "pass",
      "port": 3305
    }
  },
});

