import * as React from 'react';


export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <React.Fragment>
      <div className='p-2'>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    </React.Fragment>
  );
}