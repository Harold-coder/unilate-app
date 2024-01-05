import { BrowserRouter, Routes, Route } from "react-router-dom"
import DoctorPage from './pages/DoctorPage';
import HomePage from './pages/HomePage';
import PatientPage from "./pages/PatientPage";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ModifyProfile from "./pages/ModifyProfile";

// export const urlServer = "http://localhost:3001/";
// export const urlServer = "https://unilate-server-f22fc8c7c32c.herokuapp.com/";
// export const urlServer = "https://api.unilate.be/";

// export const urlServer = "http://10.50.2.238:8012/";
// export const urlServer = "http://ec2-51-20-103-254.eu-north-1.compute.amazonaws.com:8012/";
export const urlServer = "https://hhd09d017j.execute-api.eu-north-1.amazonaws.com/dev/";

export const localDev = true;

export const mockDoctor = {
  'doctor_id': 888,
  'name': 'Test Doctor',
  'specialty': 'Testor',
  'city': 'Test City',
  'email': 'test@email.com',
  'phone_number': '839208321',
  'hospital_name': 'Test Hospital',
  'picture': 'man-white-blond'
};

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctorPage/:id" element={<DoctorPage />} />
        <Route path="/patientPage/:id" element={<PatientPage />} />
        <Route path="/errorPage" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/modifyProfile/:id" element={<ModifyProfile />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
