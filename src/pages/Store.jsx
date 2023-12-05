import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import redRating from "../assets/images/redRating.png";
import { act } from "react-dom/test-utils";

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

  useEffect(() => {
    const interval = setInterval(() => {
      //refresh transaction
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
            return;
          }
          setActiveTransaction(activeTransactions[0]);
          setOrderStatus(true);
          console.log("Active transaction:", activeTransactions[0]);
        })
        .catch((error) => {
          console.error("Error fetching transaction data:", error);
        });
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
        setActiveTransaction(response.data);
        console.log("Transaction created successfully", response);
      })
      .catch((error) => console.error("Error creating transaction", error));
  };

  useEffect(() => {
    const userApiEndpoint = `http://localhost:8080/api/getUserById/${vendor.userId}`;
    const accountApiEndpoint = "http://localhost:8080/api/getAccountById/";
    const storeApiEndpoint = "http://localhost:8080/api/getStoreById/";

    console.log("YOU ARE IN STORE USER:", user);

    axios
      .get(userApiEndpoint)
      .then((response) => {
        if (response.data && response.data.account.accountId) {
          return axios.get(
            accountApiEndpoint + response.data.account.accountId
          );
        } else {
          throw new Error("Account ID not found in user data");
        }
      })
      .then((response) => {
        if (response.data && response.data.store) {
          return axios.get(storeApiEndpoint + response.data.store.storeId);
        } else {
          throw new Error("Store ID not found in account data");
        }
      })
      .then((response) => {
        if (response.data) {
          setStore(response.data);
          console.log("Store data:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));

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

    fetchProducts();
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => setEditMode(true);

  useEffect(() => {
    if (user.account.store) {
      setEditedStore({
        storeName: user.account.store.storeName,
        category: user.account.store.category,
        description: user.account.store.description,
      });
    }
  }, [user.account.store]);

  const handleStoreInputChange = (event) => {
    const { name, value } = event.target;
    setEditedStore({
      ...editedStore,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Save clicked", products);

    products.forEach((product) => {
      axios
        .put(
          `http://localhost:8080/api/updateProductServiceById/${product.productId}`,
          product
        )
        .then((response) => console.log("Product updated:", response.data))
        .catch((error) => console.error("Error updating product:", error));
    });

    axios
      .put(
        `http://localhost:8080/api/updateStoreById/${user.account.store.storeId}`,
        editedStore
      )
      .then((response) => {
        console.log("Store updated:", response.data);
        setStore(response.data);
        setUser((prevUser) => ({
          ...prevUser,
          account: {
            ...prevUser.account,
            store: response.data,
          },
        }));
      })
      .catch((error) => console.error("Error updating store:", error));

    setEditMode(false);
    setEditedProduct({
      picture: "",
      name: "",
      price: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      picture: e.target.files[0],
    });
    setImagePreview(
      e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null
    );
  };

  const handleProductImageChange = (e, index) => {
    const newProducts = [...products];
    newProducts[index].image = e.target.files[0];
    newProducts[index].imagePreview = e.target.files[0]
      ? URL.createObjectURL(e.target.files[0])
      : null;
    setProducts(newProducts);
  };

  const handleProductInputChange = (e, index) => {
    const { name, value } = e.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const handleAdd = async () => {
    if (!editedProduct.picture || !editedProduct.name || !editedProduct.price) {
      alert("Please fill in all product details.");
      return;
    }

    function convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });
    }

    const imageBase64 = await convertToBase64(editedProduct.picture);

    const productData = {
      name: editedProduct.name,
      price: editedProduct.price,
      image: imageBase64,
      store: { storeId: user.account.store.storeId },
    };

    setProducts((prevProducts) => [...prevProducts, productData]);

    axios
      .post("http://localhost:8080/api/createProductService", productData)
      .then((response) => console.log("Product created:", response.data))
      .catch((error) => console.error("Error creating product:", error));

    setEditedProduct({
      picture: "",
      name: "",
      price: "",
    });

    setImagePreview(null);
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
    setOrderStatus(true);
    let orderedList = [];
    for (let i = 0; i < products.length; i++) {
      if (quantity[i] > 0) {
        orderedList.push(
          `${products[i].name} Php${products[i].price} x${quantity[i]}`
        );
      }
    }
    let orderedListString = orderedList.join("; ");
    orderedListString += `;; Total: Php${calculateTotalPrice()}`;
    setDetails(orderedListString);
    handleOrder(orderedListString, vendor, user);
  };

  const OrderDetails = (activeTransaction) => {
    const handleCancelOrder = () => {
      axios.put(`http://localhost:8080/api/updateTransactionById/${activeTransaction.activeTransaction.transactionId}`, {status: "Cancelled"})    
      .then(response => {
        console.log("Transaction cancelled:", response.data);
        setOrderStatus(false);
      })
    }

    return (
      <>
      <div>
        <h2>Active Order</h2>
        {activeTransaction.activeTransaction.details
          .split(";")
          .map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
      </div>
      <button onClick={handleCancelOrder}>Cancel Order</button>
      </>
    );
  };

  return (
    <>
      <div style={{ height: "70vh", display: "flex", flexDirection: "column" }}>
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
              {vendor?.firstName || "Loading..."}
            </h2>
            {vendor?.category}
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
      {orderStatus ? (
        <OrderDetails activeTransaction={activeTransaction} />
      ) : (
        <button
          type="button"
          className="w-full bg-primary p-3 text-white rounded-[20px] flex items-center justify-center mt-5"
          disabled={quantity.every((q) => q === 0)}
          onClick={handleOrderClick}
        >
          <span className="text-lg  ">Order</span>
        </button>
      )}
    </>
  );
};

export default Store;
