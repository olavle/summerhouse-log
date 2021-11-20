import React from 'react';
import { HouseUser } from '../types';
import '../styles/House.css';

interface Props {
  users: HouseUser[] | [];
}

const HouseUsersList = ({ users }: Props) => {
  return (
    <div className='HouseUsersList'>
      <div style={{ paddingBottom: '8px', borderBottom: '1px solid black' }}>
        Mökin käyttäjät:
      </div>
      {users.length === 0 ? (
        <p>No users for this house yet</p>
      ) : (
        users.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.username}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HouseUsersList;
