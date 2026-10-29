import { useRef } from "react";
import AppShowcase from "./appshowcase/AppShowcase";
import Contact from "./contact/Contact";
import OpportunityDiscovery from "./discovery/OpportunityDiscovery";
import { FeatureSections } from "./feature_section/FeatureSection";
import HeroSection from "./herosection/HeroSection";
import Layout from "./layout/Layout";
import PartnersMarquee from "./partner.jsx/PartnersMarquee";
import ResumeUpload from "./resume_upload/ResumeUpload";

const Home = () => {
  const sectionRefs = {
    colleges: useRef(null),
    employers: useRef(null),
  };

  return (
    <Layout sectionRefs={sectionRefs}>
      <HeroSection />
      <PartnersMarquee />
      <OpportunityDiscovery />
      <ResumeUpload />
      <FeatureSections
        collegesRef={sectionRefs.colleges}
        employersRef={sectionRefs.employers}
      />
      <AppShowcase />
      <Contact />
    </Layout>
  );
};

export default Home;