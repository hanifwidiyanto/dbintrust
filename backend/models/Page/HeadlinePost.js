import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js'

import { v4 as uuidv4 } from "uuid";

import { Page } from "./Page.js";

export const HeadlinePost = sequelize.define("headline_post", {
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
