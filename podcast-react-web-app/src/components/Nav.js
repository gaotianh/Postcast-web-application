import React from 'react';

import {Link} from "react-router-dom";
import {useProfile} from "../contexts/profile-context";

const Nav = () => {
    const {profile} = useProfile()
    const signedIn = profile && Object.keys(profile).length > 0
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link to="/home" className="navbar-brand ps-4">
                <img src = "data:image/png;base64,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"
                     width="100"
                     height="100"/>
            </Link>
            <div className="navbar-nav">
                <Link to="home" className="btn btn-outline-secondary my-2 my-sm-0">
                    Home
                </Link>
                <Link to="podcasts" className="btn btn-outline-secondary my-2 my-sm-0">
                    Search
                </Link>
                {signedIn &&
                <Link to="profile" className="btn btn-outline-secondary my-2 my-sm-0">
                    Profile
                </Link>}
                {signedIn &&
                <Link to="signOut" className="btn btn-outline-secondary my-2 my-sm-0">
                    Sign Out
                </Link>
                }
                {!signedIn &&
                <Link to="signIn" className="btn btn-outline-secondary my-2 my-sm-0">
                    Sign In
                </Link> }
                {!signedIn &&
                <Link to="signUp" className="btn btn-outline-secondary my-2 my-sm-0">
                    Sign Up
                </Link>
                }
            </div>
        </nav>
    )
}
export default Nav;