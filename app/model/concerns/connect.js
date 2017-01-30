import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database(':memory:');
db.serialize();

export default () => {
  db.on('error', (err) => {
    if (err) throw err;
  });

  db.run(
    "CREATE TABLE IF NOT EXISTS sample ("
      + "id INTEGER PRIMARY KEY AUTOINCREMENT, "
      + "title TEXT NOT NULL ,"
      + "created TEXT NOT NULL)"
  );
};

export { db };
