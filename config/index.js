const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

module.exports = {
  PORT: process.env.NODE_PORT,
};
