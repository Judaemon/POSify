import { useBearStore } from '@/Hooks/sampleHook';
import { useAuth } from '@/Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const Sample = () => {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  console.log('bears', bears);

  return (
    <div>
      <p>Bear Count: {bears}</p>
      <button onClick={() => increasePopulation()}>Increment Population</button>
    </div>
  );
};

export const SampleUsers = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('/test').then((res) => res.data),
  });

  if (isFetching) return 'Fetching...';

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="mt-2 p-2 bg-slate-900 text-white">
      <h1>Sample Component</h1>
      <h2>Users</h2>
      <hr />
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

export const SampleAPICall = () => {
  // get request to /test
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['sample'],
    queryFn: () =>
      axios.get('/test123').then((res) => {
        return res.data;
      }),
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Data</h1>
      {isFetching ? <div>Updating...</div> : null}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const SampleAuth = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth().user;

  return (
    <div>
      <h1>Sample Auth fetched</h1>
      
      {user && (
        <div>
          <h1>Authenticated user</h1>
          <p>Name: {user.name}</p>
        </div>
      )}
    </div>
  );
};
