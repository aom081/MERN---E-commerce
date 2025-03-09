import api from "./api";
const API_URL = "/stripe";

const createCheckOutSession = async (data) => {
  return await api.post(`${API_URL}/create-checkout-session`, data);
};

const stripsService = {
  createCheckOutSession,
};
export default stripsService;
