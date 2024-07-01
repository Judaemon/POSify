type User = {
  id: number;
  name: string;
  email: string;
};

import { create } from 'zustand';
import axios from 'axios';
import { toast } from '@/Components/ui/use-toast';
import { redirect, useNavigate } from 'react-router-dom';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  fetchUser: () => Promise<User | null>;
  logout: () => void;
}

const authInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  setIsAuthenticated: () => {},
  fetchUser: async () => null,
  logout: () => {},
};

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => {
    console.log('set user from useAuth', user);
    set({ user, isAuthenticated: true });

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
        toast({
          title: 'Failed to Fetch User Data',
          description: 
            'There was an error while retrieving user data. Please try again. ',
          variant: 'destructive',
        });
        return null;
      });
  },
  logout: () => {
    set(authInitialState);
  },
}));
