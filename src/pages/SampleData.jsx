// Import React and Axios libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the base URL for the server
const baseURL = "http://localhost:8080/api";

// Define a custom component for displaying a product or a service
const Product = ({ product }) => {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
};

// Define a custom component for displaying a store
const Store = ({ store }) => {
  // Use state to store the product services of the store
  const [productServices, setProductServices] = useState([]);

  // Use effect to fetch the product services by the store id
  useEffect(() => {
    axios
      .get(`${baseURL}/getProductServicesByStoreId/store/${store.id}`)
      .then((response) => {
        // Set the product services state with the response data
        setProductServices(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, [store.id]);

  return (
    <div className="store">
      <h2>{store.storeName}</h2>
      <p>Description: {store.description}</p>
      <p>Category: {store.category}</p>
      <div className="products">
        {productServices.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Define a custom component for displaying an account
const Account = ({ account }) => {
  // Use state to store the user or the vendor profile of the account
  const [profile, setProfile] = useState(null);

  // Use effect to fetch the user or the vendor profile by the account id
  useEffect(() => {
    axios
      .get(`${baseURL}/getUserById/${account.id}`)
      .then((response) => {
        // Set the profile state with the response data
        setProfile(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, [account.id]);

  return (
    <div className="account">
      <h1>{account.email}</h1>
      <p>Is vendor: {account.isVendor ? "Yes" : "No"}</p>
      <p>Is admin: {account.isAdmin ? "Yes" : "No"}</p>
      {profile && (
        <div className="profile">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p>Birth date: {profile.birthDate}</p>
          <img src={profile.image} alt={profile.firstName} />
        </div>
      )}
      {account.isVendor && <Store store={account.store} />}
    </div>
  );
};

// Define the main component for the React page
const SampleData = () => {
  // Use state to store the accounts
  const [accounts, setAccounts] = useState([]);

  // Use effect to create some sample data for two vendors and two customers
  useEffect(() => {
    // Define an array of sample accounts
    const sampleAccounts = [
      {
        email: "vendor1@example.com",
        password: "vendor1",
        isVendor: true,
        isAdmin: false,
        isDeleted: false,
        user: {
          firstName: "Vendor",
          lastName: "One",
          birthDate: "1990-01-01",
          image: "https://i.imgur.com/1.jpg",
          isDeleted: false,
        },
        location: {
          latitude: 1.234,
          longitude: 5.678,
          isActive: true,
          isDeleted: false,
        },
        store: {
          storeName: "Vendor One Store",
          description: "A store that sells books and stationery",
          category: "Books and Stationery",
          isDeleted: false,
          productServices: [
            {
              name: "Harry Potter and the Philosopher's Stone",
              price: 9.99,
              image: "https://i.imgur.com/2.jpg",
              isDeleted: false,
            },
            {
              name: "Notebook",
              price: 4.99,
              image: "https://i.imgur.com/3.jpg",
              isDeleted: false,
            },
          ],
        },
      },
      {
        email: "vendor2@example.com",
        password: "vendor2",
        isVendor: true,
        isAdmin: false,
        isDeleted: false,
        user: {
          firstName: "Vendor",
          lastName: "Two",
          birthDate: "1991-02-02",
          image: "https://i.imgur.com/4.jpg",
          isDeleted: false,
        },
        location: {
          latitude: 2.345,
          longitude: 6.789,
          isActive: true,
          isDeleted: false,
        },
        store: {
          storeName: "Vendor Two Store",
          description: "A store that sells clothes and accessories",
          category: "Clothes and Accessories",
          isDeleted: false,
          productServices: [
            {
              name: "T-shirt",
              price: 14.99,
              image: "https://i.imgur.com/5.jpg",
              isDeleted: false,
            },
            {
              name: "Sunglasses",
              price: 19.99,
              image: "https://i.imgur.com/6.jpg",
              isDeleted: false,
            },
          ],
        },
      },
      {
        email: "customer1@example.com",
        password: "customer1",
        isVendor: false,
        isAdmin: false,
        isDeleted: false,
        user: {
          firstName: "Customer",
          lastName: "One",
          birthDate: "1992-03-03",
          image: "https://i.imgur.com/7.jpg",
          isDeleted: false,
        },
        location: {
          latitude: 3.456,
          longitude: 7.890,
          isActive: true,
          isDeleted: false,
        },
      },
      {
        email: "customer2@example.com",
        password: "customer2",
        isVendor: false,
        isAdmin: false,
        isDeleted: false,
        user: {
          firstName: "Customer",
          lastName: "Two",
          birthDate: "1993-04-04",
          image: "https://i.imgur.com/8.jpg",
          isDeleted: false,
        },
        location: {
          latitude: 4.567,
          longitude: 8.901,
          isActive: true,
          isDeleted: false,
        },
      },
    ];

    // Loop through the sample accounts and create them using the APIs
    sampleAccounts.forEach((account) => {
      // Create the account using the /createAccount API
      axios
        .post(`${baseURL}/createAccount`, account)
        .then((response) => {
          // Get the created account from the response data
          const createdAccount = response.data;

          // Add the created account to the accounts state
          setAccounts((prevAccounts) => [...prevAccounts, createdAccount]);

          // If the account is a vendor, create the store and the product services using the APIs
          if (account.isVendor) {
            // Create the store using the /createStore API
            axios
              .post(`${baseURL}/createStore`, {
                ...account.store,
                account: createdAccount,
              })
              .then((response) => {
                // Get the created store from the response data
                const createdStore = response.data;

                // Loop through the product services and create them using the /createProductService API
                account.store.productServices.forEach((productService) => {
                  axios
                    .post(`${baseURL}/createProductService`, {
                      ...productService,
                      store: createdStore,
                    })
                    .then((response) => {
                      // Get the created product service from the response data
                      const createdProductService = response.data;

                      // Log the created product service
                      console.log(createdProductService);
                    })
                    .catch((error) => {
                      // Handle the error
                      console.error(error);
                    });
                });
              })
              .catch((error) => {
                // Handle the error
                console.error(error);
              });
          }
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    });
  }, []);

  return (
    <div className="app">
      <h1>Sample React Page</h1>
      <div className="accounts">
        {accounts.map((account) => (
          <Account key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default SampleData;
