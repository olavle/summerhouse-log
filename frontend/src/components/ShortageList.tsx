import React from 'react';
import {
  setNewshortage,
  setShortageInputOpen,
  setShortages,
} from '../state/reducer';
import { useStateValue } from '../state/state';
import { Shortage } from '../types';
import axiosHelper from '../utils/axiosHelper';

interface Props {
  shortages: Shortage[];
}

const ShortageList = ({ shortages }: Props) => {
  const [{ shortageInputOpen, newShortage, houseToEdit }, dispatch] =
    useStateValue();

  const handleToggleResolve = (obj: Shortage) => {
    const toSend = {
      ...obj,
      isResolved: !obj.isResolved,
    };
    axiosHelper.put<Shortage>(`api/shortages/`, toSend).then((res) => {
      if (res.status === 201) {
        const toChange = shortages.map((shortage) => {
          if (shortage.id === obj.id) {
            return toSend;
          }
          return shortage;
        }) as Shortage[];
        if (toChange !== undefined) {
          dispatch(setShortages(toChange));
        }
      }
    });
  };

  const handleShortageInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(setNewshortage(event.target.value));
  };

  const addNewshortage = () => {
    axiosHelper
      .post(`api/shortages/${houseToEdit.id}`, { content: newShortage })
      .then((res) => {
        const addedShortage = res.data as Shortage;
        dispatch(setShortages(shortages.concat(addedShortage)));
        dispatch(setNewshortage(''));
        dispatch(setShortageInputOpen(false));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='ShortageList'>
      <div style={{ fontWeight: 'bold' }}>Puutteet:</div>
      {shortages.map((item) => {
        return (
          <div onClick={() => handleToggleResolve(item)} key={item.id}>
            {!item.isResolved ? (
              <p style={{cursor: 'pointer'}}>{item.content}</p>
            ) : (
              <p style={{ color: 'gray', textDecoration: 'line-through',  cursor: 'pointer' }}>
                {item.content}
              </p>
            )}
          </div>
        );
      })}
      <div
        style={{ fontWeight: 'bold', color: 'green', cursor: 'pointer' }}
        onClick={() => dispatch(setShortageInputOpen(!shortageInputOpen))}>
        Lisää uusi...
      </div>
      {shortageInputOpen ? (
        <div>
          <input
            onChange={handleShortageInput}
            type='text'
            name='shortage'
            placeholder='Lisää puute...'
            value={newShortage}
          />
          <button onClick={addNewshortage}>Lisää!</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ShortageList;
