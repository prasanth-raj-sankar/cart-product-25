import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Product = ({ 
  id, title, price, description, category, image, rating, addToFavorites, removeFromFavorites, isFavorite = false 
}) => {
  const [quantity, setQuantity] = useState(1);
  const priceAfterDiscount = (price - price * (rating / 100)).toFixed(2);
  const [subTotal, setSubTotal] = useState((priceAfterDiscount * quantity).toFixed(2));

  useEffect(() => {
    setSubTotal((priceAfterDiscount * quantity).toFixed(2));
  }, [quantity, priceAfterDiscount]);

  const handleQuantitySub = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityAdd = () => {
    setQuantity(quantity + 1);
  };

  const originalPrice = price;
  const discountAmount = price * (rating / 100);

  return (
    <div className="col-12 d-flex justify-content-center align-items-center">
      <div className="card mb-3" style={{ width: "80%", borderRadius: "20px" }}>
        <div className="row g-0">
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <img
              src={image}
              className="img-fluid product-img"
              alt={title}
              style={{ borderRadius: "30px" }}
            />
          </div>
          <div className="col-md-7">
            <div className="row g-0">
              <div className="col-md">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title">{title}</h5>
                    </div>
                    <div className="col">
                      <h5 className="card-title d-flex justify-content-end">
                        ${price}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text">
                        <b>Brand: </b>
                        {category}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="card-text">{description}</p>
                    </div>
                    <div className="col d-flex justify-content-end"></div>
                  </div>
                  <div className="row">
                    <div className="col d-flex align-items-center">
                      <h5 className="review-stat">
                        Rating: {rating}
                      </h5>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                      <div>
                        <button
                          className="btn btn-secondary"
                          onClick={handleQuantitySub}
                        >
                          -
                        </button>
                        <span> {quantity} </span>
                        <button
                          className="btn btn-secondary"
                          onClick={handleQuantityAdd}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col card-text d-flex align-items-center">
                      <small className="text-muted d-flex align-items-center">
                        Last updated 3 mins ago
                      </small>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0 p-4 subtotal">
              <div className="col">
                <div className="row">
                  <div className="card-title col">
                    Original Price (1 item):
                  </div>
                  <div className="card-title col text-end">${originalPrice}</div>
                </div>
                <div className="row">
                  <div className="card-title col text-success">
                    Discount Amount:
                  </div>
                  <div className="card-title col text-end text-success">
                    ${discountAmount.toFixed(2)}
                  </div>
                </div>
                <div className="row">
                  <div className="card-title col">
                    Final Price (1 item):
                  </div>
                  <div className="card-title col text-end">
                    ${priceAfterDiscount}
                  </div>
                </div>
                <div className="row">
                  <div className="card-title col">
                    <h5>Total Price:</h5>
                  </div>
                  <div className="card-title col text-end">
                    <h5>${subTotal}</h5>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                {isFavorite ? (
                  <button
                    className="btn btn-secondary"
                    onClick={() => removeFromFavorites(id)}
                  >
                    Remove from Favorites
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToFavorites({ id, title, price, description, category, image, rating })}
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};

export default Product;
