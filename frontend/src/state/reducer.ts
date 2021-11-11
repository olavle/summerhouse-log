import { State } from '../types';

export type Action =
  | {
      type: 'LOGIN';
      payload: true;
    }
  | {
      type: 'LOGOUT';
      payload: false;
    }
  | {
      type: 'SET_USERNAME';
      payload: string;
    }
  | {
      type: 'SET_PASSWORD';
      payload: string;
    }
  | {
      type: 'STAY_LOGGEDIN';
      payload: boolean;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        userPassword: action.payload,
      };
    case 'STAY_LOGGEDIN':
      return {
        ...state,
        stayLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export const loginUser = (): Action => {
  return {
    type: 'LOGIN',
    payload: true,
  };
};

export const logoutUser = (): Action => {
  return {
    type: 'LOGOUT',
    payload: false,
  };
};
