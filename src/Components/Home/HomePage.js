import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.js";

import { Redirect, Route, Switch } from 'react-router-dom';
import CategoryPage from "../Category/Category";
import Home from './Home';
import SpecificCategory from "../Category/SpecificCategory.js";
import Order from "../order/order.js";

function HomePage(props) {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         setIsLoggedIn(true);
    //     }
    // }, [])

    // if (isLoggedIn === false) {
    //     return (
    //         <Redirect to="/login" />
    //     );
    // }

    function NotFoundPage() {
        return (
            <div className="d-flex flex-wrap justify-content-center align-items-center" style={{ height: "90vh", width: "100%", backgroundColor: "#F7F9FB" }}>
                <img src="https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif" style={{ height: "100%", width: "auto" }} alt='...' />
            </div>
        );
    }
    return (
        <>
            <Navbar />
            <div style={{ marginTop: 78 }}>
                <Switch>
                    <Route exact path="/" component={CategoryPage} />
                    <Route exact path="/Category" component={CategoryPage} />
                    <Route exact path="/category/:name/:id" component={({ match }) => <SpecificCategory id={match.params.id} name={match.params.name} />} />
                   <Route exact path="/order" component={Order} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>

            </div>
        </>

    );
}
export default HomePage;