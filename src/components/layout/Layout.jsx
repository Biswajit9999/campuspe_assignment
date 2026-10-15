import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="site-layout">
      <Header />

      <main className="site-layout__main" id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}