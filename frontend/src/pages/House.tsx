import React from 'react';
import { listHouses } from '../state/reducer';
import { useStateValue } from '../state/state';
import axiosHelper from '../utils/axiosHelper';

const House = () => {
  const [{ houses }, dispatch] = useStateValue();
  
  React.useEffect(() => {
    axiosHelper
      .get('api/houses')
      .then((res) => dispatch(listHouses(res as any)))
      .catch((err) => console.log('err', err));
  }, []);

  return (
    <div>
      <p>Hello house</p>
      {
        houses
      }
    </div>
  );
};

export default House;
