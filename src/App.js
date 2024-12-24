import Login from './pages/login';
import Register from './pages/register';
import { useEffect } from 'react';
import LoadingWrapper from './components/sheared/LoadingWrapper';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from './constants'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-managment/slices/userProfile';
import MainLayout from './components/layouts/Main';
import Cabinet from './components/layouts/Cabinet';
import './App.css'


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
                        <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}>
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



                   
       