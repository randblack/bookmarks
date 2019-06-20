import React from "react";
import "./style.css";
const API = require("../../utils/API").default

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(book) {
  return (
    <span onClick={() => API.deleteBook(book)} className="delete-btn" role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;
