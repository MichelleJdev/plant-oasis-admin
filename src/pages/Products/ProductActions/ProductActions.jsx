import React from "react";
import "./ProductActions.css";
import { Link } from "react-router-dom";
import { BiRename } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";

function ProductActions({ setRenaming, productId, setDeleting }) {
  return (
    <div className="QuickActions">
      <button
        className="quickAction btn"
        onClick={() => setRenaming(productId)}
      >
        <BiRename />
      </button>
      <button className="quickAction btn">
        <Link to={`/products/${productId}`}>
          <BiEditAlt />
        </Link>
      </button>
      <button
        className="quickAction btn"
        onClick={() => setDeleting(productId)}
      >
        <BiTrash />
      </button>
    </div>
  );
}

export default ProductActions;
