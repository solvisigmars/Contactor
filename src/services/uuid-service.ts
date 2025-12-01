import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

//npm install uuid
//npm install react-native-get-random-values