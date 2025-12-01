import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

//Þú þarft að installa: npm install uuid react-native-get-random-values//