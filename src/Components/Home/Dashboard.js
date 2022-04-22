
import React, { useEffect, useState } from "react";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import UsersTable from './UsersTable';
import { baseURL } from '../../Shared/BaseURL';
import SideBar from '../NavigationBar/SideBar';


const Dashboard = (props) => {
  
   

    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch(baseURL + 'currentUsers.php', {method: "POST"})
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
        console.log(users);
      })
      .catch(e => console.log(e.message));
    },[]);

    

    //create a custom function that will change menucollapse state from false to true and true to false
 


  return (
    <>
      <SideBar onLoggedOut={props.onLoggedOut}/>
      <div className="ms-5 ps-5" >
       
          <UsersTable users={users}/>
        
      
      </div>
      
    </>
  );
};

export default Dashboard;