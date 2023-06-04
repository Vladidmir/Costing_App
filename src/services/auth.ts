import axios, {AxiosResponse} from 'axios';

import {API_KEY} from '@env';

type AuthMode = 'signUp' | 'signInWithPassword';

interface AuthResponse {
  idToken: string;
}

const authenticate = async (
  mode: AuthMode,
  email: string,
  password: string,
): Promise<string> => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response: AxiosResponse<AuthResponse> = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
};

export const createUser = async (
  email: string,
  password: string,
): Promise<string> => {
  return await authenticate('signUp', email, password);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<string> => {
  return await authenticate('signInWithPassword', email, password);
};
