import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { v4 as uuidv4 } from 'uuid';
import { Page } from "../Page/Page.js";
import { Writer } from "./Writer.js";
import { AdPost } from "./AdPost.js";

export const Post = sequelize.define("post", {
  post_id: {
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
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  date: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type:{
    type:DataTypes.STRING,
    allowNull: true
  },
  page_id:{
    type:DataTypes.INTEGER,
    allowNull: false
  },
  writer_id:{
    type:DataTypes.STRING,
    allowNull: false
  }
});

// Define associations if any
Post.belongsTo(Page, { foreignKey: "page_id" });
Post.hasMany(AdPost, {foreignKey: "post_id"})

Page.hasMany(Post, { foreignKey: "page_id" });

AdPost.belongsTo(Post, { foreignKey: "post_id" });


