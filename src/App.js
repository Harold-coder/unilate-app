import { BrowserRouter, Routes, Route } from "react-router-dom"
import DoctorPage from './pages/DoctorPage';
import HomePage from './pages/HomePage';
import PatientPage from "./pages/PatientPage";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctorPage" element={<DoctorPage />} />
        <Route path="/patientPage" element={<PatientPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
