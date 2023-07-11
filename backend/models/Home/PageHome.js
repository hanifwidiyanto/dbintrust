import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

import { HeadlineHome } from "./HeadlineHome.js";
import { QuickLink } from "./QuickLink.js";
import { TrendHome } from "./TrendHome.js";
import { AdHome } from "./AdHome.js";

export const PageHome = sequelize.define("page_home", {
  page_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ad_home_id: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // quickLink: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // trendPost: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // headline_home_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
  // subheadline_home_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
  // indepthstory_home_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
  // interview_home_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
  // trend_home_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // }
});

// Define associations if any



PageHome.hasMany(TrendHome, { foreignKey: "page_id" });
PageHome.hasOne(HeadlineHome, { foreignKey: "page_id" });
PageHome.hasMany(QuickLink, { foreignKey: "page_id" });

HeadlineHome.belongsTo(PageHome, { foreignKey: "page_id" });
QuickLink.belongsTo(PageHome, { foreignKey: "page_id" });
TrendHome.belongsTo(PageHome, { foreignKey: "page_id" });