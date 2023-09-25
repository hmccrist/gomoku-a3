
import './App.css';
import { Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GameHistoryPage from './pages/GameHistoryPage';
import GameLogPage from './pages/GameLogPage';
import Header from './components/Header';
import { UserProvider } from './components/UserProvider';

function App() {
  return (
    <UserProvider>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/games" element={<GameHistoryPage />} />
          <Route path="/game-log/:id" element={<GameLogPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
