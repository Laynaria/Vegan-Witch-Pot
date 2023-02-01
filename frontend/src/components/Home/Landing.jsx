import { Player } from "@lottiefiles/react-lottie-player";
import witch from "@assets/lotties/witch_home.json";
import logo from "@assets/logos/logo.svg";
import "./Landing.scss";

export default function Error({ setIsLanding }) {
  return (
    <div className="Landing">
      <Player autoplay loop speed={1.25} src={witch} className="WitchLottie" />
      <button type="button" onClick={() => setIsLanding(false)}>
        Enter
      </button>
      <img src={logo} alt="logo" className="LogoLanding" />
    </div>
  );
}
