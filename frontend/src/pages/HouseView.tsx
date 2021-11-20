import React from 'react';
import { useParams } from 'react-router';
import HouseUsersList from '../components/HouseUsersList';
import {
  setHousetoEdit,
  setReservations,
  setShortages,
} from '../state/reducer';
import { useStateValue } from '../state/state';
import { House, Reservation, Shortage } from '../types';
import axiosHelper from '../utils/axiosHelper';
import '../styles/House.css';
import ReservationsList from '../components/ReservationsList';
import ShortageList from '../components/ShortageList';
import { Link } from 'react-router-dom';

const HouseView = () => {
  const { id } = useParams();

  const [
    { houseToEdit, reservations, shortages },
    dispatch,
  ] = useStateValue();

  React.useEffect(() => {
    axiosHelper
      .get<House>(`api/houses/${id}`)
      .then((res) => {
        dispatch(setHousetoEdit(res));
      })
      .catch((err) => console.log('error:', err));
    axiosHelper
      .get<Reservation[]>(`api/reservations/${id}`)
      .then((res) => dispatch(setReservations(res)))
      .catch((err) => console.log(err));
    axiosHelper
      .get<Shortage[]>(`api/shortages/${id}`)
      .then((res) => dispatch(setShortages(res)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {houseToEdit.id === '' ? (
        <p>No such house</p>
      ) : (
        <div>
          <div className='HouseName'>{houseToEdit.name}</div>
          <div className='HouseInfoPage'>
            <div style={{ padding: '26px' }}>
              <HouseUsersList users={houseToEdit.users} />
            </div>
            <div style={{ padding: '26px' }}>
              <ReservationsList
                reservations={reservations}
                users={houseToEdit.users}
              />
            </div>
            <div style={{ padding: '26px' }}>
              <ShortageList shortages={shortages} />
            </div>
          </div>
          <Link to='messages'>
            <div>Katso mökkiin liittyviä viestejä</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HouseView;
