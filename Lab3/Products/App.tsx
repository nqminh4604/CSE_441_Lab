
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Products from './Products/Products';
import { indigo100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

function App(): React.JSX.Element {

  return (
      <Products></Products>
  );
}

export default App;

