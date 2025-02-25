require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USER || "root",
    password: process.env.DB_DEV_PASSWORD || null,
    database: process.env.DB_DEV_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_TEST_USER || "root",
    password: process.env.DB_TEST_PASSWORD || null,
    database: process.env.DB_TEST_NAME || "database_test",
    host: process.env.DB_TEST_HOST || "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_PROD_USER || "root",
    password: process.env.DB_PROD_PASSWORD || null,
    database: process.env.DB_PROD_NAME || "database_production",
    host: process.env.DB_PROD_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};
