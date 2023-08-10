import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Home from '../pages/auth/Home';

export default [
    { path: '/', component: <Home/> },
    { path: '/:username', component: <Profile/> },
    { path: '/login', component: <Login/> },
  ]