//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://littleRobot:logmein1@ds249311.mlab.com:49311/uf_cen_bootcamp3', //place the URI of your mongo database here.
  }, 
  port: (process.env.PORT || 8080)
};