import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../pages/Root";
import useDocumentTitle from "../../utils/dynamicTitle";
import PasswordInput from "../FunctionalComponents/PasswordInput";
import Loader from "./../FunctionalComponents/Loader";

const Login = () => {
    useDocumentTitle("Login | ParallaX Properties");
    const { user, login, googleLogin, githubLogin, loading } =
        useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (loading) {
        return <Loader />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const passwordValue = password;

        try {
            await login(email, passwordValue);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                notifyError("User not found");
                return;
            } else if (error.code === "auth/wrong-password") {
                notifyError("Wrong password");
                return;
            } else {
                notifyError("Invalid email or password");
                return;
            }
        }

        if (!loading) {
            notifySuccess("Logged in successfully");
            navigate(location?.state ? location.state : "/");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin().then(() => {
                if (!loading) {
                    notifySuccess("Logged in successfully");
                    navigate(location?.state ? location.state : "/");
                }
            });
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    const handleGithubLogin = async () => {
        try {
            await githubLogin().then(() => {
                if (!loading) {
                    notifySuccess("Logged in successfully");
                    navigate(location?.state ? location.state : "/");
                }
            });
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="lg:h-[calc(100dvh-100px)] w-full flex items-center justify-center my-20">
            
                <div className="glass animate__animated animate__fadeIn xl:mx-auto xl:w-full custom-shadow p-4 xl:max-w-sm 2xl:max-w-md rounded-lg border border-gray-200">
                    <div className="mb-2 flex justify-center"></div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-extrabold"
                        >
                            Register with email
                        </Link>
                    </p>
                    <form className="mt-2" onSubmit={(e) => handleLogin(e)}>
                        <div className="space-y-5">
                            <div>
                                <label className="text-base font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <PasswordInput
                                        name="password"
                                        placeholder="Password"
                                        onValueChange={(value) =>
                                            setPassword(value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-rose-500"
                                >
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                        <button
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            type="button"
                            onClick={handleGithubLogin}
                        >
                            <span className="mr-2 inline-block">
                                <FaGithub className="h-6 w-6 text-gray-700" />
                            </span>
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Login;
