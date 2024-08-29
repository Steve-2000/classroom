import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();

 

  return (
 <main></main>
  );
};

export default LogoutButton;
