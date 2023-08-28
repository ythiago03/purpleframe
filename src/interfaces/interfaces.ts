export interface User {
  displayName: string; 
  email: string;
  phoneNumber: number|null;
  photoURL: string; 
  providerId: string; 
  uid: number;
  password: string;
}

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}
