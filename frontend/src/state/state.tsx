import React, { createContext, useContext, useReducer } from 'react';
import { State } from '../types';
import { Action } from './reducer';

const initialState: State = {
  isLoggedIn: false,
  username: '',
  userPassword: '',
  stayLoggedIn: false,
  houses: [],
  houseToEdit: {
    id: '',
    adminId: '',
    maxResidents: 0,
    name: '',
    timestamp: '',
    address: '',
    imageUrl: '',
    users: [],
  },
  reservations: [],
  shortages: [],
  shortageInputOpen: false,
  newShortage: '',
  messages: [],
  messageReplies: [],
  newMessageInput: '',
  newMessageReplyInput: '',
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
