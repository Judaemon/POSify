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
import axios from 'axios';
import { toast } from '@/Components/ui/use-toast';
import { redirect, useNavigate } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (loginRequest: LoginRequest) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  fetchUser: () => Promise<User | null>;
  logout: () => void;
}

const authInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  setIsAuthenticated: () => {},
  fetchUser: async () => null,
  logout: () => {},
};

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: () => {
    // set({ user: LoginRequest})
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.comm',
    };

    set({ user, isAuthenticated: true });
    console.log("login testing");
    
    return user;
  },
  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },
  fetchUser: async (): Promise<User | null> => {
    return axios
      .get('/users/authenticated')
      .then((response) => {
        const user: User = response.data;

        set({ user, isAuthenticated: true });

        return user;
      })
      .catch((error) => {
        return null;
      });
  },
  logout: () => {
    set(authInitialState);
  },
}));
