import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, {
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { UserContext } from "../UserContext";

const Store = ({ vendor }) => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    setSelectedVendor(vendor);
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
      fetchStore();
      fetchProducts();
    }
  }, [vendor]);

  useEffect(() => {
    refreshActiveTransaction();
    const interval = setInterval(refreshActiveTransaction, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalItems = () => quantity.reduce((a, b) => a + b, 0);

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getStoreById/${vendor.account.store.storeId}`
      );
      setStore(response.data);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getProductServicesByStoreId/store/${vendor.account.store.storeId}`
      );
      setProducts(response.data);
      setQuantity(new Array(response.data.length).fill(0));
    } catch (error) {
      console.error("Error fetching products:", error);
      const localData = localStorage.getItem("products");
      if (localData) {
        setProducts(JSON.parse(localData));
        setQuantity(new Array(JSON.parse(localData).length).fill(0));
      }
    }
  };

  const refreshActiveTransaction = () => {
    axios
      .get("http://localhost:8080/api/getAllTransactions")
      .then((response) => {
        const activeTransactions = response.data.filter((transaction) => {
          return (
            transaction.customer.accountId === user.account.accountId &&
            (transaction.status === "In Queue" ||
              transaction.status === "Now Serving")
          );
        });

        if (activeTransactions.length === 0) {
          setOrderStatus(false);
          setActiveTransaction(null);
          return;
        }
        setOrderStatus(true);
        setActiveTransaction(activeTransactions[0]);
      })
      .catch((error) => {
        console.error("Error fetching transaction data:", error);
      });
  };

  const handleOrder = (details, vendor, customer) => {
    axios
      .post("http://localhost:8080/api/createTransaction", {
        vendor: vendor.account,
        customer: customer.account,
        details: details,
        status: "In Queue",
      })
      .then((response) => {
        refreshActiveTransaction();
      })
      .catch((error) => console.error("Error creating transaction", error));
  };

  const handleQuantityChange = (index, operation) => {
    const newQuantity = [...quantity];
    if (operation === "+") {
      newQuantity[index]++;
    } else if (operation === "-") {
      newQuantity[index] = Math.max(0, newQuantity[index] - 1);
    }
    setQuantity(newQuantity);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      totalPrice += products[i].price * quantity[i];
    }
    return totalPrice;
  };

  const handleOrderClick = () => {
    let orderedList = [];
    for (let i = 0; i < products.length; i++) {
      if (quantity[i] > 0) {
        orderedList.push(
          `${products[i].name} ₱${products[i].price} x${quantity[i]}`
        );
      }
    }
    let orderedListString = orderedList.join("; ");
    orderedListString += `; Total: ₱${calculateTotalPrice()}`;
    setDetails(orderedListString);
    setOpenOrderDialog(true);
  };

  const handleCancelOrder = () => {
    setOpenCancelDialog(true);
  };

  const OrderDetails = (activeTransaction) => {
    const orderStatus = activeTransaction.activeTransaction.status;
    const statusColor = orderStatus === "In Queue" ? "#0071b3" : "#e8594f";
    const scrollRef = useRef();
    const scrollPosition = useRef(0);

    useLayoutEffect(() => {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition");
      if (savedScrollPosition && scrollRef.current) {
        scrollRef.current.scrollTop = parseInt(savedScrollPosition, 10);
      }

      const handleScroll = () => {
        scrollPosition.current = scrollRef.current?.scrollTop || 0;
      };

      if (scrollRef.current) {
        scrollRef.current.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (scrollRef.current) {
          scrollRef.current.removeEventListener("scroll", handleScroll);
          sessionStorage.setItem("scrollPosition", scrollPosition.current);
        }
      };
    }, []);

    return (
      <>
        <div
          style={{
            position: "absolute",
            width: "360px",
            bottom: "20px",
          }}
        >
          {activeTransaction && (
            <div
              className="noscrollbar bg-white shadow-md rounded-lg p-6 max-w-md mx-auto h-[190px] overflow-auto"
              ref={scrollRef}
            >
              <div className="text-gray-800 text-m">
                Active Order:{" "}
                <span style={{ fontWeight: "bold", color: statusColor }}>
                  {orderStatus}
                </span>
              </div>
              <p style={{ color: "grey" }}>
                Vendor: {activeTransaction.activeTransaction.vendor.email}
              </p>
              {activeTransaction.activeTransaction.details
                .split(";")
                .map((line, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    {line.includes("Total") ? (
                      <div className="text-right w-full mt-4 text-lg font-semibold text-gray-800">
                        {line}
                      </div>
                    ) : (
                      <span className="text-gray-700 text-lg w-full">
                        {line}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          )}

          <button
            className="w-full bg-tertiary py-3 px-4 text-white rounded-lg mt-4"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </button>
        </div>
      </>
    );
  };

  return (
    <div
      className="noscrollbar"
      style={{
        overflow: "auto",
        height: "100%",
      }}
    >
      {selectedVendor && (
        <div>
          <div
            className="noscrollbar"
            style={{
              height: activeTransaction ? "calc(70vh - 200px)" : "70vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>
              <img
                src={`data:image/png;base64, ${vendor?.image || ""}`}
                alt="User"
                className="w-14 h-15 rounded-full border-2 border-black"
                style={{ width: "70px", height: "70px" }}
              />
              <div className="ml-3" style={{ flexDirection: "column" }}>
                <h2 className="text-xl font-semibold">
                  {vendor?.account.store.storeName || "Loading..."}
                </h2>
                {vendor?.account.store.category}
              </div>
            </div>
            <div style={{ marginTop: "20px", width: "350px" }}>
              <p style={{ textAlign: "justify", wordWrap: "break-word" }}>
                {vendor?.account?.store?.description || "Loading..."}
              </p>
            </div>
            <h1
              className="p-2 text-lg font-medium"
              style={{ fontSize: "25px", color: "#0071B3" }}
            >
              Products
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.productId}
                  style={{
                    marginBottom: "20px",
                    width: "48%",
                    position: "relative",
                    marginRight: "2%",
                  }}
                >
                  <>
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "20px",
                      }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "50%",
                        width: "100%",
                        transform: "translateX(-50%)",
                        paddingInline: "10px",
                        color: "black",
                        fontSize: "17px",
                        backgroundColor: "rgba(255,255,255, 0.7)",
                        borderTopRadius: "15px",
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        bottom: "3%",
                        left: "3%",
                        textAlign: "left",
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        backgroundColor: "#c0d8f0",
                        paddingInline: "5px",
                        borderRadius: "20px",
                      }}
                    >
                      ₱ {product.price}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "3%",
                        right: "3%",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#c0d8f0",
                        borderRadius: "20px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#0071B3",
                          color: "white",
                          borderRadius: "10px",
                          paddingInline: "5px",
                          marginRight: "5px",
                        }}
                        disabled={orderStatus}
                        onClick={() => handleQuantityChange(index, "+")}
                      >
                        +
                      </button>
                      <span>{quantity[index]}</span>
                      <button
                        style={{
                          backgroundColor: "#0071B3",
                          color: "white",
                          borderRadius: "10px",
                          paddingInline: "5px",
                          marginLeft: "5px",
                        }}
                        disabled={orderStatus}
                        onClick={() => handleQuantityChange(index, "-")}
                      >
                        -
                      </button>
                    </div>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          textAlign: "center",
          bottom: activeTransaction ? "280px" : "80px",
          position: "absolute",
          zIndex: "1",
        }}
        className="w-[360px] flex justify-center items-center"
      >
        <h2>Total: ₱{totalItems() > 0 ? calculateTotalPrice() : 0}</h2>
      </div>
      {activeTransaction ? (
        <OrderDetails activeTransaction={activeTransaction} />
      ) : selectedVendor ? (
        <button
          type="button"
          className="w-full bg-primary p-3 text-white rounded-[20px] flex items-center justify-center mt-5"
          disabled={quantity.every((q) => q === 0)}
          onClick={handleOrderClick}
          style={{
            width: "360px",
            position: "absolute",
            bottom: "20px",
          }}
        >
          <span className="text-lg  ">Order</span>
        </button>
      ) : (
        <p style={{ textAlign: "center" }}>Select a store.</p>
      )}
      <Dialog
        open={openOrderDialog}
        onClose={() => setOpenOrderDialog(false)}
        aria-labelledby="order-dialog-title"
        aria-describedby="order-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle id="order-dialog-title">{"Confirm Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="order-dialog-description">
            Are you sure you want to order the following items?
          </DialogContentText>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {quantity[index] > 0 && (
                  <span>
                    {product.name} x {quantity[index]} = ₱{" "}
                    {product.price * quantity[index]}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p>Total: ₱{calculateTotalPrice()}</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenOrderDialog(false)}
            color="primary"
            style={{
              backgroundColor: "#E8594F",
              color: "white",
              borderRadius: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleOrder(details, vendor, user);
              setOpenOrderDialog(false);
            }}
            color="primary"
            autoFocus
            style={{
              backgroundColor: "#0575B4",
              color: "white",
              borderRadius: "15px",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle id="cancel-dialog-title">{"Confirm Cancel"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel your order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCancelDialog(false)}
            color="primary"
            style={{
              backgroundColor: "#E8594F",
              color: "white",
              borderRadius: "15px",
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              axios
                .put(
                  `http://localhost:8080/api/updateTransactionById/${activeTransaction.transactionId}`,
                  {
                    ...activeTransaction,
                    status: "Cancelled",
                  }
                )
                .then((response) => {
                  console.log("Transaction cancelled:", response.data);
                  setOrderStatus(false);
                });
              setOpenCancelDialog(false);
            }}
            color="primary"
            autoFocus
            style={{
              backgroundColor: "#0575B4",
              color: "white",
              borderRadius: "15px",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Store;
