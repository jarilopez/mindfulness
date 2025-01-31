import Image from 'next/image';
import Link from 'next/link';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header-container">
        <nav className="nav-menu">
          <Link href="/" className="nav-item">Home</Link>
          <Link href="/BreathingPage" className="nav-item">Relax</Link>
          <Link href="/VisualizationPage" className="nav-item">Disconnect</Link>
          <Link href="/AuthPage" className="nav-item">Login</Link>
        </nav>
    </header>
  );
};

export default Header;
