const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('tasks.db'), {fileMustExist: true});

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function update(sql, params) {
  const stmt = db.prepare(sql);
  const info = stmt.run(params);

  return info;
}

module.exports = {
  query,
  update
}