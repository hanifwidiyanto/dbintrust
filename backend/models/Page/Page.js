import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { Post } from "../Post/Post.js";
import { HeadlinePost } from "./HeadlinePost.js";
import { AdPage } from "./AdPage.js";
import { QuickLink } from "./QuickLink.js";
import { TrendPost } from "./TrendPage.js";

export const Page = sequelize.define("page", {
  page_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // mainPost: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // subMainPost: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // listPost: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // adPage: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // quickLink: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // trendPost: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});


Page.hasMany(HeadlinePost, { foreignKey: "page_id" });
Page.hasMany(AdPage, { foreignKey: "page_id" });
Page.hasMany(QuickLink, { foreignKey: "page_id" });
Page.hasMany(TrendPost, { foreignKey: "page_id" });

HeadlinePost.belongsTo(Page, { foreignKey: "page_id" });
AdPage.belongsTo(Page, { foreignKey: "page_id" });
QuickLink.belongsTo(Page, { foreignKey: "page_id" });
TrendPost.belongsTo(Page, { foreignKey: "page_id" });