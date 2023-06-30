import { instance1 } from '../axios';

export const apiGetDetailSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/infosong', { params: { id: sid } });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/song', { params: { id: sid } });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetDetailPlaylist = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/detailplaylist', { params: { id: pid } });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiSearch = (keyword) => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/search', { params: { keyword } });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
export const apiGetArtistSongs = (singerId) => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/artistsong', {
            params: {
                id: singerId,
                page: 1,
                count: 50
            }
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
export const apiGetArtist = (alias) => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/artist', { params: { name: alias, } });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
export const apiGetChartHome = () => new Promise(async (resolve, reject) => {
    try {
        const response = await instance1.get('/charthome');
        resolve(response);
    } catch (error) {
        reject(error);
    }
});
