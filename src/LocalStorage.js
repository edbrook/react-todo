export default class LocalStorage {
  constructor(prefix) {
    this.prefix = prefix;
    this.observers = [];
  }

  registerListener(ob) {
    this.observers.push(ob);
  }

  unregisterListener(ob) {
    const idx = this.observers.indexOf(ob);
    this.observers.splice(idx, 1);
  }

  setItem(key, value) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
    this._notifyObservers();
  }

  removeItem(key) {
    localStorage.removeItem(this.prefix + key);
    this._notifyObservers();
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }

  getItems(filter = () => true) {
    const keys = Object.keys(localStorage).filter(k => {
      return filter(k.substr(this.prefix.length));
    });
    const items = [];
    for (let key of keys) {
      const item = JSON.parse(localStorage.getItem(key));
      items.push(item);
    }
    return items;
  }

  _notifyObservers() {
    for (let ob of this.observers) {
      ob.onUpdate(this);
    }
  }
}