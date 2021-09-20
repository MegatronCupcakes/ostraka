export class LocalStorage {
    constructor(key){
        this._key = key;
        this._storage = _localStorageAvailable() ? window.localStorage : null;
    };

    get(){
        const _this = this;
        return new Promise((resolve, reject) => {
            try {
                const _data = _localStorageAvailable() ? JSON.parse(_this._storage.getItem(_this._key)) : null;
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
                if(_localStorageAvailable()) _this._storage.setItem(_this._key, JSON.stringify(value));
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
                if(_localStorageAvailable()) _this._storage.removeItem(_this._key);
                resolve();
            } catch(error){
                reject(error);
            }
        });
    }
}

// using iframes for shared embedded content can cause localStorage to be unavailable
const _localStorageAvailable = () => {
    try {
        return window && (typeof window.localStorage !== 'undefined');
    } catch(error){
        return false;
    }
};
