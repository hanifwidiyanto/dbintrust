import { DataTypes } from "sequelize";
import sequelize from '../../config/database.js'

import { v4 as uuidv4 } from "uuid";

export const Video = sequelize.define("video", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  idYoutube: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

