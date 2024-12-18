import Login from './pages/login';
import Register from './pages/register';
import { useEffect } from 'react';
import LoadingWrapper from './components/sheared/LoadingWrapper';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from './constants'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-managment/slices/userProfile';
import Cabinet from './pages/cabinet';
import MainLayout from './components/layouts/Main';
import CabinetLayout from './components/layouts/Cabinet';


const App = () => {       
    const dispatch = useDispatch();
    const { loading, authUserInfo: { isAuth} } = useSelector(store => store.userProfile);
    
    useEffect( () => {
        dispatch(fetchUserProfileInfo());
    }, []);

   
    return (
        <LoadingWrapper loading={loading}>
            <RouterProvider
                router={createBrowserRouter(
                    createRoutesFromElements(
                        <Route path="/" element={<MainLayout />}>
                        <Route path="/" element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Navigate to={ROUTE_CONSTANTS.REGISTER} />} />                            
                        <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login />} />
                        <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />} />

                        {/* Cabinet Layout Route */}
                        <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}>
                            <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />
                                
                            </Route>
                        </Route>
                    )
                )}
            />
        </LoadingWrapper>
    );
};

export default App;


{/*import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Register from './register';
import Login from './login';
import Millionaire from "./components/main";
import Money from "./components/money";
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { EarningMoney } from './constants';
import { FIRESTORE_PATH_NAMES } from './constants'; 
import { AuthContext } from './context';
import LoadingWrapper from './components/sheared/LoadingWrapper';
import { ROUTE_CONSTANTS } from './constants';

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1); 
  const [earned, setEarned] = useState("$0");
  const [stop, setStop] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState({});

  const handleGetUserData = useCallback(async (uid) => {
    const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    const response = await getDoc(docRef);

    if (response.exists()) {
      setUserProfileInfo(response.data());
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        handleGetUserData(user.uid);
      }
      setLoading(false);
      setIsAuth(Boolean(user));
    });
  }, [handleGetUserData]);

  
  

  return (
    <AuthContext.Provider value={{ isAuth, userProfileInfo, handleGetUserData }}>
      <LoadingWrapper loading={loading}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={ROUTE_CONSTANTS.REGISTER} />} />
            <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.GAME}/> : <Register/>} />
            <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.GAME}/> : <Login setIsAuth={setIsAuth} />} />
            
            <Route 
              path={ROUTE_CONSTANTS.GAME} 
              element={isAuth ? (
                <div className="container">
                  {stop ? (
                    <div>
                      <h1 className="endText">Դուք վաստակեցիք: {earned}</h1>
                      <button className="restartButton" onClick={restartGame}>Վերսկսել խաղը</button>
                    </div>
                  ) : (
                    <>
                      <Millionaire 
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                        setStop={setStop}
                      />
                      <Money 
                        questionNumber={questionNumber}
                      />
                    </>
                  )}
                </div>
              ) : <Navigate to={ROUTE_CONSTANTS.REGISTER} />}
            />

                   
          </Routes>
        </Router>
      </LoadingWrapper>
    </AuthContext.Provider>
  );
};
export default App;*/}

