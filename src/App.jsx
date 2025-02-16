import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import { Signup } from "./auth/Signup";
import { useEffect, useState } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import verifyToken from "./middleware/verifiToken";
import { Checkout } from "./Pages/CheckOut";
import { Home } from "./Pages/Home";
import { Payment } from "./Pages/Payment";

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      refresh();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, refresh]);
  const token = useSelector((state) => state.auth.token);

  const verified = async () => {
    const Is_Verified = await verifyToken(token, dispatch, refresh);
    setIsVerified(Is_Verified);
  };
  verified();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="checkout/:id"
          element={isVerified ? <Checkout /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/payment_processing" element={<Payment />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
