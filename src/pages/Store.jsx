import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import redRating from "../assets/images/redRating.png";
import { act } from "react-dom/test-utils";
import CustomButton from "../components/CustomButton";

const Store = ({ vendor }) => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    picture: "",
    name: "",
    price: "",
  });
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editedStore, setEditedStore] = useState({
    storeName: "",
    category: "",
    description: "",
  });
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openOrderDialog, setOpenOrderDialog] = useState(false); // state for order confirmation dialog
  const [openCancelDialog, setOpenCancelDialog] = useState(false); // state for cancel confirmation dialog

  useEffect(() => {
    setSelectedVendor(vendor);
  }, [vendor]);

  const totalItems = () => quantity.reduce((a, b) => a + b, 0);

  const refreshActiveTransaction = () => {
    //refresh transaction
    axios
      .get("http://localhost:8080/api/getAllTransactions")
      .then((response) => {
        console.log("All transactions:", response.data);
        const activeTransactions = response.data.filter((transaction) => {
          return (
            transaction.customer.accountId === user.account.accountId &&
            (transaction.status === "In Queue" ||
              transaction.status === "Now Serving")
          );
        });

        console.log("Active transaction:", activeTransactions[0]);
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

  useEffect(() => {
    refreshActiveTransaction();
    const interval = setInterval(() => {
      refreshActiveTransaction();
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

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
        console.log("Transaction created successfully", response);
      })
      .catch((error) => console.error("Error creating transaction", error));
  };

  useEffect(() => {
    if (vendor) {
      const fetchStore = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/getStoreById/${vendor.account.store.storeId}`
          );
          setStore(response.data);
          setEditedStore({
            storeName: response.data.storeName,
            category: response.data.category,
            description: response.data.description,
          });
          setLoading(false);
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
          console.log("Products:", response.data);
          localStorage.setItem("products", JSON.stringify(response.data));
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

      fetchStore();
      fetchProducts();
    }
  }, [vendor]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => setEditMode(true);

  useEffect(() => {
    if (vendor && vendor.account && vendor.account.store) {
      setEditedStore({
        storeName: vendor.account.store.storeName,
        category: vendor.account.store.category,
        description: vendor.account.store.description,
      });
    }
  }, [vendor, vendor?.account]);

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
    setOpenOrderDialog(true); // open the order confirmation dialog
  };

  const handleCancelOrder = () => {
    setOpenCancelDialog(true); // open the cancel confirmation dialog
  };

  const OrderDetails = (activeTransaction) => {
    return (
      <>
        <div>
          {activeTransaction ? (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto h-[190px] overflow-auto">
              <div className="text-gray-800 text-m font-semibold mb-4">
                {activeTransaction.activeTransaction.status}
              </div>
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
          ) : (
            ""
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
    <>
      {selectedVendor ? (
        <>
          <div
            style={{
              height: activeTransaction ? "50vh" : "70vh",
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
                onClick={handleMenu}
              />
              <div className="ml-3" style={{ flexDirection: "column" }}>
                <h2 className="text-xl font-semibold">
                  {vendor?.account.store.storeName || "Loading..."}
                </h2>
                {vendor?.account.store.category}
              </div>
            </div>
            <div className="p-2" style={{ height: "90px" }}>
              <p className="text-sm" style={{ textAlign: "justify" }}>
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
                maxHeight: "450px",
                display: "flex",
                flexWrap: "wrap",
                overflow: "auto",
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.productId}
                  style={{
                    marginBottom: "20px",
                    width: "48%",
                    position: "relative",
                  }}
                >
                  <>
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "150px",
                        border: "1px solid black",
                        borderRadius: "15px",
                      }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "1px",
                        left: "49%",
                        width: "100%",
                        transform: "translateX(-50%)",
                        paddingLeft: "10px",
                        paddingRight: "5px",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        backgroundColor: "rgba(136, 170, 204, 0.7)",
                        borderRadius: "15px",
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      style={{
                        position: "absolute",
                        bottom: "1px",
                        left: "3%",
                        textAlign: "left",
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        backgroundColor: "#c0d8f0",
                        paddingLeft: "10px",
                        paddingRight: "5px",
                        borderRadius: "10px",
                      }}
                    >
                      ₱ {product.price}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1px",
                        right: "3%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#0071B3",
                          color: "white",
                          borderRadius: "10px",
                          padding: "5px",
                          margin: "2px",
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
                          padding: "5px",
                          margin: "2px",
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
        </>
      ) : null}
      {/* Order Total Preview Section */}

      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          margin: "10px",
          textAlign: "center",
        }}
      >
        <h2>
          Total Order Price: ₱{totalItems() > 0 ? calculateTotalPrice() : 0}
        </h2>
      </div>
      {activeTransaction ? (
        <OrderDetails activeTransaction={activeTransaction} />
      ) : selectedVendor ? (
        <button
          type="button"
          className="w-full bg-primary p-3 text-white rounded-[20px] flex items-center justify-center mt-5"
          disabled={quantity.every((q) => q === 0)}
          onClick={handleOrderClick}
        >
          <span className="text-lg  ">Order</span>
        </button>
      ) : (
        <p>Select a store.</p>
      )}

      {/* Order confirmation dialog */}
      <Dialog
        open={openOrderDialog}
        onClose={() => setOpenOrderDialog(false)}
        aria-labelledby="order-dialog-title"
        aria-describedby="order-dialog-description"
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
            style={{ backgroundColor: "#E8594F", color: "white" }}
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
            style={{ backgroundColor: "#0575B4", color: "white" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel confirmation dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
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
            style={{ backgroundColor: "#E8594F", color: "white" }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              axios
                .put(
                  `http://localhost:8080/api/updateTransactionById/${activeTransaction.activeTransaction.transactionId}`,
                  {
                    ...activeTransaction.activeTransaction,
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
            style={{ backgroundColor: "#0575B4", color: "white" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Store;
