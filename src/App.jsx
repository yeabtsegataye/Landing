import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import Login from "./auth/Login";
import { Signup } from "./auth/Signup";
import { useEffect, useState } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import verifyToken from "./middleware/verifiToken";
import { Checkout } from "./Pages/CheckOut";

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
          <Route path="/" element={<Layout />}/>
          <Route path="/Login" element={isVerified ? <Layout /> : <Login />}/>
          <Route path="/signup" element={isVerified ?<Layout /> : <Signup />}/>
          <Route path="/checkout/:id" element={isVerified ? <Checkout /> : <Login />}/>

      </Routes>
     
     
    </>
  );
}

export default App;
