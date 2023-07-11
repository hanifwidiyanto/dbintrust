import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { v4 as uuidv4 } from "uuid";

import { PageHome } from "./PageHome.js";

export const TrendHome = sequelize.define("trend_home", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  page_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations if any
