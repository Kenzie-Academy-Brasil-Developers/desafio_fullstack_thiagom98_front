import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/home/Home";
import { UserProvider } from "./context/UserContext";
import Auth from "./pages/auth/Auth";
import useToken from "./hooks/useToken";
export default function App (){
 
    return(
        <>
            <ToastContainer 
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/" element={
                            <ProtectedRouteGuard>
                                <Home />
                            </ProtectedRouteGuard>
                        } />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>

        </>
    )
}

function ProtectedRouteGuard({ children }) {
    const token = useToken();
  
    if (!token) {
      return <Navigate to="/auth" />;
    }
  
    return <>{children}</>;
}