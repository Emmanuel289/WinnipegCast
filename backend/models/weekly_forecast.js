
// Import a table's attributes
const {DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');


class WeeklyForecast extends Model {}

WeeklyForecast.init({
 

  date_time_local: {
    type: DataTypes.STRING,
    allowNull: false
  },

  unixtime:{
      type: DataTypes.INTEGER
  },
  period_index:{
      type: DataTypes.INTEGER
  },

  period_string:{
      type: DataTypes.STRING
  },

  
  cloudprecip:{

    type: DataTypes.STRING
  },


  snowlevel:{

    type: DataTypes.STRING
  },

  visibility_wind:{

    type: DataTypes.STRING
  },

  visibility_other:{

    type: DataTypes.STRING
  },



  precipitation:{

    type: DataTypes.STRING
  },

  winds:{

    type: DataTypes.STRING
  },


  temperatures:{

    type: DataTypes.STRING
  },


  windchill:{

    type: DataTypes.STRING
  },

  humidex:{

    type: DataTypes.STRING
  },

  uv:{

    type: DataTypes.STRING
  },

  cloudPrecip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temperature: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'WeeklyForecast' // We need to choose the model name
});

module.exports = WeeklyForecast;

