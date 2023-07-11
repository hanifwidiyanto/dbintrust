import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import { bcryptService } from "../../services/bcrypt.service.js";

import { v4 as uuidv4 } from "uuid";

import { Writer } from "../Post/Writer.js";

const hooks = {
  beforeSave(user) {
    if (user.changed("password")) {
      user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
    }
  },
};

export const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { hooks }
);

User.hasMany(Writer, { foreignKey: "user_id" });
Writer.belongsTo(User, { foreignKey: "user_id" });