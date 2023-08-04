import { Route, Routes } from "react-router-dom";
import RegistroPerroForm from "./RegistroPerroForm.jsx";
import App from "./App.jsx";

const AppRoutes = () => {
  return (
<Routes>
  <Route path="/registro" element={<RegistroPerroForm />} />
  <Route path="/app" element={<App />} />
</Routes>
  );
};

export default AppRoutes;
