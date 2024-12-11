export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}