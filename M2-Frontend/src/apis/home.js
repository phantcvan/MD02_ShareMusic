import {instance1} from '../axios';

export const getHome = () => new Promise(async (resolve, reject) => {
    try {
      const response = await instance1.get('/home');
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const getTop100 = () => new Promise(async (resolve, reject) => {
    try {
      const response = await instance1.get('/top100');
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });