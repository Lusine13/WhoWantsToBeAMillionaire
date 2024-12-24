import { Avatar, Dropdown, Typography, Flex, theme } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { ROUTE_CONSTANTS } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../../../state-managment/slices/userProfile';
import Cabinet from '../../layouts/Cabinet';
import './index.css';


const { useToken } = theme;
const { Text } = Typography;

const getFullNameLetter = ({ firstName, lastName }) => {
    if (firstName && lastName) {
        return `${firstName[0]} ${lastName[0]}`
    }
    return '-'
}

const AuthProfileDropDown = ({ userProfileInfo }) => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useToken();

    const handleSignOut = async () => {
        try {
          await signOut(auth);
          dispatch(setIsAuth(false))
        } catch (e) {
            console.log(e, `signOut error`)
        }
    };
    const handleRestart = ({setStop}, {setQuestionNumber}, {setCallFriendUsed}, {setFiftyFiftyUsed}, {setEarned}) => {
        setQuestionNumber(0);  
        setStop(false);  
        setFiftyFiftyUsed(false);  
        setCallFriendUsed(false); 
        setEarned(0);
    };

    const items = [
        {
            label: 'Restart Game',
            key: 'restart',
            onClick: handleRestart,
        },
        {
            label: 'Logout',
            key: 'logout',
            onClick: handleSignOut,
        },
    ]

   

    return (
        <Dropdown
         menu={{ items }} 
         trigger={['click']}
        dropdownRender={(menu) => {
          return (
            <div 
            style={{
                borderRadius: token.borderRadiusLG,
                backgroundColor: token.colorBgElevated,
                boxShadow: token.boxShadowSecondary,
            }}
            >
                <Flex vertical align='center' style={{padding: token.sizeMS}}>                   
                    <Text>{userProfileInfo.firstName} {userProfileInfo.lastName}</Text>
                    <Text type="secondary" underline>{userProfileInfo.email}</Text>
                </Flex>
                {menu}
            </div>
          )
        }}
        >
        <Avatar size="large" className='user_profile_avatar'>
            {getFullNameLetter(userProfileInfo)}
          </Avatar>
        </Dropdown>
    )
};

export default AuthProfileDropDown;