import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { toast } from "react-toastify";

const Card = () => {
  const [productCard, setProductCard] = useState([]);
  const [addCard, setAddCard] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const addCardHandle = (cardItem) => {
    setAddCard((prevState) => {
      return [...prevState, cardItem];
    });
    toast.success("Added successfully to the Card", {
      icon: "🚀",
    });
  };
  useEffect(() => {
    alanBtn({
      key: "9cec2bc31317c974ee4a3ff09ec1eb4f2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log(commandData);
        if (commandData.command === "productMenu") {
          setProductCard(commandData.data)
        }else if(commandData.command === 'addCart'){
          addCardHandle(commandData.data)
        }else if(commandData.command === 'showCart'){
          setIsOpen(true)
        }else if(commandData.command === 'closeCart'){
          setIsOpen(false)
        }
      },
    });
  }, []);

  const modalHandler = () => {
    setIsOpen(true);
  };
  console.log(productCard);

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="d-flex flex-wrap row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productCard.map((item, index) => (
            <div className="col" style={{ minHeight: "600px" }} key={index}>
              <div className="card shadow-sm">
                <div className="card-title">
                  <h4 className="text-muted text-center">Product #{item.id}</h4>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="bg-placeholder card-image-top"
                  height="350px"
                  width="100%"
                />
                <div className="card-body">
                  <p className="card-text">{item.title.slice(0, 20)}</p>
                  <p className="card-text fw-light">
                    {item.description.slice(0, 100)}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <span>{item.category}: </span>
                  </div>
                  <div>
                    <span> ${item.price}</span>
                  </div>
                </div>
                <button
                  className="mt-4 bg-primary text-light"
                  onClick={() => addCardHandle(item)}
                >
                  Add to Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed-top m-3">
        <button
          onClick={modalHandler}
          type="button"
          className="btn btn-primary position-relative"
        >
          Card
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {addCard.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </div>
      {isOpen && (
        <div
          className="modal"
          tabindex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                {addCard.map((item, index) => (
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5>{item.title}</h5>
                          <p className="text-muted">{item.description}</p>
                          <p className="card-text">
                            <small className="text-muted">${item.price}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
