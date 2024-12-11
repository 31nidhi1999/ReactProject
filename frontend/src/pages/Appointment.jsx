import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllAvailableTimeSlot, getDoctorById } from '../service/health';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docID } = useParams();
  const [doctInfo, setDoctInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotTime, setSlotTime] = useState('');

  function tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { 
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;     }
    return time.join (''); 
  }
  

  const getDoctorInfo = async () => {
    try {
      console.log(`SELECTED DOCTOR ${docID}`);
      const response = await getDoctorById(docID);
      setDoctInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvailableSlots = async () => {
    try {
      const response = await getAllAvailableTimeSlot(docID, '2024-12-09');
      setDocSlots(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, [docID]);

  useEffect(() => {
    getAvailableSlots();
  }, [docID]);



  return (
    <div>
      {doctInfo ? (
          <div>
             <div className='flex flex-col sm:flex-row gap-4 justify-self place-self-center '>
  
             <div>
                  <img className='bg-primary w-full sm:max-w-72' src={assets.doctor_img} alt="" />
                </div>

                <div className=' w-9/12 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                  <p className=' flex items-center gap-2 text-2xl font-medium text-gray-900'>
                    {doctInfo.name}
                    <img className='w-5' src={assets.verified_icon} alt="Verified" />
                  </p>
                  <div className='items-center gap-2 text-sm text-gray-400'>
                    <p className='items-center text-sm font-medium text-gray-900'>Specialization {doctInfo.specialization}</p>
                    <p className='items-center text-sm font-medium text-gray-900'>Doctor's Email ID :: {doctInfo.email}</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>Year of Experience {doctInfo.experience} years</button>
                  </div>
                </div>

               
              </div>
            
              <div className='sm:pl-72 mt-4 font-medium text-gray-700'>
                <p className=''>Booking Slot</p>
                <div className='flex gap-2 items-center w-full overflow-x-scroll mt-4'>
                  {docSlots.length > 0 ? (
                    docSlots.map((item) => (
                      <div
                        onClick={() => setSlotTime(item)}
                        className={`text-sm font-light flex-shrink-0 px-5 py-2 min-w-16 rounded-full cursor-pointer text-gray-400 border border-gray-300 ${slotTime === item ? 'bg-primary text-white' : ''}`}
                      >
                       {/* {
                          slotTime ? (
                            console.log(slotTime)
                          ) : (
                            console.log("No slot selected")
                          )
                        } */}

                        {tConvert(item)}

                        
                      </div>
                    ))
                   
                  ) : (
                    <p>No available slots found.</p>
                  )}
                  
                </div>
                <div >
                      <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full m-6'>Book an Appointment</button>
                </div>
              </div>
          </div>   
        ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Appointment;
