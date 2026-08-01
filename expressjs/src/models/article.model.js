import { DataTypes } from "sequelize";
import sequelize from "../common/sequelize/connect.sequelize.js";

const Article = sequelize.define(
  "Article", //tên cục bộ sẽ sử dụng trong code/service
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Content: {
      type: DataTypes.TEXT,
      // allowNull: true, giá trị mặc định là true nên không cần khai báo
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: "id", // khóa chính của bảng tham chiếu
        model: "Users", // tên bảng tham chiếu trong db
      },
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN, // chỉ bao gồm 2 giá trị là 0 và 1 tương ứng với false và true
      allowNull: false,
      defaultValue: 0,
    },
    deletedAt: {
      type: "TIMESTAMP",
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
      ),
    },
  },
  {
    // tableName: "Articles_demo_code_first",
    tableName: "Articles", //tên bảng trong db
    timestamps: false //tắt tính năng tự động tạo 2 cột createdAt và updatedAt
  },
);

//db first 
//code first
// await Article.sync() // tạo bảng trong db nếu chưa tồn tại

export default Article;
