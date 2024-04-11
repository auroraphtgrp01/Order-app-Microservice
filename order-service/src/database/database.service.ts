import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { Observable, finalize, from, map, switchMap } from 'rxjs';
import { resolveSql } from 'src/common/resolveSql';

@Injectable()
export class DatabaseService {
  constructor(@Inject('PG_POOL') private readonly pgService: Pool) {}
  query(sql: string, params?: any[]): Observable<any[]> {
    return from(this.pgService.connect()).pipe(
      switchMap((ins) => {
        return from(ins.query(sql, params)).pipe(
          map((res) => res.rows),
          finalize(() => ins.release()),
        );
      }),
    );
  }
  queryDatabase(fileName: string, params?: any) {
    const queryString = resolveSql(fileName, true) as string;
    return this.query(queryString, params);
  }
}
