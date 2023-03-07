import { Outlet, ReactLocation, Route, Router } from '@tanstack/react-location';
import { CenteredLayout } from '~/components';
import { Login, Routes } from '~/pages';
import { Header } from './header';

const Welcome = () => (
  <CenteredLayout className="flex items-center justify-center w-full gap-4 text-white">
    <div className="flex items-center justify-center text-3xl w-full h-full mb-[50px]">
      Welcome to DBB test task!
    </div>
  </CenteredLayout>
);

const reactLocation = new ReactLocation();

const routes: Route[] = [
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Routes',
    element: <Routes />,
  },
];

export const App = () => (
  <Router location={reactLocation} routes={routes}>
    <Header />
    <Outlet />
  </Router>
);
