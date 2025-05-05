import { useState } from 'react'
import './App.css'
import Roleta3 from './Components/Roleta3/Roleta3'


import Home from './Components/Home/Home.jsx'


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/Context/AuthContext';
import { PrivateRoute } from './Components/PrivateRoute';

// import Rol from './Components/Wheel/index'
function App() {



    // const [count, setCount] = useState(0)

    return (
        <>

            <Router>
                <AuthProvider>
                    <Routes>
                        {/* <Route
                            path="/login"
                            element={
                                <Login />
                            } /> */}

                        <Route
                            path="/roleta"
                            element={
                                <Home />
                            }/>

                        {/* <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dash />
                                </PrivateRoute>
                            }
                        /> */}
                        <Route path="/" element={<Navigate to="/roleta" />} />
                    </Routes>
                </AuthProvider>
            </Router>


        </>
    )
}

export default App
