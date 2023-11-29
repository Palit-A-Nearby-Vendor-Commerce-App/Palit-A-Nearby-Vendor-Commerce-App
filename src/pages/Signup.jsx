import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create location
      const locationResponse = await axios.post('http://localhost:8080/api/createLocation', { latitude, longitude });
      const location = locationResponse.data;

      // Create account
      const accountResponse = await axios.post('http://localhost:8080/api/createAccount', { email, password, isVendor, location });
      const account = accountResponse.data;

      // Create user
      await axios.post('http://localhost:8080/api/createUser', { firstName, lastName, account });

      // Create store if the user is a vendor
      if (isVendor) {
        await axios.post('http://localhost:8080/api/createStore', { storeName, description, category, account });
      }

      alert('Signup successful!');
    } catch (error) {
      console.error('Error during signup', error);
      alert('Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="checkbox" checked={isVendor} onChange={(e) => setIsVendor(e.target.checked)} /> Are you a vendor?
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
      <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" required />
      <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" required />
      {isVendor && (
        <>
          <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Store Name" required />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
        </>
      )}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
