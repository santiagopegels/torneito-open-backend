export interface AuthAdapter {
  login(email: string, password: string);

  register(email: string, password: string);
}
