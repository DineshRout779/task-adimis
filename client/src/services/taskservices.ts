import { axiosClient } from './apiClient';

export const getAllTasks = async () => {
  return await axiosClient.get('/tasks');
};
