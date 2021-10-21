import { Footer, FooterText } from "../muistyles/Footer.styles";

const FooterDown = () => {
  return (
    <Footer>
      <FooterText>
        All rights reserved &copy; {new Date().getFullYear()}
      </FooterText>
    </Footer>
  );
};

export default FooterDown;
