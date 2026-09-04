// Vision Landing — /vision
import ProductLineLanding from "../components/ProductLineLanding";
import { visionLineup, whyVision } from "../constants";

const VisionLanding = () => (
    <ProductLineLanding
        idPrefix="vision"
        eyebrow="Vision"
        headline="Welcome to spatial computing."
        sub="Apps in your space. A cinema wherever you are. Connections that feel face to face."
        lineupTitle="Apple Vision Pro."
        whyTitle="Why Vision Pro."
        lineup={visionLineup}
        whyItems={whyVision}
        shopLabel="Shop Vision Pro"
    />
);

export default VisionLanding;
