const StatsOverview = () => {
    return (
        <div className="grid grid-cols-2 gap-6 p-5 animate-slide-up">
            <div className="p-6 bg-white shadow-xl rounded-lg text-center">
                <h3 className="text-2xl font-semibold">Users</h3>
                <p className="text-xl font-medium text-gray-600">1,200</p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded-lg text-center">
                <h3 className="text-2xl font-semibold">Employees</h3>
                <p className="text-xl font-medium text-gray-600">560</p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded-lg text-center">
                <h3 className="text-2xl font-semibold">Active Sessions</h3>
                <p className="text-xl font-medium text-gray-600">32</p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded-lg text-center">
                <h3 className="text-2xl font-semibold">Tasks Completed</h3>
                <p className="text-xl font-medium text-gray-600">87%</p>
            </div>
        </div>
    );
};

export default StatsOverview;
