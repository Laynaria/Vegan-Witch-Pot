import { Player } from "@lottiefiles/react-lottie-player";
import avocado from "@assets/lotties/avocado_error.json";

export default function Error() {
  return (
    <>
      <Player autoplay loop src={avocado} style={{ maxWidth: "95vw" }} />
      <p style={{ maxWidth: "95vw", textAlign: "center" }}>
        You lost your way, like this little magic avocado.
      </p>
      <p
        style={{ maxWidth: "95vw", marginBottom: "4rem", textAlign: "center" }}
      >
        You should maybe think about getting back to somewhere the witch wants
        you...
      </p>
    </>
  );
}
