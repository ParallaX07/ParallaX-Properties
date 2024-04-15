import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { MessageContext } from "../../pages/Root";
import useDocumentTitle from "../../utils/dynamicTitle";

const UpdateProfile = () => {
    useDocumentTitle("Update Profile | ParallaX Properties");
    const { user, updateUserProfile } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const currentName = user.displayName;
        const currentPhoto = user.photoURL;

        const name = formData.get("name");
        const url = formData.get("url");

        if (!name && !url) {
            notifyError("Please fill at least one field");
            return;
        }

        if (name && name === currentName) {
            notifyError(
                "Name is the same as the current one, please enter a different name"
            );
            return;
        }

        if (url && url === currentPhoto) {
            notifyError(
                "Photo URL is the same as the current one, please enter a different URL"
            );
            return;
        }

        const updateAndNavigate = (name, url) => {
            updateUserProfile(user, name, url)
                .then(() => {
                    notifySuccess("Profile updated successfully");
                    window.location.reload();
                })
                .catch(() => {
                    notifyError("An error occurred. Please try again later.");
                });
        };

        if (name && url) {
            updateAndNavigate(name, url);
        }

        if (name && !url) {
            updateAndNavigate(name, currentPhoto);
        }

        if (!name && url) {
            updateAndNavigate(currentName, url);
        }
    };

    return (
        <div className="lg:h-[calc(100dvh-100px)] w-full flex items-center justify-center mt-20">
            <div className="glass animate__animated animate__fadeIn">
                <section>
                    <div className="flex lg:flex-row-reverse h-fit gap-4 flex-col bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                        <div className=" flex flex-col m-2">
                            <div className="lg:w-72 mb-6 object-contain">
                                <img
                                    className="rounded-xl "
                                    src={user?.photoURL}
                                    alt=""
                                />
                            </div>
                            <p className="text-sm font-extrabold">
                                <span className="text-gray-400">Name:</span> {" "}
                                {user?.displayName}
                            </p>
                            <p className="text-sm font-extrabold">
                                <span className="text-gray-400">Email:</span> {" "}
                                {user?.email}
                            </p>
                        </div>
                        <div className="xl:mx-auto xl:w-full custom-shadow p-4 xl:max-w-sm 2xl:max-w-md rounded-lg border border-gray-200">
                            <div className="mb-2 flex justify-center"></div>
                            <h2 className="text-center text-2xl font-bold leading-tight text-black">
                                Update your profile
                            </h2>

                            <form className="mt-2 rounded-lg" onSubmit={handleUpdate}>
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-base font-medium text-gray-900">
                                            Update Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                placeholder="New Name"
                                                type="text"
                                                name="name"
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-base font-medium text-gray-900">
                                                Update Photo URL
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                placeholder="New Photo URL"
                                                type="text"
                                                name="url"
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                            type="submit"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UpdateProfile;
