import Home from '../pages/Home/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import Orders from '../pages/Orders/Orders'
import Menu from '../pages/Menu/Menu'
import Customers from '../pages/Customers/Customers'
import Settings from '../pages/Settings/Settings'
import AboutUs from '../pages/AboutUs/AboutUs'
import ContactUs from '../pages/ContactUs/ContactUs'
import Feedback from '../pages/Feedback/Feedback'
import FAQ from '../pages/FAQ/FAQ'

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/orders',
    element: <Orders />
  },
  {
    path: '/menu',
    element: <Menu />
  },
  {
    path: '/customers',
    element: <Customers />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/about-us',
    element: <AboutUs />
  },
  {
    path: '/contact-us',
    element: <ContactUs />
  },
  {
    path: '/feedback',
    element: <Feedback />
  },
  {
    path: '/faq',
    element: <FAQ />
  }
] 