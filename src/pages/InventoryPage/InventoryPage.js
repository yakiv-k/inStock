import "./InventoryPage.scss";
import React from "react";
import InventoryList from "../../components/InventoryComponents/InventoryList/InventoryList";
import SearchHeader from "../../components/SearchHeader/SearchHeader";

class InventoryPage extends React.Component {
  // Toggle status function
  statusToggle = (qty) => {
    if (qty === 0) {
      return "Out of Stock";
    } else {
      return "In Stock";
    }
  };

  statusStyleToggle = (qty) => {
    if (qty === 0) {
      return "outOfStock";
    } else {
      return "inStock";
    }
  };

  render() {
    return (
      <div className="InventoryList__body">
        <SearchHeader
          title={"Inventory"}
          urlPath={"/inventory/add"}
          item="Item"
          handleOnChange={this.props.handleOnChange}
          searchTerm={this.props.searchTerm}
        />
        <InventoryList
          searchTerm={this.props.searchTerm}
          updateStatus={this.statusToggle}
          statusStyle={this.statusStyleToggle}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default InventoryPage;
