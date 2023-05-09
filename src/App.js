import "./App.scss";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HeaderSection from "./components/HeaderSection/HeaderSection";
import FooterSection from "./components/FooterSection/FooterSection";
import InventoryAdd from "./components/InventoryComponents/InventoryAdd/InventoryAdd";
import WareHousePage from "./pages/WareHousePage/WareHousePage";
import WarehouseDetails from "./components/WarehouseComponents/WarehouseDetails/WarehouseDetails";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import WarehouseAdd from "./components/WarehouseComponents/WarehouseAdd/WarehouseAdd";
import WarehouseEdit from "./components/WarehouseComponents/WarehouseEdit/WarehouseEdit";
import InventoryItem from "./components/InventoryComponents/InventoryItem/InventoryItem";
import InventoryEdit from "./components/InventoryComponents/InventoryEdit/InventoryEdit";

class App extends React.Component {
  state = {
    searchTerm: "",
  };

  handleOnChange = (userInput) => {
    this.setState({ searchTerm: userInput });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="app__body">
          <HeaderSection />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <WareHousePage
                  searchTerm={this.state.searchTerm}
                  handleOnChange={this.handleOnChange}
                  {...props}
                />
              )}
            />
            <Route
              path="/warehouse"
              exact
              render={(props) => (
                <WareHousePage
                  searchTerm={this.state.searchTerm}
                  handleOnChange={this.handleOnChange}
                  {...props}
                />
              )}
            />
            <Route path="/warehouse/add" component={WarehouseAdd} />
            <Route path="/warehouse/:id/edit" component={WarehouseEdit} />
            <Route
              path="/warehouse/:id/inventory"
              component={WarehouseDetails}
            />

            <Route
              path="/inventory"
              exact
              render={(props) => (
                <InventoryPage
                  searchTerm={this.state.searchTerm}
                  handleOnChange={this.handleOnChange}
                  {...props}
                />
              )}
            />
            <Route path="/inventory/add" exact component={InventoryAdd} />
            <Route path="/inventory/:id" exact component={InventoryItem} />
            <Route path="/inventory/edit/:id" exact component={InventoryEdit} />
          </Switch>
          <FooterSection />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
