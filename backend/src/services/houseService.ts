import { House, NewHouse } from '../types';
import houseData from '../dummydata/houseData';

const addHouse = (house: NewHouse): House => {
  const id = Math.random() * 10;
  const houseToAdd: House = {
    id: id.toString(),
    ...house,
  };
  houseData.push(houseToAdd);
  return houseToAdd;
};

export default {
  addHouse,
};
