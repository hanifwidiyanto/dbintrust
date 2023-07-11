import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js'

import { v4 as uuidv4 } from "uuid";

import { Page } from "./Page.js";


export const QuickLink = sequelize.define("quick_link_page", {
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
  keyword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  page_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations if any
