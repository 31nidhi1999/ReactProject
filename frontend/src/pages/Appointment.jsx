import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addAppointment, getAllAvailableTimeSlot, getDoctorById } from '../service/health';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = () => {
  const { docID } = useParams();
  const navigate = useNavigate();
  console.log("selected id" + docID)
  const [isOpen, setIsModalOpen] = useState(false);
  const [doctInfo, setDoctInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotTime, setSlotTime] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await getDoctorById(docID);
        setDoctInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAvailableSlots = async () => {
      try {
        const response = await getAllAvailableTimeSlot(docID, new Date().toISOString().split('T')[0]);
        const currentTime = new Date().toTimeString().split(' ')[0];
        const futureSlots = response.data.filter(slot => slot > currentTime);
        setDocSlots(futureSlots);
        console.log(futureSlots);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctorInfo();
    fetchAvailableSlots();
  }, [docID]);

  const handleUpdate = (item) => {
    setSlotTime(item);
    setPatientDetails({
      appointmentDate: new Date().toISOString().split('T')[0],
      doctor_id: docID,
      hospital_id: sessionStorage.getItem('hospId'),
      timeSlot: item,
      patient_id: sessionStorage.getItem('pateintId'),
    });
    setIsModalOpen(true);
  };

  const bookAppointment = async () => {
    try {
      const response = await addAppointment(patientDetails, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      toast("Booking Confirmed");
      navigate("/my-appointments")
    } catch (error) {
      console.error("Error while sending data:", error);
      toast.error("Booking failed");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tConvert = (time) => {
    time = time.toString().match(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
  };

  return (
    <div>
      {doctInfo ? (
        <div>
          <div className='flex flex-col sm:flex-row gap-4 justify-self place-self-center'>
            <div>
              <img className='bg-primary w-full sm:max-w-72' src={assets.doctor_img} alt="" />
            </div>
            <div className='w-9/12 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
              <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                {doctInfo.name}
                <img className='w-5' src={assets.verified_icon} alt="Verified" />
              </p>
              <div className='items-center gap-2 text-sm text-gray-400'>
                <p className='items-center text-sm font-medium text-gray-900'>Specialization {doctInfo.specialization}</p>
                <p className='items-center text-sm font-medium text-gray-900'>Doctor's Email ID: {doctInfo.email}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full'>Year of Experience {doctInfo.experience} years</button>
              </div>
            </div>
          </div>

          <div className='sm:pl-72 mt-4 font-medium text-gray-700'>
            <p>Booking Slot</p>
            <div className='flex gap-2 items-center w-full overflow-x-scroll mt-4'>
              {docSlots.length > 0 ? (
                docSlots.map((item) => {
                  if (!sessionStorage.getItem('token')) {
                    //alert("Please Login to book an appointment");
                    navigate(`/login`);
                  }
                  return (
                    <div 
                      className='flex flex-col px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200'
                      key={item}
                      onClick={() => handleUpdate(item)}
                    >
                      {tConvert(item)}
                    </div>
                  );
                })
              ) : (
                <p>No available slots found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Do you want to continue?</p>
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => { bookAppointment(); handleCloseModal() }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;