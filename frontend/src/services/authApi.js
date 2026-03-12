import API from './api';

export const registerUser = async ({ name, email, gender, password, skills, domain, interestedRole }) => {
  const res = await API.post('/auth/register', { name, email, gender, password, skills, domain, interestedRole });
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const loginUser = async ({ email, password }) => {
  const res = await API.post('/auth/login', { email, password });
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
