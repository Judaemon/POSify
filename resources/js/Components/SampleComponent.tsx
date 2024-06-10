import { useCounter } from '@/Hooks/sampleHook';

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
