import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import CreateTicket from './pages/CreateTicket.jsx';
import MyTickets from './pages/MyTickets.jsx';
import TicketDetail from './pages/TicketDetail.jsx';
import TechDashboard from './pages/TechDashboard.jsx';
import TechTicketDetail from './pages/TechTicketDetail.jsx';
import Analytics from './pages/Analytics.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/create"          element={<CreateTicket />} />
        <Route path="/my-tickets"      element={<MyTickets />} />
        <Route path="/ticket/:id"      element={<TicketDetail />} />
        <Route path="/tech"            element={<TechDashboard />} />
        <Route path="/tech/ticket/:id" element={<TechTicketDetail />} />
        <Route path="/analytics"       element={<Analytics />} />
        <Route path="*"                element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
