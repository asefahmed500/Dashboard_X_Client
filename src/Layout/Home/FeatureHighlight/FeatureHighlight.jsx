/* eslint-disable react/prop-types */
// FeatureHighlight.jsx

const FeatureHighlight = ({ features }) => {
    return (
        <div className=" py-8 mt-11">
            <h2 className="text-3xl font-bold text-center mb-6">Key Features</h2>
            <div className="flex justify-center flex-wrap gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 shadow-lg rounded-lg w-80 transform transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        {/* <img src={feature.icon} alt={feature.title} className="h-16 mx-auto mb-4" /> */}
                        <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHighlight;
