import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DoctorProfile from './pages/DoctorProfile';
import AllApointment from './pages/AllApointment';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported if not already done in App.js
import RegistrationForm from './pages/RegistrationForm';
import UserDashboard from './pages/UserDashboard';
import AllHospitals from './pages/AllHospitals';
import AddDoctor from './pages/AddDoctor';
import AddHospital from './pages/AddHospital';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContext3';
import DoctorAppointment from './pages/DoctorAppointment';
import DoctorHospital from './pages/DoctorHospital';
import HospitalList from './pages/HospitalList';
import Logout from './pages/Logout';
import AdminSideBar from './components/AdminSideBar';
import HospitalListAdmin from './pages/HospitalListAdmin';
import DoctorAdmin from './pages/DoctorAdmin';
import OtpVerification from './pages/OtpVerification';

const App = () => {
  return (
    <AppContextProvider>
      <div className='mx-4 sm:mx[-10%]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allhospital' element={<AllHospitals />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/doctor' element={<DoctorProfile />} />
          <Route path='/admin' element={<AllApointment />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:hospId' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/doctorlist' element={<DoctorAdmin/>} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docID' element={<Appointment />} />
          <Route path='/doc-appointment' element={<DoctorAppointment />} />
          <Route path='/userdashboard' element={<UserDashboard />} />
          <Route path='/adddoctor' element={<AddDoctor />} />
          <Route path='/doctorinhospital' element={<DoctorHospital />} />
          <Route path='/addhospital' element={<AddHospital />} />
          <Route path='/hospitallist' element={<HospitalList />} />
          <Route path='/adminbar' element={<AdminSideBar />} />
          <Route path='/logout/:userId' element={<Logout />} />
          <Route path='/hospital-list-admin' element={<HospitalListAdmin />} />
          <Route path='/otp' element={<OtpVerification />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;