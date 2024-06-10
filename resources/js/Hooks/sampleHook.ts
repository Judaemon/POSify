import { Action, createStore, createHook } from 'react-sweet-state';

type State = { count: number };
type Actions = typeof actions;

const initialState: State = {
  count: 0,
};

const actions = {
  increment:
    (by = 1): Action<State> =>
    ({ setState, getState }) => {
      setState({
        count: getState().count + by,
      });
    },
};

// Note: most times TS will be able to infer the generics
const Store = createStore<State, Actions>({
  initialState,
  actions,
});

export const useCounter = createHook(Store);
