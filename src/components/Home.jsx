import AppShowcase from "./appshowcase/AppShowcase";
import Contact from "./contact/Contact";
import OpportunityDiscovery from "./discovery/OpportunityDiscovery";
import { FeatureSections } from "./feature_section/FeatureSection";
import HeroSection from "./herosection/HeroSection";
import Layout from "./layout/Layout";
import PartnersMarquee from "./partner.jsx/PartnersMarquee";
import ResumeUpload from "./resume_upload/ResumeUpload";
const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <PartnersMarquee />
      <OpportunityDiscovery />
      <ResumeUpload />
      <FeatureSections />
      <AppShowcase />
      <Contact />
    </Layout>
  );
};

export default Home;
