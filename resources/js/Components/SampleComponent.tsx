import { useCounter } from '@/Hooks/sampleHook';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const Sample = () => {
  const [state, actions] = useCounter();
  console.log('testing', state.count);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => actions.increment()}>Increment</button>
    </div>
  );
};

export const SampleUsers = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('/test').then((res) => res.data),
  });

  // if (isFetching) return 'Fetching...';

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id} className="flex space-x-2">
            <p>{user.id}</p>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
