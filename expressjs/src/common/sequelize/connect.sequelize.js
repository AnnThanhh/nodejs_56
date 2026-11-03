import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../constants/app.constant.js";

//tạo kết nối tới db
const sequelize = new Sequelize(DATABASE_URL)

//kiểm tra kết nối
try {
  await sequelize.authenticate();
  console.log('✅ [SEQUELIZE] Connection has been established successfully.');
} catch (error) {
  console.error('❌ [SEQUELIZE] Unable to connect to the database:', error);
}

export default sequelize;
