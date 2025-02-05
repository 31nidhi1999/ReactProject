import React from "react";

const CompleteAppointmentButton = ({ appointmentId, updateAppointmentStatus }) => {
  const handleComplete = () => {
    updateAppointmentStatus(appointmentId, "Completed");
  };

  return (
    <button
      onClick={handleComplete}
      className="text-sm text-neutral-500 text-center sm:min-w-48 py-2 border hover:bg-green-600 hover:text-white transition-all duration-300"
    >
      Complete Appointment
    </button>
  );
};

export default CompleteAppointmentButton;
