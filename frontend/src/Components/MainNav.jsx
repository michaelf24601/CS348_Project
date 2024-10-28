import React from "react";

const MainNav = () => {

    return (
        <div className="mainNav-container">
            <div className="mainNav-titleContainer">
                <h1 className="mainNav-header">
                    My recipe app!
                </h1>
            </div>
            <ul className="mainNav-list">
                <li className="mainNav-listItem">
                    <a className="mainNav-link">Ingredients</a>
                </li>
                <li className="mainNav-listItem">
                    <a className="mainNav-link">Recipies</a>
                </li>
            </ul>
        </div>
    );
}

export default MainNav;
