import { UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router';
import { SampleUsers } from '../SampleComponent';

type LoginResponse = {
  // Define the expected response type from the login endpoint
  message: string;
};

type LoginError = {
  // Define the expected error type from the login endpoint
  message: string;
};

const loginUser = async (): Promise<LoginResponse> => {
  const response = await axios.post('/login', {
    username: 'test@gmail.com',
    password: '12312312312',
  });
  return response.data;
};

export default function LoginForm() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get('from') || '/';

  let isLoggingIn = false;

  const mutation: UseMutationResult<LoginResponse, AxiosError<LoginError>> = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      if (error.response) {
        console.log('error', error.response.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    },
    onSuccess: () => {
      console.log('success');
    },
  });

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

      <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>

      <br />

      <button onClick={() => mutation.mutate()}>testing</button>
    </div>
  );
}
