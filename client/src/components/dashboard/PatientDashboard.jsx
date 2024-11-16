import React from "react";

const PatientDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, Patient!</h1>
      <p className="text-gray-700">Here’s your health summary and updates.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-medium text-lg mb-2">Upcoming Appointments</h3>
          <p className="text-gray-600">You have no appointments scheduled.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-medium text-lg mb-2">Prescriptions</h3>
          <p className="text-gray-600">No prescriptions found.</p>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
