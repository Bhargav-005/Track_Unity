import API from './api';

export const getProfile = async () => {
  const res = await API.get('/profile/me');
  return res.data;
};

export const submitOnboarding = async (data) => {
  const res = await API.post('/profile/onboarding', data);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put('/profile/update', data);
  return res.data;
};
