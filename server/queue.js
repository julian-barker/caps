module.exports = class Queue {
  constructor() {
    this.data = {};
  }

  store(key, val) {
    this.data[key] = val; 
    console.log('added item');
    return val;
  }

  remove(id) {
    let item = this.data[id];
    delete this.data[id];
    console.log('removed item');
    return item;
  }

  read(key) {
    console.log('read item');
    return this.data[key];
  }
};

