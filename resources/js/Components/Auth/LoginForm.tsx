import {
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router';
import { useAuth } from '@/Hooks/useAuth';

type LoginRequestResponse = {
  message: string;
};

type LoginRequestError = {
  message: string;
};

interface LoginRequestCredentials {
  email: string;
  password: string;
}

const loginUser = async (
  loginCredentials: LoginRequestCredentials
): Promise<LoginRequestResponse> => {
  const response = await axios.post('/login', loginCredentials);

  console.log('response', response.data);

  return response.data;
};

export default function LoginForm() {
  const login = useAuth((state) => state.login);
  // const [state, action] = useAuth();

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get('from') || '/';

  let isLoggingIn = false;

  const mutation: UseMutationResult<
    LoginRequestResponse,
    AxiosError<LoginRequestError>,
    LoginRequestCredentials
  > = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      if (error.response) {
        console.log('error', error.response.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    },
    onSuccess: (res) => {
      login({ email: 'test@gmail.comm', password: '123123123' });
    },
  });

  const handleLogin = () => {
    const loginData: LoginRequestCredentials = {
      email: 'test@gmail.comm',
      password: '123123123123',
    };

    mutation.mutate(loginData);
  };

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <label>
        Username: <input name="username" />
      </label>

      <br />

      <label>
        Password: <input name="username" />
      </label>

      <br />

      <button onClick={handleLogin} type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>

    </div>
  );
}
