import "./WarehouseEdit.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import url from "../../utils/utils.js";
import backArrow from "../../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../../assets/Icons/error-24px.svg";
import axios from "axios";

class WarehouseEdit extends Component {
  state = {
    warehouseNameCheck: false,
    addressCheck: false,
    cityCheck: false,
    countryCheck: false,
    contactNameCheck: false,
    positionCheck: false,
    numberCheck: false,
    emailCheck: false,
    warehouseList: [],
    warehouseContact: null,
  };

  redirectHome = () => {
    this.props.history.push("/warehouse");
  };

  componentDidMount() {
    axios
      .get(`${url}warehouse/${this.props.match.params.id}`)
      .then((response) => {
        return response.data;
      })
      .then((warehouseData) => {
        this.setState({
          warehouseList: warehouseData,
          warehouseContact: warehouseData.contact,
        });
      });
  }

  handleWarehouseName = (event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === "") {
      this.setState({ warehouseNameCheck: true });
    } else {
      this.setState({ warehouseNameCheck: false });
    }
  };

  handleAddress = (event) => {
    const inputValue = event.target.value;
    if (inputValue.trim() === "") {
      this.setState({ addressCheck: true });
    } else {
      this.setState({ addressCheck: false });
    }
  };

  handleCity = (event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === "") {
      this.setState({ cityCheck: true });
    } else {
      this.setState({ cityCheck: false });
    }
  };

  handleCountry = (event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === "") {
      this.setState({ countryCheck: true });
    } else {
      this.setState({ countryCheck: false });
    }
  };

  handleContactName = (event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === "") {
      this.setState({ contactNameCheck: true });
    } else {
      this.setState({ contactNameCheck: false });
    }
  };

  handlePosition = (event) => {
    const inputValue = event.target.value;

    if (inputValue.trim() === "") {
      this.setState({ positionCheck: true });
    } else {
      this.setState({ positionCheck: false });
    }
  };

  handlePhoneNumber = (event) => {
    const inputValue = event.target.value;
    const numberRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (inputValue.trim() === "") {
      this.setState({ numberCheck: true });
    } else if (!numberRegex.test(inputValue)) {
      this.setState({ numberCheck: true });
    } else {
      this.setState({ numberCheck: false });
    }
  };

  handleEmail = (event) => {
    const inputValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputValue.trim() === "") {
      this.setState({ emailCheck: true });
    } else if (!emailRegex.test(inputValue)) {
      this.setState({ emailCheck: true });
    } else {
      this.setState({ emailCheck: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.warehouseName.value.trim() === "") {
      this.setState({ warehouseNameCheck: true });
    }
    if (event.target.address.value.trim() === "") {
      this.setState({ addressCheck: true });
    }

    if (event.target.city.value.trim() === "") {
      this.setState({ cityCheck: true });
    }

    if (event.target.country.value.trim() === "") {
      this.setState({ countryCheck: true });
    }

    if (event.target.contactName.value.trim() === "") {
      this.setState({ contactNameCheck: true });
    }

    if (event.target.position.value.trim() === "") {
      this.setState({ positionCheck: true });
    }

    if (event.target.phone.value.trim() === "") {
      this.setState({ numberCheck: true });
    }

    if (event.target.email.value.trim() === "") {
      this.setState({ emailCheck: true });
    }

    if (
      !this.state.warehouseNameCheck &&
      !this.state.addressCheck &&
      !this.state.cityCheck &&
      !this.state.numberCheck &&
      !this.state.positionCheck &&
      !this.state.emailCheck &&
      !this.state.countryCheck &&
      event.target.warehouseName.value &&
      event.target.address.value &&
      event.target.city.value &&
      event.target.country.value &&
      event.target.position.value &&
      event.target.phone.value &&
      event.target.email.value
    ) {
      axios
        .put(`${url}warehouse/${this.props.match.params.id}/edit`, {
          id: this.props.match.params.id,
          warehouseName: event.target.warehouseName.value,
          address: event.target.address.value,
          city: event.target.city.value,
          country: event.target.country.value,
          contactName: event.target.contactName.value,
          position: event.target.position.value,
          phone: event.target.phone.value,
          email: event.target.email.value,
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
        {this.state.warehouseList && this.state.warehouseContact && (
          <section className="new-warehouse">
            <div className="new-warehouse__container">
              <div className="new-warehouse__header">
                <Link className="new-warehouse__link" to="/warehouse">
                  <img
                    src={backArrow}
                    alt="Back Arrow to return to warehouse page"
                    className="new-warehouse__back-icon"
                  />
                </Link>
                <h2 className="new-warehouse__title">Edit Warehouse</h2>
              </div>

              <form className="new-warehouse-form" onSubmit={this.handleSubmit}>
                <div className="new-warehouse-form__wrapper">
                  <div className="new-warehouse-form__left">
                    <div className="new-warehouse-form__container">
                      <h3 className="new-warehouse-form__title">
                        Warehouse Details
                      </h3>
                      <label className="new-warehouse-form__label">
                        Warehouse Name
                        <input
                          type="text"
                          name="warehouseName"
                          placeholder="Warehouse Name"
                          className="new-warehouse-form__input"
                          defaultValue={this.state.warehouseList.name}
                          onChange={this.handleWarehouseName}
                        />
                      </label>
                      {this.state.warehouseNameCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}

                      <label className="new-warehouse-form__label">
                        Street Address
                        <input
                          type="text"
                          name="address"
                          placeholder="Street Address"
                          className="new-warehouse-form__input"
                          defaultValue={this.state.warehouseList.address}
                          onChange={this.handleAddress}
                        />
                      </label>
                      {this.state.addressCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}

                      <label className="new-warehouse-form__label">
                        City
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          defaultValue={this.state.warehouseList.city}
                          className="new-warehouse-form__input"
                          onChange={this.handleCity}
                        />
                      </label>
                      {this.state.cityCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}

                      <label className="new-warehouse-form__label">
                        Country
                        <input
                          type="text"
                          name="country"
                          placeholder="Country"
                          defaultValue={this.state.warehouseList.country}
                          className="new-warehouse-form__input"
                          onChange={this.handleCountry}
                        />
                      </label>
                      {this.state.countryCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="new-warehouse-form__right">
                    <div className="new-warehouse-form__container">
                      <h3 className="new-warehouse-form__title">
                        Contact Details
                      </h3>
                      <label className="new-warehouse-form__label">
                        Contact Name
                        <input
                          type="text"
                          name="contactName"
                          placeholder="Contact Name"
                          className="new-warehouse-form__input"
                          defaultValue={this.state.warehouseContact.name}
                          onChange={this.handleContactName}
                        />
                      </label>
                      {this.state.contactNameCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}

                      <label className="new-warehouse-form__label">
                        Position
                        <input
                          type="text"
                          name="position"
                          placeholder="Position"
                          className="new-warehouse-form__input"
                          defaultValue={this.state.warehouseContact.position}
                          onChange={this.handlePosition}
                        />
                      </label>
                      {this.state.positionCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}

                      <label className="new-warehouse-form__label">
                        Phone Number
                        <input
                          name="phone"
                          placeholder="Phone Number"
                          className="new-warehouse-form__input"
                          defaultValue={this.state.warehouseContact.phone}
                          onChange={this.handlePhoneNumber}
                        />
                      </label>
                      {this.state.numberCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}

                      <label className="new-warehouse-form__label">
                        Email
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="new-warehouse-form__input"
                          defaultValue={this.state.warehouseContact.email}
                          onChange={this.handleEmail}
                        />
                      </label>
                      {this.state.emailCheck && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            alt="Error Icon"
                            className="error__icon"
                          />
                          <p className="error__text">This field is required</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="buttons">
                  <div className="buttons__container">
                    <button onClick={this.redirectHome} className="button">
                      Cancel
                    </button>

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

export default WarehouseEdit;
