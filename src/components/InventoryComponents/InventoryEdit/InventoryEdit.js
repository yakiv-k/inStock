import "./InventoryEdit.scss";
import React from "react";
import { Link } from "react-router-dom";
import backArrow from "../../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../../assets/Icons/error-24px.svg";
import axios from "axios";
import url from "../../utils/utils";

class InventoryEdit extends React.Component {
  state = {
    inventory: null,
    warehouseList: [],
    inventoryStatus: null,
    itemNameCheck: false,
    descriptionCheck: false,
    quantity: false,
  };

  redirectHome = () => {
    this.props.history.push("/inventory");
  };

  handleStatusChange = (e) => {
    if (e.target.value === "Out of Stock") {
      this.setState({
        inventoryStatus: e.target.value,
        quantity: "0",
        quantityCheck: false,
      });
    } else {
      this.setState({ inventoryStatus: e.target.value });
    }
  };

  handleQuantityChange = (e) => {
    if (e.target.value === "0") {
      this.setState({ quantity: 0, quantityCheck: true });
    }
    this.setState({ quantity: e.target.value, quantityCheck: false });
  };

  componentDidMount() {
    axios
      .get(`${url}inventory/${this.props.match.params.id}`)
      .then((response) => {
        return response.data;
      })
      .then((inventoryData) => {
        return axios.get(`${url}warehouse`).then((response) => {
          this.setState({
            inventory: inventoryData,
            warehouseList: response.data,
            inventoryStatus: inventoryData.status,
          });
        });
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const selectedWarehouse = this.state?.warehouseList.find((item) => {
      return item.name === event.target.warehouse.value;
    });

    if (event.target.itemName.value.trim() === "") {
      this.setState({ itemNameCheck: true });
    } else {
      this.setState({ itemNameCheck: false });
    }
    if (event.target.description.value.trim() === "") {
      this.setState({ descriptionCheck: true });
    } else {
      this.setState({ descriptionCheck: false });
    }

    if (
      this.state.inventoryStatus === "Out of Stock" &&
      !event.target.quantity
    ) {
      this.setState({ quantity: 0, quantityCheck: false });
    } else if (
      this.state.inventoryStatus === "In Stock" &&
      (event.target.quantity.value.trim() === "" ||
        !Number(event.target.quantity.value) ||
        Number(event.target.quantity.value) === 0)
    ) {
      this.setState({
        quantity: event.target.quantity.value,
        quantityCheck: true,
      });
    } else {
      this.setState({
        quantity: event.target.quantity.value,
        quantityCheck: false,
      });
    }

    if (
      !this.state.itemNameCheck &&
      !this.state.descriptionCheck &&
      !this.state.quantityCheck &&
      event.target.warehouse.value &&
      event.target.itemName.value &&
      event.target.description.value &&
      this.state.quantity &&
      event.target.category.value
    ) {
      axios
        .put(
          `${url}inventory/${this.props.match.params.id}/edit`,

          {
            id: this.props.match.params.id,
            warehouseID: selectedWarehouse.id,
            warehouseName: event.target.warehouse.value,
            itemName: event.target.itemName.value,
            description: event.target.description.value,
            category: event.target.category.value,
            status: event.target.status.value,
            quantity: Number(this.state.quantity),
          }
        )
        .then(() => {
          this.redirectHome();
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    return (
      <>
        {this.state.inventory &&
          this.state.warehouseList &&
          this.state.inventoryStatus && (
            <section className="new-item">
              <div className="new-item__container">
                <div className="new-item__header">
                  <Link className="new-item__link" to="/inventory">
                    <img
                      src={backArrow}
                      alt="Back Arrow to return to item page"
                      className="new-item__back-icon"
                    />
                  </Link>
                  <h2 className="new-item__title">Edit Inventory Item</h2>
                </div>

                <form onSubmit={this.handleSubmit} className="new-item-form">
                  <div className="new-item-form__wrapper">
                    <div className="new-item-form__left">
                      <div className="new-item-form__container">
                        <h3 className="new-item-form__title">Item Details</h3>
                        <label className="new-item-form__label">
                          Item Name
                          <input
                            type="text"
                            name="itemName"
                            placeholder="Item Name"
                            className="new-item-form__input"
                            defaultValue={this.state.inventory.itemName}
                          />
                        </label>{" "}
                        {this.state.itemNameCheck && (
                          <div className="error">
                            <img
                              src={errorIcon}
                              alt="Error Icon"
                              className="error__icon"
                            />
                            <p className="error__text">
                              This field is required
                            </p>
                          </div>
                        )}
                        <label className="new-item-form__label">
                          Description
                          <textarea
                            type="text"
                            name="description"
                            placeholder="Please
                            enter a brief item description..."
                            className="new-item-form__input
                            new-item-form__input--padding"
                            defaultValue={this.state.inventory.description}
                          ></textarea>
                        </label>
                        {this.state.descriptionCheck && (
                          <div className="error">
                            <img
                              src={errorIcon}
                              alt="Error Icon"
                              className="error__icon"
                            />
                            <p className="error__text">
                              This field is required
                            </p>
                          </div>
                        )}
                        <label className="new-item-form__label">
                          Category
                          <select
                            type="text"
                            name="category"
                            placeholder="Please select"
                            className="new-item-form__input"
                            defaultValue={this.state.inventory.category}
                          >
                            <option value="Electronics">Electronics</option>
                            <option value="Apparel">Apparel</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Gear">Gear</option>
                            <option value="Health">Health</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="new-item-form__right">
                      <div className="new-item-form__container">
                        <h3 className="new-item-form__title">
                          Item Availability
                        </h3>
                        <label className="new-item-form__label">Status</label>
                        <div className="new-item-form__radio">
                          <div className="new-item-form__radio-container">
                            <input
                              onChange={this.handleStatusChange}
                              type="radio"
                              name="status"
                              className="new-item-form__radio-button"
                              value="In Stock"
                              defaultChecked={
                                this.state.inventoryStatus === "In Stock"
                              }
                            />
                            <p className="new-item-form__radio-text">
                              In Stock
                            </p>
                          </div>
                          <div className="new-item-form__radio-container">
                            <input
                              onChange={this.handleStatusChange}
                              type="radio"
                              name="status"
                              className="new-item-form__radio-button"
                              value="Out of Stock"
                              defaultChecked={
                                this.state.inventoryStatus === "Out of Stock"
                              }
                            />
                            <p className="new-item-form__radio-text">
                              Out of Stock
                            </p>
                          </div>
                        </div>
                        {this.state.inventoryStatus === "In Stock" && (
                          <>
                            <label className="new-item-form__label">
                              Quantity
                            </label>
                            <input
                              onChange={this.handleQuantityChange}
                              type="text"
                              name="quantity"
                              placeholder="1"
                              className="new-item-form__input new-item-form__input--width"
                              defaultValue={String(
                                this.state.inventory.quantity
                              )}
                            />
                          </>
                        )}
                        {this.state.quantityCheck && (
                          <div className="error">
                            <img
                              src={errorIcon}
                              alt="Error Icon"
                              className="error__icon"
                            />
                            <p className="error__text">
                              This field requires an integer above 0
                            </p>
                          </div>
                        )}

                        <label className="new-item-form__label">
                          Warehouse
                          <select
                            name="warehouse"
                            placeholder="Please select"
                            className="new-item-form__input"
                          >
                            {this.state.warehouseList.map((warehouse) => {
                              return (
                                <option
                                  value={warehouse.name}
                                  key={warehouse.id}
                                >
                                  {warehouse.name}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="buttons">
                    <div className="buttons__container">
                      <Link to="/inventory" className="buttons__link">
                        <button className="button button--cancel">
                          Cancel
                        </button>
                      </Link>
                      <button className="button button--special" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          )}
      </>
    );
  }
}

export default InventoryEdit;
