import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
const storage = new MMKV();


const reduxStorage: Storage={
    setItem:(key,val)=>{
        storage.set(key,val)
        return Promise.resolve(true)
    },
    getItem: (key)=>{
        const value = storage.getString(key);
        return Promise.resolve(value)
    },
    removeItem:(key)=>{
        storage.delete(key)
        return Promise.resolve()
    }
}
export default reduxStorage