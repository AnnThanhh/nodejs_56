import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    //lấy định dạng file
    const fileExt = path.extname(file.originalname);

    //tạo chuỗi ngẫu nhiên để đặt tên file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, "local" + "-" + uniqueSuffix + fileExt);
  },
});

export const uploadDiskStorage = multer({ storage: storage });

//img src= "http://localhost:3069/images/local-1786870666367-843932007.jpg" alt="avatar" />
