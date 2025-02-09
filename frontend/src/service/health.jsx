
import axios from "axios";
import { APPOINTMENT_URL, BASE_URL } from "../constants/ApiConstants";

//User sigin
export function userSignin(login){
    return axios.post(`${BASE_URL}users/signin`,login);
}

//Hospital APIS
export function getAllHospitals(){
    const token = sessionStorage.getItem("token"); 
    return axios.get(`${BASE_URL}hospital`,
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
    
}

export function getAllActiveHospitals(){
    return axios.get(`${BASE_URL}hospital/active`);
    
}

export function addHospital(hospital){
    const token = sessionStorage.getItem("token"); 
    return axios.post(`${BASE_URL}hospital`,hospital,
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
}

export function getDoctorByHospitalId(hospId,doctorId){
    return axios.get(`${BASE_URL}hospital/${hospId}/doctor/${doctorId}`);
}


//Patient APIS
export function getAllPatient(){
    return axios.get(`${BASE_URL}patient`);
}

export function getAllDoctor(){
    return axios.get(`${BASE_URL}doctor`);
}

export function addPatient(patient){
    return axios.post(`${BASE_URL}patient`,patient);
}

export function getPatientById(patientId){
    return axios.get(`${APPOINTMENT_URL}/patient/${patientId}`);
}

//Doctor API
export function addDoctor(doctor){
    return axios.post(`${BASE_URL}doctor`,doctor);
}

export function getDoctorById(doctorId){
    return axios.get(`${BASE_URL}doctor/${doctorId}`);
}

export function getAllDoctorByHospitalId(hospId){
    return axios.get(`${BASE_URL}doctor/hosp/${hospId}`);
}

export function updateDoctor(doctorId,doctor){
    return axios.put(`${BASE_URL}doctor/${doctorId}`,doctor);
}

//TimeSlot API
export function getAllAvailableTimeSlot(doctorId,date){
    return axios.get(`${BASE_URL}time_slots/available/doctor/${doctorId}/date/${date}`);
}

//Appointment API
export function getAllAppointment(){
    return axios.get(`${APPOINTMENT_URL}`);
}

export function addAppointment(appointment){
    return axios.post(`${APPOINTMENT_URL}`,appointment);
}

export function getAppointmentById(id){
    return axios.get(`${APPOINTMENT_URL}/${id}`);
}

export function getAllAppointmentByHospitalId(hospId){
    return axios.get(`${APPOINTMENT_URL}/hosp/${hospId}`);
}

//doctor appointment
export function getAllAppointmentByDoctorId(doctorId){
    return axios.get(`${APPOINTMENT_URL}/doctor/${doctorId}`);
}

//appintment complete
export function patchCompletedAppointmentById(appointId){
    return axios.patch(`${APPOINTMENT_URL}/complete/${appointId}`);
}


//appintment cancel
export function patchCanceledAppointmentById(appointId){
    return axios.patch(`${APPOINTMENT_URL}/cancle/${appointId}`);
}



export function addDoctorToHospital(hospId, doctorId) {
    const token = sessionStorage.getItem("token");  // Retrieve stored token
    return axios.post(
        `${BASE_URL}hospital/${hospId}/doctor/${doctorId}`,
        {}, // Empty body
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
}

export function removeDoctorFromHospital(hospId, doctorId) {
    const token = sessionStorage.getItem("token");  // Retrieve stored token
    return axios.delete(
        `${BASE_URL}hospital/${hospId}/doctor/${doctorId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
}


export function getHospitalsByDoctorId(doctorId) {
    return axios.get(`${BASE_URL}doctor/${doctorId}/hospital`);
}

export function getHospitalsWhereDoctorIsNotWorkingByDoctorId(doctId) {
    const token = sessionStorage.getItem("token");  // Retrieve stored token
    return axios.get(`${BASE_URL}hospital/${doctId}`,

        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
    
}

export function activateHospital(hospitalId) {
    const token = sessionStorage.getItem("token");  // Retrieve stored token
    return axios.patch(`${BASE_URL}hospital/activate/${hospitalId}`,
        {}, // Empty body
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
}

export function deactivateHospital(hospitalId) {  
    const token = sessionStorage.getItem("token");  // Retrieve stored token
    return axios.patch(`${BASE_URL}hospital/inActivate/${hospitalId}`,
        {}, // Empty body
        {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach JWT token
                "Content-Type": "application/json"
            }
        }
    );
}

export function updatePatient(patientId, patient) {
    const token = sessionStorage.getItem("token");
    return axios.put(`${BASE_URL}patient/${patientId}`, patient,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
}

export function getPatientDetail(patientId, patient) {
    //const token = sessionStorage.getItem("token");
    return axios.get(`${BASE_URL}patient/${patientId}`, patient,{
        // headers: {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "application/json"
        // }
    });
}

export function sendOtp(otpbody) {
    return axios.post(`${BASE_URL}users/sendotp`, otpbody);
}

export function verifyOtp(otpbody) {
    return axios.post(`${BASE_URL}users/verifyotp`, otpbody);
}



export function VerifyEmail(email) {
    console.log("Email being sent:", email); // Check the value

    if (typeof email !== "string") {
        throw new Error("Email must be a string! Instead got: " + typeof email);
    }

    return axios.get(`${BASE_URL}users/verifyemail/${encodeURIComponent(email)}`);
}

