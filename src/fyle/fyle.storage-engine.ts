import { diskStorage } from 'multer';
import * as os from 'os';
import { extname, join } from 'path';
import { Account } from 'src/account/schemas/account.schema';

export const fyleStorageEngine = diskStorage({
  destination: function (request, file, cb) {
    const account = (request as any).user as Account;
    const uploadPath = join(os.homedir(), 'croft', account.accountID);

    cb(null, uploadPath);
  },
  filename: function (request, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});
