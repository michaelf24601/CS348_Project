import React from "react";
import { NavLink } from "react-router-dom";

import "../Styles/nav.css"


const MainNav = () => {

    return (
        <div className="mainNav-container">
            <div className="mainNav-titleContainer">
                <h1 className="mainNav-header">
                    My recipe app!
                </h1>
            </div>
            <nav className="mainNav-list">
                <NavLink 
                    to="/home"
                    className={({ isActive }) =>
                        isActive ? "mainNav-link active-link": "mainNav-link"
                    }
                >
                    Home
                </NavLink>
                <NavLink 
                    to="/ingredients"
                    className={({ isActive }) =>
                        isActive ? "mainNav-link active-link": "mainNav-link"
                    }
                >
                    Ingredients
                </NavLink>
                <NavLink  
                    to="/recipes"
                    className={({ isActive }) =>
                            isActive ? "mainNav-link active-link": "mainNav-link"
                        }
                    >
                        Recipies
                    </NavLink>
            </nav>
        </div>
    );
}

export default MainNav;
