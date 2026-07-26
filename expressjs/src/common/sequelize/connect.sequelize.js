import { Sequelize } from "sequelize";

//tạo kết nối tới db
const sequelize = new Sequelize('mysql://root:12345@localhost:3307/nodejs_56')

//kiểm tra kết nối
try {
  await sequelize.authenticate();
  console.log('✅ [SEQUELIZE] Connection has been established successfully.');
} catch (error) {
  console.error('❌ [SEQUELIZE] Unable to connect to the database:', error);
}

export default sequelize;