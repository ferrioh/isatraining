import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import Header from './Header';
export default function Layout() {
 const {pathname}=useLocation();
 if(pathname==='/') return <main><Outlet/></main>;
 return <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body"><Header/><main className="app-main flex-1 pt-20 pb-28 px-5"><Outlet/></main><BottomNav/></div>;
}
