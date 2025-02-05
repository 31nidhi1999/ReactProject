import React from "react";

const CancelAppointmentButton = ({ appointmentId, updateAppointmentStatus }) => {
  const handleCancel = () => {
    updateAppointmentStatus(appointmentId, "Cancelled");
  };

  return (
    <button
      onClick={handleCancel}
      className="text-sm text-neutral-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
    >
      Cancel Appointment
    </button>
  );
};

export default CancelAppointmentButton;
