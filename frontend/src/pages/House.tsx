import React from 'react';
import HouseList from '../components/HouseList';
import { listHouses } from '../state/reducer';
import { useStateValue } from '../state/state';
import axiosHelper from '../utils/axiosHelper';
import '../styles/House.css';
import { House as HouseType } from '../types'; // Change name in import to avoid React's confusion with the component name

const House = () => {
  const [{ houses }, dispatch] = useStateValue();

  React.useEffect(() => {
    axiosHelper
      .get<HouseType[]>('api/houses')
      .then((res) => {
        dispatch(listHouses(res));
      }) //Typequard here
      .catch((err) => console.log('err', err));
  }, []);

  return (
    <div>
      <div className='HouseList'>
        {houses.length === 0 ? (
          <p>Ladataan mökkejä...</p>
        ) : (
          <HouseList houses={houses} />
        )}
      </div>
    </div>
  );
};

export default House;
