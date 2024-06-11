import { Action, createHook, createStore } from 'react-sweet-state';

type User = {
  id: number;
  name: string;
  email: string;
};

type State = {
  user: User | null;
};

type Actions = typeof actions;

const initialState: State = {
  user: null,
};

const actions = {
  login:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        user: { id: 1, name: 'test', email: 'test@gmail.com' },
      });
    },
  logout:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        user: null,
      });
    },
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
});

export const useAuth = createHook(Store);
