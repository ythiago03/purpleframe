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

export interface Post {
  description?: string;
  postImg?: string;
  userId?: string;
  userImg?: string|null|undefined;
  username?: string|null|undefined;
  postId?: string;
  urlImg?: string|undefined;
  edit?: boolean;
  id?: string;
}
