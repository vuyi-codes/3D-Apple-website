// AirPods Landing — /airpods
import ProductLineLanding from "../components/ProductLineLanding";
import { airpodsLineup, whyAirpods } from "../constants";

const AirPodsLanding = () => (
    <ProductLineLanding
        idPrefix="airpods"
        eyebrow="AirPods"
        headline="Sound that surrounds you."
        sub="Active Noise Cancellation. Spatial Audio. Effortless pairing across your Apple devices."
        lineupTitle="Choose your AirPods."
        whyTitle="Why AirPods."
        lineup={airpodsLineup}
        whyItems={whyAirpods}
        shopLabel="Shop AirPods"
    />
);

export default AirPodsLanding;
