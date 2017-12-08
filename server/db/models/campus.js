const Sequelize = require('sequelize');
const db = require('../index');

const defaultUrl = 'https://www.google.com/search?q=university&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi6ofaGhPHXAhUBFxQKHVmGCYMQ_AUIDCgD&biw=1440&bih=776#imgrc=19ToDaIcKTa18M:';

module.exports = db.define('campus', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: defaultUrl
    },
    description: {
      type: Sequelize.TEXT,
      allowNull:true
    }
  });