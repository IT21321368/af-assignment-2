import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nasalogo from '../assets/nasa-logo.png';
import sky from '../assets/sky.jpg'; // Import the background image
import axios from 'axios';

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
});
// Function to handle input changes
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
// Function to handle form submission
const handleSubmit = (e) => {
e.preventDefault(); // Prevent the form from submitting normally
// Make a POST request to the backend
axios.post('https://chamaththa.infinitoapparel.ca/api/users/register', formData)
   .then(response => {
       console.log('registration successful:', response?.data);
       // You might want to save the token in localStorage or context for further requests
       localStorage.setItem('token', response.data.token);
       navigate('/login'); 
       
   })
   .catch(error => {
       console.error('registration error:', error);
       // Handle errors here, such as showing an alert or updating the state
   });
};
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${sky})` }}>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-60" /> {/* Overlay to make the text more readable */}
      <div className="sm:w-full sm:max-w-md z-10"> {/* z-10 to ensure the form appears above the overlay */}
        <img className="mx-auto h-10 w-auto" src={nasalogo} alt="NASA" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 font-mono tracking-tight capitalize text-gray-200">
          Create your account
        </h2>
        <div className="mt-10 bg-white bg-opacity-40 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 font-mono text-black">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 font-mono text-black">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 font-mono text-black">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 font-mono text-black">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-mono font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-black "
              >
                Register
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  )
  }