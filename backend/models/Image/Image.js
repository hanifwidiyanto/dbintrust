import {DataTypes} from "sequelize";
import sequelize from "../../config/database.js"

import { v4 as uuidv4 } from "uuid";
import { User } from "../Auth/User.js";

export const Image = sequelize.define("image", {
image_id:{
type: DataTypes.STRING,
primaryKey: true,
defaultValue: () => uuidv4(),
},
imageDesc: {
type:DataTypes.STRING,
allowNull: false
},
image: {
type:DataTypes.STRING,
allowNull: false
 },
user_id:{
type:DataTypes.STRING,
allowNull: false
},
date:{
type: DataTypes.BIGINT,
allowNull: false
}
});

User.hasMany(Image,{ foreignKey: "user_id"});
Image.belongsTo(User,{ foreignKey: "user_id"});
