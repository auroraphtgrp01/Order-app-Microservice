import { HttpException, HttpStatus } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';
import { Observer } from 'rxjs';

export const resolveSql = (
  filePath: string,
  toString?: boolean,
): Buffer | string => {
  const filePathResolve = path.resolve(process.cwd(), 'src', filePath);
  const dataFileResolve = toString
    ? readFileSync(filePathResolve, 'utf-8')
    : readFileSync(filePathResolve);
  return dataFileResolve;
};

const observer: Partial<Observer<any>> = {
  next: (result) => {
    console.log(result);
  },
  error: (error) => {
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  },
  complete: () => {},
};
