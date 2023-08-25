import { BrowserRouter, Routes, Route } from "react-router-dom"
import DoctorPage from './pages/DoctorPage';
import HomePage from './pages/HomePage';
import PatientPage from "./pages/PatientPage";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ModifyProfile from "./pages/ModifyProfile";


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
