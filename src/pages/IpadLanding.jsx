// iPad Landing — /ipad
import ProductLineLanding from "../components/ProductLineLanding";
import { ipadLineup, whyIpad } from "../constants";

const IpadLanding = () => (
    <ProductLineLanding
        idPrefix="ipad"
        eyebrow="iPad"
        headline="Touch, draw, and create on the ultimate canvas."
        sub="Powerful chips. Stunning displays. Designed for Apple Pencil and Magic Keyboard."
        lineupTitle="Choose your iPad."
        whyTitle="Why iPad."
        lineup={ipadLineup}
        whyItems={whyIpad}
        shopLabel="Shop iPad"
        heroVideo="/videos/ipad_bg.mp4"
    />
);

export default IpadLanding;
