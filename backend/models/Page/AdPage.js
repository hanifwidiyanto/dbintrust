import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { v4 as uuidv4 } from "uuid";


export const AdPage = sequelize.define("ad_page", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  altText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeAd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  page_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

