export class LocalStorage {
    constructor(key){
        this._key = key;
        this._storage = window.localStorage;
    };

    get(){
        const _this = this;
        return new Promise((resolve, reject) => {
            try {
                const _data = JSON.parse(_this._storage.getItem(_this._key));
                resolve(_data);
            } catch(error){
                reject(error);
            }
        });
    }

    set(value){
        const _this = this;
        return new Promise((resolve, reject) => {
            try {
                _this._storage.setItem(_this._key, JSON.stringify(value));
                resolve();
            } catch(error){
                reject(error);
            }
        });
    }

    delete(){
        const _this = this;
        return new Promise((resolve, reject) => {
            try {
                _this._storage.removeItem(_this._key);
                resolve();
            } catch(error){
                reject(error);
            }
        });
    }
}
