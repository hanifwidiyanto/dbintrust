import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { v4 as uuidv4 } from "uuid";

export const Opinion = sequelize.define("opinion", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgProfile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

