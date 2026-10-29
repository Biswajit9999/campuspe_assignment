import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';

export default function Layout({ children, sectionRefs }) {
  return (
    <div className="site-layout">
      <Header sectionRefs={sectionRefs} />

      <main className="site-layout__main" id="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}