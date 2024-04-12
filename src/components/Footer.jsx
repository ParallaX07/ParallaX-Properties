import { IoCallOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import { TbPhonePlus } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HashLink } from "react-router-hash-link";

// Data for the office addresses, contact information, and company links
const officeAddresses = [
    "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    "3891 Ranchview Dr. Richardson, California 62639",
    "3517 W. Gray St. Utica, Pennsylvania 57867",
];

const Footer = () => {
    /**
     * Scrolls to the specified element with an offset.
     * @param {Element} el - The element to scroll to.
     * @param {number} offset - The offset value to adjust the scroll position.
     */
    const scrollWithOffset = (el, offset) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = offset; 
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    }

    return (
        <div className="bg-[#1C1C1E] py-5 px-5 lg:px-0 flex flex-col items-center justify-center">
            <div className="flex lg:flex-row flex-col gap-12 py-8 lg:py-20 lg:mx-48">
                <div className="p-5 bg-accent relative rounded-xl flex lg:flex-row gap-3 flex-col items-start lg:items-center lg:max-w-[540px]">
                    <img
                        src="https://i.ibb.co/6mDFbCZ/footer-icon-1.png"
                        alt=""
                    />
                    <div>
                        <h1 className="text-black font-bold text-2xl">
                            Looking for a house?
                        </h1>
                        <p className="text-black text-sm pb-2">
                            Tell us your needs, we will give you thousands of
                            suggestions for the dream home.
                        </p>
                    </div>
                    <button className="absolute bg-primary px-5 py-4 rounded-lg -bottom-8 left-14 lg:left-44 font-bold flex items-center text-white">
                        <IoCallOutline className="size-6" />
                        <p className="pl-2 border-l-2 ml-2">Contact Seller</p>
                    </button>
                </div>
                <div className="p-5 bg-accent relative rounded-xl flex lg:flex-row gap-3 flex-col items-start lg:items-center lg:max-w-[540px]">
                    <img
                        src="https://i.ibb.co/Ks7Kgf6/footer-icon-2.png"
                        alt=""
                    />
                    <div>
                        <h1 className="text-black font-bold text-2xl">
                            Wanna sell your house?
                        </h1>
                        <p className="text-black text-sm pb-2">
                            We will connect you to thousands of people who need
                            to buy a home..
                        </p>
                        <button className="absolute bg-primary px-5 py-4 rounded-lg -bottom-8 left-14 lg:left-44 font-bold flex items-center text-white">
                            <BsHouse className="size-6" />
                            <p className="pl-2 border-l-2 ml-2">
                                Sell Property
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-10 grid-cols-1 mt-8 lg:mt-20 lg:mx-80 justify-center text-white font-medium">
                <div className="flex flex-col items-start">
                    <h2 className="font-bold text-2xl mb-5">Office address</h2>
                    {officeAddresses.map((address, index) => (
                        <p key={index} className="text-gray-400 mb-2">
                            {address}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="font-bold text-2xl mb-5">Contact Seller</h2>
                    <div className="flex items-center justify-around">
                        <img
                            className="h-16 rounded-full"
                            src="https://i.ibb.co/94PYPP5/20230914-215358.jpg"
                            alt=""
                        />
                        <div>
                            <p className="text-gray-400 mb-2">
                                Saalim Saadman Araf
                            </p>
                            <p>(880) 1712-345678</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-around">
                        <TbPhonePlus className="text-gray-400 text-5xl" />
                        <div>
                            <p className="text-gray-400 mb-2">Hotline:</p>
                            <p>(880) 1712-345678</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-around">
                        <HiOutlineMailOpen className="text-gray-400 text-5xl" />
                        <div>
                            <p className="text-gray-400 mb-2">Email</p>
                            <p>example@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-2xl mb-5">Our Properties</h2>
                    <div className="flex flex-col gap-3 text-gray-400">
                        <div className="flex items-center gap-3">
                            <IoIosArrowForward className="text-2xl text-primary" />
                            <Link to="/" className="hover:text-primary">
                                Home
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <IoIosArrowForward className="text-2xl text-primary" />
                            <Link
                                to="/all-properties"
                                className="hover:text-primary"
                            >
                                All Properties
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <IoIosArrowForward className="text-2xl text-primary" />
                            <HashLink
                                smooth
                                to="/#rent"
                                scroll={(el) => scrollWithOffset(el, -100)}
                                className="hover:text-primary"
                            >
                                Rental Properties
                            </HashLink>
                        </div>
                        <div className="flex items-center gap-3">
                            <IoIosArrowForward className="text-2xl text-primary" />
                            <HashLink
                                smooth
                                scroll={(el) => scrollWithOffset(el, -100)}
                                to="/#sale"
                                className="hover:text-primary"
                            >
                                On Sale Properties
                            </HashLink>
                        </div>
                        <div className="flex items-center gap-3">
                            <IoIosArrowForward className="text-2xl text-primary" />
                            <HashLink
                                smooth
                                scroll={(el) => scrollWithOffset(el, -300)}
                                to="/#featured-properties"
                                className="hover:text-primary"
                            >
                                Featured Properties
                            </HashLink>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-5 text-gray-400 w-full" />
            <div className="flex items-center lg:gap-80 gap-5 lg:flex-row flex-col">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="lg:size-16 size-14"
                        src="https://i.ibb.co/kcp92rj/logo-modified.png"
                        alt=""
                    />
                    <div>
                        <h1 className="text-primary text-lg lg:text-2xl font-extrabold flex gap-2">
                            ParallaX{" "}
                            <span className="text-white">Properties</span>
                        </h1>
                        <p className="text-gray-400 text-xs lg:text-sm font-extrabold">
                            Real Estate
                        </p>
                    </div>
                </Link>
                <div className="flex gap-3">
                    <a href="https://www.facebook.com/saal07/">
                        <p className="p-3 rounded-full border-2 border-gray-400 hover:bg-primary">
                            <FaFacebookF className="text-2xl text-white" />
                        </p>
                    </a>
                    <a href="https://www.linkedin.com/in/saalimaraf/">
                        <p className="p-3 rounded-full border-2 border-gray-400 hover:bg-primary">
                            <FaLinkedinIn className="text-2xl text-white" />
                        </p>
                    </a>
                    <a href="https://www.instagram.com/ss_araf/">
                        <p className="p-3 rounded-full border-2 border-gray-400 hover:bg-primary">
                            <FaInstagram className="text-2xl text-white" />
                        </p>
                    </a>
                    <a href="https://twitter.com/ArafSaalim">
                        <p className="p-3 rounded-full border-2 border-gray-400 hover:bg-primary">
                            <FaXTwitter className="text-2xl text-white" />
                        </p>
                    </a>
                </div>
            </div>
            <hr className="my-5 text-gray-400 w-full" />
            <p className="text-gray-400 text-center">
                © 2021 ParallaX Properties. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
