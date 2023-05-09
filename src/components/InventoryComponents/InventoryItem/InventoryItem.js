import { Component } from "react";
import "./InventoryItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../../utils/utils.js";
import backArrow from "../../../assets/Icons/arrow_back-24px.svg";
import editHead from "../../../assets/Icons/edit_second-24px.svg";

class InventoryItem extends Component {
  state = {
    inventoryItem: [],
  };

  componentDidMount() {
    this.getInventoryItem(this.props.match.params.id)
      .then((response) => {
        this.setState({
          inventoryItem: response.data,
        });
      })
      .catch((error) => {
        console.log("Failed Task Successfully", error);
      });
  }

  getInventoryItem = (inventoryId) =>
    axios.get(`${url}inventory/${inventoryId}`);

  stockCheck = (stock) => (stock === 0 ? "OUT OF STOCK" : "IN STOCK");

  render() {
    const { warehouseName, itemName, description, category, quantity, id } =
      this.state.inventoryItem;

    return (
      <section className="inventory-item">
        <div className="inventory-item__container">
          <div className="inventory-item__header">
            <div className="inventory-item__wrapper">
              <Link className="inventory-item__link" to="/inventory">
                <img
                  src={backArrow}
                  alt="Back Arrow to return to warehouse page"
                  className="inventory-item__back-icon"
                />
              </Link>
              <h2 className="inventory-item__title">{itemName}</h2>
            </div>

            <Link
              className="inventory-item__edit-link"
              to={`/inventory/edit/${id}`}
            >
              <img
                src={editHead}
                alt="Edit Warehouse Details"
                className="inventory-item__edit"
              />
              <p className="inventory-item__text">Edit</p>
            </Link>
          </div>

          <div className="item-detail">
            <div className="item-detail__left">
              <div className="item-detail__container">
                <h4 className="item-detail__title">ITEM DESCRIPTION:</h4>
                <p className="item-detail__description body-small">
                  {description}
                </p>
              </div>

              <div className="item-detail__container">
                <h4 className="item-detail__title">CATEGORY:</h4>
                <p className="item-detail__description body-small">
                  {category}
                </p>
              </div>
            </div>

            <div className="item-detail__right">
              <div className="item-detail__wrapper">
                <div className="item-detail__container item-detail__description--center ">
                  <h4 className="item-detail__title">STATUS:</h4>

                  <div className="item-detail__description">
                    <p
                      className={
                        quantity === 0
                          ? "out-of-stock out-of-stock--big body-small"
                          : "in-stock in-stock--big body-small"
                      }
                    >
                      {this.stockCheck(quantity)}
                    </p>
                  </div>
                </div>

                <div className="item-detail__container item-detail__description--center">
                  <h4 className="item-detail__title">QUANTITY:</h4>
                  <p className="item-detail__description body-small">
                    {quantity}
                  </p>
                </div>
              </div>

              <div className="item-detail__container">
                <h4 className="item-detail__title">WAREHOUSE:</h4>
                <p className="item-detail__description body-small">
                  {warehouseName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default InventoryItem;
