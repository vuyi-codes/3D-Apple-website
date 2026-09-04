// Watch Landing — /watch
import ProductLineLanding from "../components/ProductLineLanding";
import { watchLineup, whyWatch } from "../constants";

const WatchLanding = () => (
    <ProductLineLanding
        idPrefix="watch"
        eyebrow="Watch"
        headline="The ultimate device for a healthy life."
        sub="Advanced health sensors. Carbon neutral pairs. Designed to go everywhere you do."
        lineupTitle="Choose your Apple Watch."
        whyTitle="Why Apple Watch."
        lineup={watchLineup}
        whyItems={whyWatch}
        shopLabel="Shop Apple Watch"
        heroVideo="/videos/watch_bg.mp4"
    />
);

export default WatchLanding;
