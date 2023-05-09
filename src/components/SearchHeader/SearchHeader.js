import "./SearchHeader.scss";
import { Link } from "react-router-dom";

function SearchHeader({ title, urlPath, item, handleOnChange, searchTerm }) {
  return (
    <>
      <div className="search">
        <h1 className="search__title">{title}</h1>
        <form className="search__form form">
          <label className="form__label" htmlFor="search"></label>
          <input
          onChange={(event)=>handleOnChange(event.target.value)}
            className="form__input"
            placeholder="Search..."
            name="search"
            value={searchTerm}
          ></input>
          <Link to={`${urlPath}`} className="form__button">
            {`+ Add New ${item}`}
          </Link>
        </form>
      </div>
    </>
  );
}

export default SearchHeader;
