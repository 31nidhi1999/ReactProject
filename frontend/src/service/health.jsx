import axios from "axios";
import { APPOINTMENT_URL, BASE_URL } from "../constants/ApiConstants";

//Hospital APIS
export function getAllHospitals(){
    return axios.get(`${BASE_URL}hospital`);
}

export function addHospital(hospital){
    return axios.post(`${BASE_URL}hospital`,hospital);
}

export function getDoctorByHospitalId(hospId,doctorId){
    return axios.get(`${BASE_URL}hospital/${hospId}/doctor/${doctorId}`);
}


//Patient APIS
export function getAllPatient(){
    return axios.get(`${BASE_URL}patient`);
}

export function addPatient(patient){
    return axios.post(`${BASE_URL}patient`,patient);
}

export function getPatientById(patientId){
    return axios.get(`${BASE_URL}patient/${patientId}`);
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


//TimeSlot API
export function getAllAvailableTimeSlot(doctorId,date){
    return axios.get(`${BASE_URL}time_slots/available/doctor/${doctorId}/date/${date}`);
}

//Appointment API
export function getAllAppointment(){
    return axios.get(`${APPOINTMENT_URL}`);
}

export function addAppointment(){
    return axios.post(`${APPOINTMENT_URL}`);
}

export function getAppointmentById(id){
    return axios.get(`${APPOINTMENT_URL}/${id}`);
}

export function getAllAppointmentByHospitalId(hospId){
    return axios.get(`${APPOINTMENT_URL}/hosp/${hospId}`);
}

export function getAllAppointmentByDoctorId(doctorId){
    return axios.get(`${APPOINTMENT_URL}/doctor/${doctorId}`);
}

export function patchCompletedAppointmentById(appointId){
    return axios.patch(`${APPOINTMENT_URL}/complete/${appointId}`);
}

export function patchCanceledAppointmentById(appointId){
    return axios.patch(`${APPOINTMENT_URL}/cancle/${appointId}`);
}