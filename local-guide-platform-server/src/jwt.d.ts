import { JwtPayload } from "jsonwebtoken";
import {
  CloudFile,
  CloudFiles,
  MulterFile,
  MulterFiles,
} from "./app/constants";

declare module "express-serve-static-core" {
  interface Request {
    decoded?: JwtPayload;
    file?: File | CloudFile | MulterFile;
    files?: File[] | CloudFiles | MulterFiles;
  }
}
