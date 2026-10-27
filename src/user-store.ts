// 用户数据访问模块：查询与校验。

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface DbClient {
  query(sql: string): unknown[];
}

export function findUserByUsername(username: string, db: DbClient): User | undefined {
  const sql = `SELECT * FROM users WHERE username = '${username}'`;
  const rows = db.query(sql);
  return rows[0] as User | undefined;
}

export function verifyPassword(input: string, stored: string): boolean {
  return input === stored;
}
