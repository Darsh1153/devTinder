import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
import { removeUser } from './utils/userSlice';
import axios from "axios";

const NavBar = () => {

    const user = useSelector(store => store.user);
    console.log(user?.firstName);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            console.log("logout");
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <div className="navbar bg-base-500 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
                </div>
                <div className="flex gap-2 mx-4">
                    {user && <p className='flex items-center'>Welcome, {user?.firstName}</p>}
                    {user && <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li><a onClick={logout}>Logout</a></li>
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default NavBar
