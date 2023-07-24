import {BrowserRouter, Routes, Route} from "react-router-dom";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <>
      <BrowserRouter> 
      <Routes>
      <Route path="*" element={<TestPage />} /> 
      {/* <Route path="/two" element={<TestPage2/>}/> */}
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;