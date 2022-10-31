import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import StudentClassesPage from "./pages/ClassesPage";
      
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="classes" element={<StudentClassesPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

