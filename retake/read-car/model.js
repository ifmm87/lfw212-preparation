'use strict'

module.exports = {
  bicycle: bicycleModel()
}

function bicycleModel () {
  const db = {
    1: { brand: 'Veloretti', color: 'green' },
    2: { brand: 'Batavus', color: 'yellow'}
  }

  function read (id, cb) {
    if(!(db.hasOwnProperty(id))) {
      const err = Error('not found');
      setImmediate(() => {
        cb(err);
      })
      return;
    }
    setImmediate(() => {
      cb(null, db[id])
    })
  }

  function uid() {
    return Object.keys(db)
      .sort((a, b) => a -b)
      .map(Number)
      .filter(n => !isNaN(n))
      .pop() + 1 + ''
  }
  function create(data, cb) {
    db[uid()] = data;
    setImmediate(() => cb(null, db))
  }

  function update(id, data, cb) {
    if(!(db.hasOwnProperty(id))) {
      const err = Error('not found');
      setImmediate(() => cb(err));
      return;
    }
    db[id] = data;
    setImmediate(() => cb());
  }

  function del(id, cb) {
    if(!(db.hasOwnProperty(id))) {
      setImmediate(() => cb(new Error('not found')))
      return;
    }
    delete db[id];
    setImmediate(() => cb(null, id));
  }

  return { read, create, update, del, uid }
}
