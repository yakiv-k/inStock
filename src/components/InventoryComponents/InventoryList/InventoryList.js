import "./InventoryList.scss";
import chevron from "../../../assets/Icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import React from "react";
import DeleteModal from "../../DeleteModal/DeleteModal";
import axios from "axios";
import url from "../../utils/utils.js";

class InventoryList extends React.Component {
  state = {
    isOpen: false,
    order: "ASC",
    inventory: this.props.inventoryList || [],
    activeInventoryId: this.props.activeInventoryId || null,
  };

  componentDidMount() {
    const BASE_INV_URL = "https://instock-project.netlify.app/inventory";
    //const BASE_INV_URL = "http://localhost:3000/inventory";
    if (window.location.href === BASE_INV_URL) {
      axios
        .get(`${url}inventory`)
        .then((response) => {
          this.setState({
            inventory: response.data,
          });
        })

        .catch((error) => {
          console.log("Request failed", error);
        });
    } else {
      let currentLocation = window.location.href;
      let currentId = currentLocation.slice(46, 82);
      //let currentId = currentLocation.slice(32, 68);

      axios
        .get(`${url}warehouse/${currentId}/inventory`)
        .then((response) => {
          this.setState({
            inventory: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ inventory: [] });
        });
    }
  }

  openModal = (id) => {
    this.setState({ isOpen: true, activeInventoryId: id });
  };

  closeModal = () => this.setState({ isOpen: false });

  deleteItem = (id) => {
    axios.delete(`${url}inventory/${id}`).then((response) => {
      this.setState({ inventory: response.data, isOpen: false });
    });
  };

