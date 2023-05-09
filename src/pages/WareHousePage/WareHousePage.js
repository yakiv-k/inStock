import React from "react";
import WarehouseList from "../../components/WarehouseComponents/WarehouseList/WarehouseList";
// import WarehouseAdd from "../../components/WarehouseComponents/WarehouseAdd/WarehouseAdd";
import "./WarehousePage.scss";

class WareHousePage extends React.Component {


  render() {
    return (
      <div className="WarehouseList__background">
        <div className="WarehouseList__body">
          <WarehouseList searchTerm={this.props.searchTerm} handleOnChange={this.props.handleOnChange}/>
        </div>
      </div>
    );
  }
}

export default WareHousePage;
