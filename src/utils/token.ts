import { jwtDecode } from 'jwt-decode';

export const isExpriredToken = (token: string) => {
  const decodedJwt = jwtDecode(token);
  return decodedJwt.exp! * 1000 < Date.now();
};
