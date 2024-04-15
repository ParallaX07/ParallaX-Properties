import PropTypes from "prop-types";

/**
 * Renders a property detail component.
 *
 * @param {Object} props - The component props.
 * @param {React.ElementType} props.IconComponent - The icon component to display.
 * @param {string} props.label - The label for the property detail.
 * @param {string} props.value - The value for the property detail.
 * @returns {React.ReactNode} The rendered property detail component.
 */
const PropertyDetail = ({ IconComponent, label, value }) => (
    <p className="flex items-center text-sm">
        <IconComponent className="lg:text-lg mr-1" />
        {label}:<span className="font-bold ml-2">{value}</span>
    </p>
);

PropertyDetail.propTypes = {
    IconComponent: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default PropertyDetail;
