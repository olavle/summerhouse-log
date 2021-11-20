import {
  House,
  Message,
  MessageReply,
  Reservation,
  Shortage,
  State,
} from '../types';

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
    }
  | {
      type: 'HOUSES_FROM_DB';
      payload: House[];
    }
  | {
      type: 'SET_HOUSE_TO_EDIT';
      payload: House;
    }
  | {
      type: 'SET_RESERVATIONS';
      payload: Reservation[];
    }
  | {
      type: 'SET_SHORTAGES';
      payload: Shortage[];
    }
  | {
      type: 'SHORTAGEINPUT_OPEN';
      payload: boolean;
    }
  | {
      type: 'SET_NEW_SHORTAGE';
      payload: string;
    }
  | {
      type: 'SET_MESSAGES';
      payload: Message[];
    }
  | {
      type: 'SET_NEW_MESSAGE';
      payload: string;
    }
  | {
      type: 'SET_MESSAGE_REPLIES';
      payload: MessageReply[];
    }
  | {
      type: 'SET_REPLY_INPUT';
      payload: string;
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
    case 'HOUSES_FROM_DB':
      return {
        ...state,
        houses: action.payload,
      };
    case 'SET_HOUSE_TO_EDIT':
      return {
        ...state,
        houseToEdit: action.payload,
      };
    case 'SET_RESERVATIONS':
      return {
        ...state,
        reservations: action.payload,
      };
    case 'SET_SHORTAGES':
      return {
        ...state,
        shortages: action.payload,
      };
    case 'SHORTAGEINPUT_OPEN':
      return {
        ...state,
        shortageInputOpen: action.payload,
      };
    case 'SET_NEW_SHORTAGE':
      return {
        ...state,
        newShortage: action.payload,
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      };
    case 'SET_NEW_MESSAGE':
      return {
        ...state,
        newMessageInput: action.payload,
      };
    case 'SET_MESSAGE_REPLIES':
      return {
        ...state,
        messageReplies: action.payload,
      };
    case 'SET_REPLY_INPUT':
      return {
        ...state,
        newMessageReplyInput: action.payload,
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

export const listHouses = (houses: House[]): Action => {
  return {
    type: 'HOUSES_FROM_DB',
    payload: houses,
  };
};

export const setHousetoEdit = (house: House): Action => {
  return {
    type: 'SET_HOUSE_TO_EDIT',
    payload: house,
  };
};

export const setReservations = (reservations: Reservation[]): Action => {
  return {
    type: 'SET_RESERVATIONS',
    payload: reservations,
  };
};

export const setShortages = (shortages: Shortage[]): Action => {
  return {
    type: 'SET_SHORTAGES',
    payload: shortages,
  };
};

export const setShortageInputOpen = (arg: boolean): Action => {
  return {
    type: 'SHORTAGEINPUT_OPEN',
    payload: arg,
  };
};

export const setNewshortage = (shortage: string): Action => {
  return {
    type: 'SET_NEW_SHORTAGE',
    payload: shortage,
  };
};

export const setMessages = (messages: Message[]): Action => {
  return {
    type: 'SET_MESSAGES',
    payload: messages,
  };
};

export const setNewMessageInput = (message: string): Action => {
  return {
    type: 'SET_NEW_MESSAGE',
    payload: message,
  };
};

export const setMessageReplies = (replies: MessageReply[]): Action => {
  return {
    type: 'SET_MESSAGE_REPLIES',
    payload: replies,
  };
};

export const setMessageReplyInput = (input: string): Action => {
  return {
    type: 'SET_REPLY_INPUT',
    payload: input,
  };
};
