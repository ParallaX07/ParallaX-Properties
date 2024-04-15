import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { MessageContext } from "../../pages/Root";
import useDocumentTitle from "../../utils/dynamicTitle";
import PasswordInput from "../FunctionalComponents/PasswordInput";
import Loader from "../FunctionalComponents/Loader";

const Register = () => {
    useDocumentTitle("Registration | ParallaX Properties");
    const { createUser, logout, user, updateUserProfile, loading, setLoading } =
        useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (loading) {
        return <Loader />;
    }

    /**
     * Handles the registration process.
     *
     * @param {Event} e - The event object.
     * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        let url = formData.get("url");
        const passwordValue = password;
        const confirmationValue = confirmation;

        //password validation
        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(passwordValue)) {
            notifyError(
                "Password must contain at least 6 characters, one uppercase and one lowercase letter"
            );
            return;
        }

        // Check if the password and confirmation match
        if (passwordValue !== confirmationValue) {
            notifyError("Passwords do not match");
            return;
        }

        if (url.length < 3) {
            url = "https://i.ibb.co/hYbbGyR/6596121-modified.png";
        }

        try {
            await createUser(email, passwordValue);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                notifyError("Email already in use");
                return;
            } else {
                notifyError("An error occurred. Please try again later.");
                return;
            }
        }

        await updateUserProfile(user, name, url)
            .then(() => {
                logout();
                setLoading(false);
            })
            .catch((error) => {
                notifyError(error.code);
                return;
            });

        if (!loading) {
            notifySuccess("Account created successfully");
            // Log out the user
            navigate("/login");
        }
    };

    return (
        <div className="lg:h-[calc(100dvh-100px)] lg:w-full flex items-center justify-center mt-20">
            <div className="glass animate__animated animate__fadeIn xl:mx-auto xl:w-full custom-shadow p-4 xl:max-w-sm 2xl:max-w-md rounded-lg border border-gray-200">
                <div className="mb-2 flex justify-center"></div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Regsiter for an account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-extrabold">
                        Login
                    </Link>
                </p>
                <form className="mt-2" onSubmit={(e) => handleRegister(e)}>
                    <div className="space-y-5">
                        <div>
                            <label className="text-base font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Full Name"
                                    type="text"
                                    name="name"
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>
                        </div>
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
                            <label className="text-base font-medium text-gray-900">
                                Photo Url
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Photo URL"
                                    type="text"
                                    name="url"
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex lg:flex-row flex-col gap-5">
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
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium text-gray-900">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2 relative">
                                    <PasswordInput
                                        name="confirmation"
                                        placeholder="Confirm Password"
                                        onValueChange={(value) =>
                                            setConfirmation(value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
