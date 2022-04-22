
import React, { useEffect, useState } from "react";
import './Header.css';
import logo from '../images/logo.png';
import logo1 from '../images/logo1.png';


//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart, FaShopify } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";



//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

function SideBar(props) {
    // //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false);

    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <div>
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div>
                            {/* small and big change using menucollapse state */}
                            {menuCollapse ? <img src={logo1} className="my-2 ms-1" style={{ height: 55, width: 75 }} alt="..." /> : <img src={logo} className="my-2 ms-2" style={{ height: 55, width: 195 }} alt="..." />}
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* {menuCollapse ? (
                                <BsFillArrowRightSquareFill />
                                ) : (
                                <BsFillArrowLeftSquareFill/>
                            )} */}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}>
                                Home
                            </MenuItem>
                            <MenuItem icon={<FaList />}>Category</MenuItem>
                            <MenuItem icon={<FaShopify size={20} />}>Orders</MenuItem>
                            {/* <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
                             <MenuItem icon={<BiCog />}>Settings</MenuItem> */}
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem onClick={() => { localStorage.removeItem('token'); props.onLoggedOut(); }} style={{ cursor: "pointer" }} icon={<FiLogOut />}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>

                </ProSidebar>

            </div>
        </div>
    );
}
export default SideBar;