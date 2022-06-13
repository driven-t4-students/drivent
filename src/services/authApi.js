import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function githubLogin(code) {
  const response = await api.post('auth/github/login', { code });
  return response;
}
