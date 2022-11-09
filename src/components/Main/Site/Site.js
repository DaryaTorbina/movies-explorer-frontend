import AboutProject from '../AboutProject/AboutProject';
import AuthLinks from '../../Basic/AuthLinks/AuthLinks';
import Footer from '../../Basic/Footer/Footer';
import Header from '../../Basic/Header/Header';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';


function Site() {
  return (
    <>
      <Header>
      <AuthLinks />
      </Header>
      <main>
        <Promo>
        <NavTab />
        </Promo>
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Site;
