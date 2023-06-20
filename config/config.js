require("dotenv").config();
const { username, password, database, host, dialect } = process.env;
module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
};
