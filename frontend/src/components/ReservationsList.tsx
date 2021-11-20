import React from 'react';
import { HouseUser, Reservation } from '../types';
import { parseDate } from '../utils/dateParser';

interface Props {
  reservations: Reservation[];
  users: HouseUser[];
}

const ReservationsList = ({ reservations, users }: Props) => {
  return (
    <div className='ReservationsList'>
      <div style={{paddingBottom: '8px', borderBottom: '1px solid black'}}>Varaukset:</div>
      <table>
        <tbody>
          <tr>
            <th>Käyttäjä:</th>
            <th>Aika:</th>
          </tr>
          {reservations.map((item) => {
            const user = users.find((user) => user.id === item.userWhoAddedId);
            return (
              <tr key={item.id}>
                <td>{user?.username}</td>
                <td>
                  {parseDate(item.startingDate)} - {parseDate(item.endingDate)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;
