'use strict';

import { db } from './concerns/connect' ;

export default class Sample {
  find(title) {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM sample WHERE title LIKE '" + title + "%'", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM sample WHERE id = ?", [id], (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  add(title) {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO sample (title, created) VALUES (?, ?)", [title, (new Date).toString()], (err) => {
        if (err) reject(err);
        db.get("SELECT * FROM sample WHERE title = ?", [title], (e, res) => {
          if (e) reject(e);
          resolve(res);
        });
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM sample WHERE id = ?", [id], (err) => {
        if (err) return reject(err);
        resolve(id);
      });
    });
  }
}
