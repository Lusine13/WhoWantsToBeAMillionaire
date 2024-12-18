import { Outlet } from 'react-router-dom';

//import './index.css';

const MainLayout = () => {
    return (
        <div className="main_layaut_container">
                    
            <Outlet />
          
        </div>
    )
};

export default MainLayout;