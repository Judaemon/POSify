type User = {
  id: number;
  name: string;
  email: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

import { create } from 'zustand';
import { createSelectors } from '@/bootstrap';
import axios from 'axios';

interface AuthState {
  isAuthenticated: Boolean;
  user: User | null;
  login: (loginRequest: LoginRequest) => void;
  logout: () => void;
  fetchUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: () => {
    console.log('login');
    // set({ user: LoginRequest})
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.comm',
    };

    set({ user });

    return user;
  },
  logout: () => set({ user: null }),
  fetchUser: async () => {
    const response = await axios.get('/users/authenticated').then((res) => {
      const user: User = res.data;

      console.log('user', user);
      
      set({ user });
    });
  },
}));

export const useAuthSelector = createSelectors(useAuth);
