import { Player } from "@lottiefiles/react-lottie-player";
import avocado from "@assets/lotties/avocado_error.json";

export default function Error() {
  return (
    <>
      <Player autoplay loop src={avocado} />
      <p>You lost your way, like this little magic avocado.</p>
      <p>
        You should maybe think about getting back to somewhere the witch wants
        you...
      </p>
    </>
  );
}
