import "./InventoryAdd.scss";
import React from "react";
import { Link } from "react-router-dom";
import backArrow from "../../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../../assets/Icons/error-24px.svg";
import axios from "axios";
import url from "../../utils/utils";

class InventoryAdd extends React.Component {
  state = {
    warehouses: [],
    invalidName: false,
    invalidDescription: false,
    invalidQuantity: false,
    inventoryStatus: null,
  };

  redirectHome = () => {
    this.props.history.push("/inventory");
  };

  componentDidMount() {
    axios
      .get(`${url}warehouse`)
      .then((response) => {
        this.setState({
          warehouses: response.data,
        });
      })
      .catch((error) => {
        console.log("Request failed");
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.itemName.value.trim() === "") {
      this.setState({
        invalidName: true,
      });
    }
    if (event.target.description.value.trim() === "") {
      this.setState({
        invalidDescription: true,
      });
    }
    if (
      event.target.quantity.value.trim() === "" &&
      !Number(event.target.quantity.value)
    ) {
      this.setState({
        invalidQuantity: true,
      });
    }

    if (
      !this.state.invalidName &&
      !this.state.invalidDescription &&
      !this.state.invalidQuantity &&
      event.target.warehouseID.value &&
      event.target.itemName.value &&
      event.target.description.value &&
      event.target.category.value &&
      event.target.status.value &&
      event.target.quantity.value
    ) {
      axios
        .post(`${url}inventory`, {
          warehouseID: event.target.warehouseID.value,
          itemName: event.target.itemName.value,
          description: event.target.description.value,
          category: event.target.category.value,
          status: event.target.status.value,
          quantity: event.target.quantity.value,
        })
        .then(() => {
          this.redirectHome();
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    return (
      <>
        {this.state.warehouses && (
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
                <h2 className="new-item__title">Add New Inventory Item</h2>
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
                        />
                        {this.state.invalidName && (
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
                      </label>

                      <label className="new-item-form__label">
                        Description
                        <input
                          type="text"
                          name="description"
                          placeholder="Please enter a brief item description..."
                          className="new-item-form__input new-item-form__input--padding"
                        />
                        {this.state.invalidDescription && (
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
                      </label>

                      <label className="new-item-form__label">
                        Category
                        <select
                          type="text"
                          name="category"
                          placeholder="Please select"
                          className="new-item-form__input new-item-form__input--select"
                          id="category"
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
                            type="radio"
                            name="status"
                            className="new-item-form__radio-button"
                            value="In Stock"
                          />
                          <p className="new-item-form__radio-text">In Stock</p>
                        </div>
                        <div className="new-item-form__radio-container">
                          <input
                            type="radio"
                            name="status"
                            className="new-item-form__radio-button"
                            value="Out of Stock"
                            defaultChecked={"Out of Stock"}
                          />
                          <p className="new-item-form__radio-text">
                            Out of Stock
                          </p>
                        </div>
                      </div>

                      <label className="new-item-form__label">Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        placeholder="0"
                        className="new-item-form__input new-item-form__input--width"
                      />
                      {this.state.invalidQuantity && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}
                      <label className="new-item-form__label">
                        Warehouse
                        <select
                          name="warehouseID"
                          placeholder="Please select"
                          className="new-item-form__input new-item-form__input--select"
                        >
                          {this.state.warehouses.map((warehouse) => {
                            return (
                              <option value={warehouse.id} key={warehouse.id}>
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
                    <button
                      to="/inventory"
                      onClick={this.redirectHome}
                      className="button button--cancel"
                    >
                      Cancel
                    </button>
                    <button className="button button--special" type="submit">
                      + Add Item
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

export default InventoryAdd;
