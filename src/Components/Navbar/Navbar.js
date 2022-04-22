import React, { useEffect, useState, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Redirect } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar(props) {

    const sidebarRef = useRef();
    const hamburger = useRef();
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);


    useEffect(() => {
        sidebarRef.current.addEventListener('touchmove', function (e) {

            e.preventDefault();

        }, false);

        document.addEventListener('click', (event) => {
            setSidebar(false);
        });

        hamburger.current.addEventListener('click', (event) => {
            event.stopPropagation();
            setSidebar(true);
        });

    }, []);


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar fixed-top' style={{ zIndex: 18 }}>
                    <div className="d-flex flex-wrap">
                        <span ref={hamburger} className='menu-bars my-auto' style={{ cursor: "pointer" }}>
                            <FaIcons.FaBars />
                        </span>
                        <h4 className="font-weight-bold text-white ms-3 my-auto">Shoppper's Point</h4>
                    </div>
                    <div className="d-flex flex-wrap">
                        <p className="text-white my-auto mr-3">{localStorage.getItem('rms-admin-token') ? JSON.parse(localStorage.getItem('rms-admin-token')).name : ''}</p>
                        <button style={{ backgroundColor: "#ffffff", color: "#b89a70" }} onClick={() => {
                            localStorage.removeItem('token');
                            window.location.reload()
                            // if (localStorage.getItem('rms-admin-token') == null) {
                            //     props.toggleLogin();
                            // }
                          
                            
                        }}>Logout</button>
                    </div>
                </div>
                <nav ref={sidebarRef} className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: 20 }}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <span className='menu-bars ms-0' style={{ cursor: "pointer" }}>
                                <AiIcons.AiOutlineClose />
                            </span>
                            <h4 className="font-weight-bold text-white ms-2 my-auto" style={{fontSize:22}}>Shoppper's Point</h4>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={`flex-column list-unstyled`}>
                                    <Link className="link nav-text" to={item.path} style={{ backgroundColor: window.location.pathname === item.path ? "#ffffff" : null, color: window.location.pathname === item.path ? "#b89a70" : null }}>
                                        {item.icon}
                                        <span>{item.title_id}</span>
                                    </Link>
                                    {item.children.map((item, index) => {
                                        return (
                                            <div className='col-12 ml-3' key={index}>
                                                <Link className="link nav-sub-text" to={item.path} style={{ backgroundColor: window.location.pathname === item.path ? "#ffffff" : null, color: window.location.pathname === item.path ? "#b89a70" : null }}>
                                                    {item.icon}
                                                    <span>{item.title_id}</span>
                                                </Link>
                                            </div>

                                        );
                                    })}
                                </li>
                            );
                        })}
                        {/* <ProSidebar
                        >
                            <Menu iconShape="square">
                                <MenuItem >
                                    Categories
                                    <Link to="/" onClick={showSidebar} />
                                </MenuItem>
                                <SubMenu title="Users">
                                    <MenuItem>All Users<Link to="/users" onClick={showSidebar} /></MenuItem>
                                    <MenuItem>Add Seller<Link to="/users/addSeller" onClick={showSidebar} /></MenuItem>
                                </SubMenu>
                                <MenuItem >
                                    Items
                                        <Link to="/items" onClick={showSidebar} />
                                </MenuItem>
                            </Menu>
                        </ProSidebar> */}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;