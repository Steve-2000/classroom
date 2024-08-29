import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Navbar2 from './Navbar2';
import Home from './Home';
import About from './About';
import Portfolio from './Portfolio';
import Blog from './Blog';
import Contact from './Contact';
import { signOut } from 'firebase/auth';
import Login from './Login';
import Create from './Create'
import NavbarWrapper from './navbarWrapper'
import Notes from './Notes';
import LogoutButton from './LogoutButton';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import PhoneAuth from './PhoneAuth';

import axios from 'axios';
import Ent from './components/Ent';
import Ict from './components/Ict';
import Bst from './components/Bst';
import Admin from './components/Admin';
import { useNavigate } from 'react-router-dom';




import Pastpapers from './Pastpapers';
import Marks from './Marks';
import Resources from './Resources';
import Logoutbutton from './LogoutButton';
// import Admin from './components/Admin';


// Your web app's Firebase configuration
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  let id1="ent"
const[id2,setId2]=useState(["ent","bst","ict"])
  let id3="ict"


  
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

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);





  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/login'); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
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
        <Route path='/admin'element={<Admin/>} />
        <Route path="/about" element={<About />} />

        <Route path="/pastpapers" element={<Pastpapers/>} />
        
        <Route path="/resources" element={<Notes/>} />
        <Route path="/logout" element={<LogoutButton/>} />


        {/* from marks to choose dep */}
        <Route path="/marks" >
        <Route index element={<Marks   />} /> 
        <Route path=":id" element={<Ent  />} />
        <Route path=":id" element={<Bst   />} />
        <Route path=":id" element={<Ict/>} />
        </Route>
        

       

        


         
          
        </Routes>
      </main>
      <div><LogoutButton handleLogout={handleLogout}/>
      <Navbar2 handleLogout={handleLogout}/>
      
      </div>
    </div>
  );
}

export default App;
