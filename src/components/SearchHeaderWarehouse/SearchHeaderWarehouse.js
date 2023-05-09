import "./SearchHeaderWarehouse.scss";
import { Link } from "react-router-dom";

function SearchHeaderWarehouse({ title, handleOnChange }) {
  const nameChange = (name) => name;
  return (
    <>
      <div className="search">
        <h1 className="search__title">{nameChange(title)}</h1>
        <form className="search__form form">
          <label className="form__label" htmlFor="search"></label>
          <input  onChange={(event)=>handleOnChange(event.target.value)}
            className="form__input"
            placeholder="Search..."
            name="search"
            
          ></input>
          <Link className="search__link" to="/warehouse/add">
            <button className="form__button">+ Add New Item</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default SearchHeaderWarehouse;
