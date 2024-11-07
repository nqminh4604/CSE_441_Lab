import React from "react";
import Products from "./Products/Products";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProductAdd from "./Products/ProductAdd";
import ProductSearch from "./Products/ProductSearch";
import Product_Detail from "./Products/Product_Detail";

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Product', title: 'Products', focusedIcon: "alpha-p-box" },
    { key: 'Add', title: 'Add', focusedIcon: "plus-box-outline" },
    { key: 'Search', title: 'Search', focusedIcon: "database-search" },
    { key: 'Detail', title: 'Detail', focusedIcon: "details" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Product: Products,
    Add: ProductAdd,
    Search: ProductSearch,
    Detail: Product_Detail,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
      navigationState={{ index, routes}}
      onIndexChange={ setIndex}
      renderScene={ renderScene }
      />
    </SafeAreaProvider>
  );
};

export default App;