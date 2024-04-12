import { useState } from "react";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

const PasswordInput = ({ name, placeholder, onValueChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isInputFocused, setInputFocused] = useState(false);

    const handleInputChange = (event) => {
        onValueChange(event.target.value);
    };

    return (
        <div className="relative">
            <input
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                name={name}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400"
                required
                onChange={handleInputChange}
                onFocus={() => setInputFocused(true)}
                onBlur={() => {
                    setInputFocused(false);
                    setShowPassword(false);
                }}
            />
            {isInputFocused && (
                <button
                    type="button"
                    className="absolute right-2 top-2"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                    }}
                >
                    {showPassword ? (
                        <TbEyeClosed className="text-black text-2xl hide" />
                    ) : (
                        <TbEye className="text-black text-2xl show" />
                    )}
                </button>
            )}
            <Tooltip
                anchorSelect=".show"
                place="top"
                style={{
                    backgroundColor: "rgba(255, 169, 32, 0.9)",
                    color: "rgb(255, 255, 255)",
                    borderColor: "rgb(255, 169, 32)",
                    borderWidth: "2px",
                    fontWeight: "700",
                }}
            >
                Show Password
            </Tooltip>
            <Tooltip
                anchorSelect=".hide"
                place="top"
                style={{
                    backgroundColor: "rgba(255, 169, 32, 0.9)",
                    color: "rgb(255, 255, 255)",
                    borderColor: "rgb(255, 169, 32)",
                    borderWidth: "2px",
                    fontWeight: "700",
                }}
            >
                Hide Password
            </Tooltip>
        </div>
    );
};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

export default PasswordInput;
