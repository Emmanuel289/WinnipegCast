// Model a table's schema with sequelize
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

    type: DataTypes.STRING,
    allowNull : false
  
  },


  windchill:{

    type: DataTypes.STRING,
    
  },

  humidex:{

    type: DataTypes.STRING,
    
  },

  uv:{

    type: DataTypes.STRING,
    
  },

  cloudPrecip: {
    type: DataTypes.STRING,
  }
}, {
  
  sequelize, 
  modelName: 'WeeklyForecast' 
});

module.exports = WeeklyForecast;

