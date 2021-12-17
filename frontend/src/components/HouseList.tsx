import React from 'react';
import { Link } from 'react-router-dom';
import { House } from '../types';
import '../styles/House.css';

interface Props {
  houses: House[];
}

const HouseList = ({ houses }: Props) => {
  return (
    <div>
      {houses.map((item) => {
        return (
          <div style={{padding: '8px'}} key={item.id}>
            <Link style={{textDecoration: 'none'}} to={item.id}>
              <div className='HouseItem'>
                <img
                  src='http://localhost:3001/house.jpeg'
                  style={{ maxWidth: '64px', paddingRight: '16px' }}
                />
                <p>{item.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HouseList;


