import CountUp from "react-countup";
import { PropTypes } from "prop-types";

const CountUpComponent = ({ end, label }) => (
    <div className="bg-white w-fit lg:px-5 px-3 lg:py-2 py-2 rounded-2xl border-b-8 border-accent custom-shadow">
        <div className="font-extrabold flex text-black lg:text-4xl text-3xl">
            <CountUp start={0} end={end} delay={0}>
                {({ countUpRef }) => (
                    <div>
                        <span ref={countUpRef} />
                    </div>
                )}
            </CountUp>
            +
        </div>
        <p className="mt-2 font-medium text-gray-700 lg:text-lg">{label}</p>
    </div>
);

CountUpComponent.propTypes = {
    end: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
};

export default CountUpComponent;
