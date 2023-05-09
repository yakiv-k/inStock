import "./HeaderSection.scss";
import InStockLogo from "../../assets/Logo/InStock-Logo.svg";
import { NavLink } from "react-router-dom";
import React from "react";

class HeaderSection extends React.Component {
  state = {
    inventoryClass: "",
    warehouseClass: "button__warehouse--active",
  };

  activeInventoryPageHandler = () => {
    this.setState({
      inventoryClass: "button__inventory--active",
      warehouseClass: "",
    });
  };

  activeWarehousePageHandler = () => {
    this.setState({
      inventoryClass: "",
      warehouseClass: "button__warehouse--active",
    });
  };

  render() {
    return (
      <header>
        <nav className="nav">
          <NavLink
            onClick={this.activeWarehousePageHandler}
            to="/"
            className="nav__logo-div"
          >
            <img
              className="nav__logo"
              src={InStockLogo}
              alt="InStock Logo"
            ></img>
          </NavLink>
          <div className="nav__directory">
            <NavLink
              to="/warehouse"
              exact
              onClick={this.activeWarehousePageHandler}
              className={`nav__links button__warehouse ${this.state.warehouseClass}`}
            >
              Warehouses
            </NavLink>
            <NavLink
              to="/inventory"
              exact
              onClick={this.activeInventoryPageHandler}
              className={`nav__links button__inventory ${this.state.inventoryClass}`}
            >
              Inventory
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }
}

export default HeaderSection;