  sorting = (col) => {
    if (col === "quantity") {
      if (this.state.order === "ASC") {
        const sorted = [...this.state.inventory].sort((a, b) => {
          return a[col] > b[col] ? 1 : -1;
        });
        this.setState({ inventory: sorted, order: "DSC" });
      }

      if (this.state.order === "DSC") {
        const sorted = [...this.state.inventory].sort((a, b) => {
          return a[col] < b[col] ? 1 : -1;
        });
        this.setState({ inventory: sorted, order: "ASC" });
      }
    } else if (this.state.order === "ASC") {
      const sorted = [...this.state.inventory].sort((a, b) => {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      this.setState({ inventory: sorted, order: "DSC" });
    } else if (this.state.order === "DSC") {
      const sorted = [...this.state.inventory].sort((a, b) => {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      this.setState({ inventory: sorted, order: "ASC" });
    }
  };

  render() {
    const activeInventoryId = this.state.activeInventoryId;
    let modalData = this.state.inventory.find((item) => {
      return activeInventoryId === item.id;
    });
    if (this.state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return (
      <>
        {this.state.isOpen && this.state.activeInventoryId && (
          <DeleteModal
            title={`Delete ${modalData.itemName} inventory item?`}
            paragraph={`Please confirm that you'd like to delete ${modalData.itemName} from the inventory list. You won't be able to undo this action.`}
            deleteItem={this.deleteItem}
            closeModal={this.closeModal}
            isOpen={this.state.isOpen}
            warehouseName={modalData.name}
            id={activeInventoryId}
          />
        )}
        <div>
          <div className="InventoryFilter">
            <ul className="InventoryFilter__content-list">
              <ul className="InventoryFilter__sub-list InventoryFilter__sub-list--margin1">
                <li className="InventoryFilter__list-details InventoryFilter__list-details--margin1">
                  <div className="InventoryFilter__text-item InventoryFilter__text-item--margin">
                    <div className="InventoryFilter__text">Inventory Item</div>
                    <button
                      onClick={() => this.sorting("itemName")}
                      className="InventoryFilter__button"
                    ></button>
                  </div>
                </li>
                <li className="InventoryFilter__list-details InventoryFilter__list-details--margin2">
                  <p className="InventoryFilter__text">Category</p>
                  <button
                    onClick={() => this.sorting("category")}
                    className="InventoryFilter__button"
                  ></button>
                </li>
              </ul>
              <ul className="InventoryFilter__sub-list InventoryFilter__sub-list--margin2">
                <li className="InventoryFilter__list-details InventoryFilter__list-details--margin3">
                  <p className="InventoryFilter__text InventoryFilter__text--margin">
                    Status
                  </p>
                  <button
                    onClick={() => this.sorting("status")}
                    className="InventoryFilter__button"
                  ></button>
                </li>
                <li className="InventoryFilter__list-details InventoryCard__list-details--margin4">
                  <p className="InventoryFilter__text">Qty</p>
                  <button
                    onClick={() => this.sorting("quantity")}
                    className="InventoryFilter__button"
                  ></button>
                </li>
                <li className="InventoryFilter__list-details InventoryFilter__list-details--margin4">
                  <p className="InventoryFilter__text">Warehouse</p>
                  <button
                    onClick={() => this.sorting("warehouseName")}
                    className="InventoryFilter__button"
                  ></button>
                </li>
              </ul>
            </ul>
            <div className="InventoryCard__buttons">
              <p className="InventoryFilter__text">Actions</p>
              <p className="space">spe</p>
            </div>
          </div>

          {this.state.inventory
            // eslint-disable-next-line
            .filter((item) => {
              if (
                this.props.searchTerm === "" ||
                this.props.searchTerm === undefined
              ) {
                return item;
              } else if (
                item.warehouseName
                  .toLowerCase()
                  .includes(this.props.searchTerm.toLowerCase()) ||
                item.itemName
                  .toLowerCase()
                  .includes(this.props.searchTerm.toLowerCase()) ||
                item.category
                  .toLowerCase()
                  .includes(this.props.searchTerm.toLowerCase()) ||
                item.status
                  .toLowerCase()
                  .includes(this.props.searchTerm.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <div className="InventoryCard" key={item.id}>
                  <ul className="InventoryCard__content-list">
                    <ul className="InventoryCard__sub-list InventoryCard__sub-list--margin1">
                      <li className="InventoryCard__list-details InventoryCard__list-details--margin1">
                        <h4 className="InventoryCard__list-title">
                          Inventory Item
                        </h4>
                        <Link to={`/inventory/${item.id}`}>
                          <div className="InventoryCard__link-item InventoryCard__link-item--margin">
                            <div className="InventoryCard__link body-medium">
                              {item.itemName}
                            </div>
                            <img
                              src={chevron}
                              alt="chevron linking to inventory item"
                            />
                          </div>
                        </Link>
                      </li>
                      <li className="InventoryCard__list-details InventoryCard__list-details--margin2">
                        <h4 className="InventoryCard__list-title">Category</h4>
                        <p className="InventoryCard__info body-medium">
                          {item.category}
                        </p>
                      </li>
                    </ul>
                    <ul className="InventoryCard__sub-list InventoryCard__sub-list--margin2">
                      <li className="InventoryCard__list-details InventoryCard__list-details--margin3">
                        <h4 className="InventoryCard__list-title">Status</h4>
                        <p
                          className={`InventoryCard__info  ${this.props.statusStyle(
                            item.quantity
                          )}`}
                        >
                          {this.props.updateStatus(item.quantity)}
                        </p>
                      </li>
                      <li className="InventoryCard__list-details InventoryCard__list-details--margin4">
                        <h4 className="InventoryCard__list-title">Qty</h4>
                        <p className="InventoryCard__info body-medium">
                          {item.quantity}
                        </p>
                      </li>
                      <li className="InventoryCard__list-details InventoryCard__list-details--margin4">
                        <h4 className="InventoryCard__list-title">Warehouse</h4>
                        <p className="InventoryCard__info body-medium">
                          {item.warehouseName}
                        </p>
                      </li>
                    </ul>
                  </ul>
                  <div className="InventoryCard__buttons">
                    <button
                      onClick={() => {
                        this.openModal(item.id);
                      }}
                      type="button"
                      className="InventoryCard__button--delete"
                    ></button>
                    <Link to={`/inventory/edit/${item.id}`}>
                      <div className="InventoryCard__button--edit"></div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default InventoryList;
