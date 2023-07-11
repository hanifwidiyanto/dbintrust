import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { v4 as uuidv4 } from 'uuid';

import { Post } from "./Post.js";

export const Writer = sequelize.define("writer", {
  writer_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations if any

Post.belongsTo(Writer, { foreignKey: "writer_id" });
Writer.hasMany(Post, { foreignKey: "writer_id" });


