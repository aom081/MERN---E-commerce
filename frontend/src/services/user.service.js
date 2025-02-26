import api from "./api";
const API_URL = "/user";
const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};
const addUser = async (email) => {
  return await api.post(`${API_URL}/`, { email });
};

const getUsers = async () => {
  return await api.get(`${API_URL}/${id}`);
}

const updateUser = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
}

const deleteUser = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
}

const makeAdmin = async (id) => {
  return await api.put(`${API_URL}/admin/${id}`);
}

const makeUser = async (id) => {
  return await api.put(`${API_URL}/user/${id}`);
}
const UserService = {
  signJwt,
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  makeAdmin,
  makeUser,
};

export default UserService;
