import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Navbar2 from './Navbar2';
import Home from './Home';
import About from './About';
import Portfolio from './Portfolio';
import Blog from './Blog';
import Contact from './Contact';
import Login from './Login';
import Create from './Create'
import NavbarWrapper from './navbarWrapper'
// import firebase from 'firebase/app';
// import 'firebase/auth';


// Your web app's Firebase configuration


function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
 
  
  return (
    <div className="App">
      <header>
      <NavbarWrapper />
      </header>
      <main>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* Example of a private route */}
          
          
            {/* <Route path="/create-account" element={<Create />} /> */}
            <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Create />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />

         
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
