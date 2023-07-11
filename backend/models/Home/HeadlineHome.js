import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js'

import { v4 as uuidv4 } from "uuid";

import { PageHome } from "./PageHome.js";

export const HeadlineHome = sequelize.define("headline_home", {
  headline_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleHeadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlHeadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeHeadline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  page_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations if any

