import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Home from '../pages/auth/Home';

//dynamic routes
//need to go at the end of 
//same depth routes
export default [
    { path: '/', component: <Home/> },
    { path: '/login', component: <Login/> },
    { path: '/search', component: <Login/> },
    { path: '/messages', component: <Login/> },
    { path: '/:username', component: <Profile/> },
  ]