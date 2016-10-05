const md5 = require('md5');
const moment = require('moment');

const routes = module.exports = {
  gravatar: email => {
    return md5(email);
  },
  
}
