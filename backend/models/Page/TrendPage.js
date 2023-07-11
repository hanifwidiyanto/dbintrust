import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js'

import { v4 as uuidv4 } from "uuid";

import { Page } from "./Page.js";

export const TrendPost = sequelize.define("trend_post", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  titlePost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkPost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rank:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  page_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations if any

