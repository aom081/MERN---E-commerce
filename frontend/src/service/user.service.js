import api from "./api";
const API_URL = "/user";
const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};
const AddUser = async (user) => {
  return await api.post(`${API_URL}/`, { email });
};
const GetUser = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};
const UserServices = {
    signJwt,
    AddUser,
    GetUser,
};

export default UserServices;