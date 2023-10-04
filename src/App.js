import { BrowserRouter, Routes, Route } from "react-router-dom"
import DoctorPage from './pages/DoctorPage';
import HomePage from './pages/HomePage';
import PatientPage from "./pages/PatientPage";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ModifyProfile from "./pages/ModifyProfile";

// export const urlServer = "http://localhost:3001/";
export const urlServer = "https://unilate-server-f22fc8c7c32c.herokuapp.com/";
// export const urlServer = "https://api.unilate.be/";

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
