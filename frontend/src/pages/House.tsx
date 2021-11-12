import React from 'react';
import axiosHelper from '../utils/axiosHelper';

const House = () => {
  React.useEffect(() => {
    axiosHelper
      .get('api/reservations/1dc80054-79dc-4a21-8662-1c5b51f44088')
      .then((res) => console.log(res))
      .catch((err) => console.log('err', err));
  }, []);

  return (
    <div>
      <p>Hello house</p>
    </div>
  );
};

export default House;
