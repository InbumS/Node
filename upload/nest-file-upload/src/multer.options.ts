import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOption = {
  // Use Disk Storage
  storage: diskStorage({
    // 파일 최상단 경로의 uploads
    destination: join(__dirname, '..', 'uploads'),
    filename: (req, file, cb) => {
      // 파일명 랜덤한 이름
      cb(null, randomUUID() + extname(file.originalname));
    },
  }),
};
