import { Link, NavLink } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa6";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { MessageContext } from "../pages/Root";
import { IoMdLogOut } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
    const active = "text-primary";
    const inactive = "hover:text-primary";
    const { user, logout, loading } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);

    const navItems = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-properties"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Properties
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/update-profile"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Favorites
                </NavLink>
            </li>
        </>
    );

    const handleLogout = async () => {
        try {
            await logout();
            notifySuccess("Logged out successfully");
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    /**
     * Represents the logged out state of the Navbar component.
     * @type {JSX.Element}
     */
    const loggedOutState = (
        <>
            <div className="gap-2 items-center lg:flex hidden">
                <FaUserAstronaut className="text-primary" />
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Register
                </NavLink>
                <p>/</p>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Login
                </NavLink>
            </div>
        </>
    );

    /**
     * Represents the logged-in state of the Navbar component.
     * @returns {JSX.Element} The JSX element representing the logged-in state.
     */
    const loggedInState = (
        <>
            <div className="flex gap-2 items-center">
                <a className="profileImage">
                    <img
                        className="size-12 rounded-full"
                        src={user?.photoURL}
                        alt=""
                    />
                </a>

                <button
                    onClick={handleLogout}
                    className="lg:py-2 lg:px-3 rounded-full bg-primary text-primary bg-opacity-20 border-primary border-2 hidden lg:flex items-center gap-2"
                >
                    <IoMdLogOut className="size-6" /> Logout
                </button>
            </div>
        </>
    );

    const [dropDown, setDropDown] = useState(false);

    /**
     * Toggles the dropdown state.
     */
    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    useEffect(() => {
        /**
         * Handles the click event outside of the dropdown and hamburger elements.
         * If the click is outside and the dropdown is open, it closes the dropdown.
         * @param {Event} event - The click event object.
         */
        const handleClickOutside = (event) => {
            if (
                dropDown &&
                event.target.closest(".dropdown") === null &&
                event.target.closest(".hamburger") === null
            ) {
                setDropDown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropDown]);

    const loadingSkeleton = (
        <div className="flex gap-2 items-center animate-pulse">
            <div className="profileImage bg-gray-200 rounded-full h-12 w-12"></div>
            <button className="lg:py-2 lg:px-3 rounded-full bg-gray-200 text-gray-200 bg-opacity-20 border-gray-200 border-2 hidden lg:flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                Getting info
            </button>
        </div>
    );

    return (
        <>
            <div className="glass fixed w-full top-0 z-50 custom-shadow">
                <nav className="lg:px-5 px-3 py-2 flex justify-between text-sm items-center lg:text-lg font-extrabold">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            className="lg:size-16 size-14"
                            src="https://i.ibb.co/kcp92rj/logo-modified.png"
                            alt=""
                        />
                        <div>
                            <h1 className="text-primary text-lg lg:text-2xl font-extrabold flex lg:flex-row flex-col lg:gap-2">
                                ParallaX{" "}
                                <span className="text-black">Properties</span>
                            </h1>
                            <p className="text-gray-400 text-xs lg:text-sm font-extrabold">
                                Real Estate
                            </p>
                        </div>
                    </Link>
                    {/* large screen nav items */}
                    <ul className="hidden lg:flex gap-4">{navItems}</ul>{" "}
                    {/* small screen nav items */}
                    <div className="flex items-center gap-3 relative">
                        {loading
                            ? loadingSkeleton
                            : user
                            ? loggedInState
                            : loggedOutState}{" "}
                        {/* right most element */}
                        <TiThMenu
                            onClick={handleDropDown}
                            className="lg:hidden flex size-6 text-primary hamburger"
                        />
                        <div
                            className={`dropdown ${
                                dropDown ? "flex" : "hidden"
                            } absolute top-6 right-1 rounded-lg bg-white py-3 px-5 font-medium border border-primary w-44`}
                        >
                            <ul className="flex flex-col gap-3 font-medium text-lg">
                                {navItems}
                                {user ? (
                                    <li
                                        onClick={handleLogout}
                                        className="flex gap-2 items-center"
                                    >
                                        <IoMdLogOut className="text-primary" />
                                        Logout
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? `${active}`
                                                        : `${inactive}`
                                                }
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/register"
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? `${active}`
                                                        : `${inactive}`
                                                }
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Tooltip
                    anchorSelect=".profileImage"
                    place="top"
                    style={{
                        backgroundColor: "rgba(255, 169, 32, 0.9)",
                        color: "rgb(255, 255, 255)",
                        borderColor: "rgb(255, 169, 32)",
                        borderWidth: "2px",
                        fontWeight: "700",
                    }}
                >
                    {user?.displayName}
                </Tooltip>
            </div>
        </>
    );
};

export default Navbar;
