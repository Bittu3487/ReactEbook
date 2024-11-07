// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function DashBoard() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch protected data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/index", { withCredentials: true });
        setMessage(response.data.message);
        setUser(response.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error fetching data.");
      }
    };

    fetchData();
  }, []);
    return (
      <div>
        
        <MainContent />
        <Carousel />
      </div>
    );
  };
  const MainContent = () => {
    return (
      <div className="container">
        <div className="px-4 py-5 my-5 text-center">
          <video
            id="logo"
            width="256"
            height="256"
            preload="none"
            style={{
              background: "transparent url('https://cdn-icons-png.flaticon.com/512/8722/8722462.png') center center / contain no-repeat"
            }}
            autoPlay
            loop
            muted
            playsInline
          />
          <h1 id="center" className="display-5 fw-bold text-body-emphasis">Searching Books</h1>
          <div className="col-lg-6 mx-auto">
            <p id="center-paragraph" className="lead mb-4">Effortlessly search and discover books from a vast collection. Find your next read by title, author, or genre, and dive into a world of knowledge and stories with just a click.</p>
          </div>
        </div>
      </div>
    );
  };
  
  const Carousel = () => {
    return (
      <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://rukminim2.flixcart.com/image/850/1000/khs11u80-0/regionalbooks/a/x/c/wings-of-fire-an-autobiography-of-abdul-kalam-original-imafxphjg7zhf6yy.jpeg?q=90&crop=false" className="d-block w-100 custom-img" alt="..."/>
            </div>
            <div className="carousel-item">
              <img src="https://rukminim2.flixcart.com/image/850/1000/kiew3gw0-0/book/j/n/7/life-of-pi-original-imafy7zptxaxwdsb.jpeg?q=90&crop=false" className="d-block w-100 custom-img" alt="..."/>
            </div>
            <div className="carousel-item">
              <img src="https://m.media-amazon.com/images/I/71vfo4cJCjL._AC_UF1000,1000_QL80_.jpg" className="d-block w-100 custom-img" alt="..."/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  };

export default DashBoard;
