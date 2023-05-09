import React from "react";
import "./WarehouseList.scss";
import chevron from "../../../assets/Icons/chevron_right-24px.svg";
import DeleteModal from "../../DeleteModal/DeleteModal";
import axios from "axios";
import SearchHeader from "../../SearchHeader/SearchHeader";
import { Link } from "react-router-dom";
import url from "../../utils/utils";

class WarehouseList extends React.Component {
  state = {
    warehouseList: [],
    isOpen: false,
    activeWarehouseId: null,
    warehouseContact: null,
    order: "ASC",
  };

  componentDidMount() {
    axios
      .get(`${url}warehouse`)
      .then((response) => {
        return response.data;
      })
      .then((warehouseData) => {
        this.setState({
          warehouseList: warehouseData,
          warehouseContact: warehouseData.contact,
        });
      })
      .catch((error) => {
        console.log("Request failed", error);
      });
  }

  openModal = (id) => {
    this.setState({ isOpen: true, activeWarehouseId: id });
  };

  closeModal = () => this.setState({ isOpen: false });

  deleteItem = (id) => {
    axios.delete(`${url}warehouse/${id}`).then((response) => {
      this.setState({ warehouseList: response.data, isOpen: false });
    });
  };

  sorting = (col) => {
    if (col === "[contact][email]") {
      if (this.state.order === "ASC") {
        const sorted = [...this.state.warehouseList].sort((a, b) => {
          return a["contact"]["email"].toLowerCase() >
            b["contact"]["email"].toLowerCase()
            ? 1
            : -1;
        });
        this.setState({ warehouseList: sorted, order: "DSC" });
      }
      if (this.state.order === "DSC") {
        const sorted = [...this.state.warehouseList].sort((a, b) => {
          return a["contact"]["email"].toLowerCase() <
            b["contact"]["email"].toLowerCase()
            ? 1
            : -1;
        });
        this.setState({ warehouseList: sorted, order: "ASC" });
      }
    } else if (col === "[contact][name]") {
      if (this.state.order === "ASC") {
        const sorted = [...this.state.warehouseList].sort((a, b) => {
          return a["contact"]["name"].toLowerCase() >
            b["contact"]["name"].toLowerCase()
            ? 1
            : -1;
        });
        this.setState({ warehouseList: sorted, order: "DSC" });
      }
      if (this.state.order === "DSC") {
        const sorted = [...this.state.warehouseList].sort((a, b) => {
          return a["contact"]["name"].toLowerCase() <
            b["contact"]["name"].toLowerCase()
            ? 1
            : -1;
        });
        this.setState({ warehouseList: sorted, order: "ASC" });
      }
    } else if (this.state.order === "ASC") {
      const sorted = [...this.state.warehouseList].sort((a, b) => {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      this.setState({ warehouseList: sorted, order: "DSC" });
    } else if (this.state.order === "DSC") {
      const sorted = [...this.state.warehouseList].sort((a, b) => {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      this.setState({ warehouseList: sorted, order: "ASC" });
    }
  };

  render() {
    const activeWarehouseId = this.state.activeWarehouseId;
    let modalData = this.state.warehouseList.find((warehouse) => {
      return activeWarehouseId === warehouse.id;
    });

    if (this.state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return (
      <>
        {this.state.isOpen && this.state.activeWarehouseId && (
          <DeleteModal
            deleteItem={this.deleteItem}
            closeModal={this.closeModal}
            title={`Delete ${modalData.name} Warehouse?`}
            paragraph={`Please confirm that you'd like to delete the ${modalData.name} warehouse from the warehouse list. You won't be able to undo this action.`}
            id={activeWarehouseId}
          />
        )}

        <SearchHeader
          handleOnChange={this.props.handleOnChange}
          title={"Warehouses"}
          urlPath={"/warehouse/add"}
          item={"Warehouse"}
          searchTerm={this.props.searchTerm}
        />

        <ul className="sorter">
          <li className="sorter__item sorter__item--warehouse">
            Warehouse{" "}
            <button
              onClick={() => this.sorting("name")}
              className="sorter__button"
            ></button>
          </li>
          <li className="sorter__item sorter__item--address">
            Address{" "}
            <button
              onClick={() => this.sorting("address")}
              className="sorter__button"
            ></button>
          </li>
          <li className="sorter__item sorter__item--contact-name">
            Contact Name
            <button
              onClick={() => this.sorting("[contact][name]")}
              className="sorter__button"
            ></button>
          </li>
          <li className="sorter__item sorter__item--contact">
            Contact Information
            <button
              onClick={() => this.sorting("[contact][email]")}
              className="sorter__button"
            ></button>
          </li>
          <li className="sorter__item">Actions</li>
        </ul>
        {this.state.warehouseList
          .filter((warehouse) => {
            if (this.props.searchTerm === "") {
              return warehouse;
            } else if (
              warehouse.name
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.address
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.city
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.country
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.contact.name
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.contact.position
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.contact.phone
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase()) ||
              warehouse.contact.email
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase())
            ) {
              return warehouse;
            }
          })
          .map((warehouse) => {
            return (
              <div key={warehouse.id}>
                <div className="warehouseCard">
                  <ul className="warehouseCard__content-list">
                    <ul className="warehouseCard__sub-list">
                      <li className="warehouseCard__list-details">
                        <h4 className="warehouseCard__list-title">Warehouse</h4>

                        <Link to={`/warehouse/${warehouse.id}/inventory`}>
                          <div className="warehouseCard__link-item">
                            <div className="warehouseCard__link body-medium">
                              {warehouse.name}
                            </div>
                            <img src={chevron} alt="chevron icon" />
                          </div>
                        </Link>
                      </li>
                      <li className="warehouseCard__list-details">
                        <h4 className="warehouseCard__list-title">Address</h4>
                        <p className="warehouseCard__info body-medium">
                          {warehouse.address}
                        </p>
                        <p className="warehouseCard__info body-medium">
                          {warehouse.city}, {warehouse.country}
                        </p>
                      </li>
                    </ul>
                    <ul className="warehouseCard__sub-list">
                      <li className="warehouseCard__list-details">
                        <h4 className="warehouseCard__list-title">
                          Contact Name
                        </h4>
                        <p className="warehouseCard__info body-medium">
                          {warehouse.contact.name}
                        </p>
                      </li>
                      <li className="warehouseCard__list-details">
                        <h4 className="warehouseCard__list-title">
                          Contact Information
                        </h4>
                        <p className="warehouseCard__info body-medium">
                          {warehouse.contact.phone}
                        </p>
                        <p className="warehouseCard__info body-medium">
                          {warehouse.contact.email}
                        </p>
                      </li>
                    </ul>
                  </ul>
                  <div className="warehouseCard__buttons">
                    <button
                      onClick={() => {
                        this.openModal(warehouse.id);
                      }}
                      type="button"
                      className="warehouseCard__button--delete"
                    ></button>
                    <Link to={`/warehouse/${warehouse.id}/edit`}>
                      <div className="warehouseCard__button--edit"></div>
                    </Link>
                  </div>
                </div>
                <div className="warehouseCard--tablet">
                  <Link to={`/warehouse/${warehouse.id}/inventory`}>
                    <div className="warehouseCard__link--tablet body-medium">
                      {warehouse.name}
                      <img src={chevron} alt="chevron" />
                    </div>
                  </Link>
                  <p className="warehouseCard__address--tablet body-medium">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>

                  <p className="warehouseCard__info--name body-medium">
                    {warehouse.contact.name}
                  </p>
                  <div>
                    <p className="warehouseCard__info--contact body-medium">
                      {warehouse.contact.phone}
                    </p>
                    <p className="warehouseCard__info--contact body-medium">
                      {warehouse.contact.email}
                    </p>
                  </div>
                  <div className="warehouseCard__buttons warehouseCard__buttons--tablet">
                    <button
                      onClick={() => {
                        this.openModal(warehouse.id);
                      }}
                      type="button"
                      className="warehouseCard__button--delete"
                    ></button>
                    <Link
                      to={`/warehouse/${warehouse.id}/edit`}
                      className="warehouseCard__button--edit"
                    ></Link>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

export default WarehouseList;
