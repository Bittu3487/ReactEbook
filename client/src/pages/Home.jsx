import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron text-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/15683/15683752.png" 
          width="200" 
          height="200" 
          alt="Book Finder Logo" 
          className="img-fluid"
        />
        <h1 className="display-4 mt-4">Welcome to eBook App</h1>
        <p className="lead">
          Discover and save your favorite books effortlessly. Log in or register to get started.
        </p>
        <div className="mt-4">
          <Link to="/register">
            <button className="btn btn-primary btn-lg mx-2">Register</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary btn-lg mx-2">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
