// ProductCard — shared lineup card layout matching Store cards:
// image → eyebrow/name/tagline/price → Colour swatches → actions.
import { Link } from "react-router-dom";

/**
 * @param {object} props
 * @param {object} props.model — lineup item (name, chip, highlight, price, monthly, colors, image, badge…)
 * @param {string} props.primaryHref
 * @param {string} [props.secondaryHref="/store"]
 * @param {string} [props.primaryLabel="Learn more"]
 * @param {string} [props.secondaryLabel="Buy →"]
 */
const ProductCard = ({
    model,
    primaryHref,
    secondaryHref = "/store",
    primaryLabel = "Learn more",
    secondaryLabel = "Buy →",
}) => {
    const { name, chip, highlight, price, monthly, colors, badge, image } = model;

    return (
        <article className="mac-card">
            {badge && <span className="mac-card-badge">{badge}</span>}

            {image ? (
                <div className="mac-card-img">
                    <img src={image} alt={name} />
                </div>
            ) : (
                <div className="mac-card-img-placeholder" aria-hidden="true" />
            )}

            <div className="mac-card-body">
                <p className="mac-card-chip">{chip}</p>
                <h2 className="mac-card-name">{name}</h2>
                <p className="mac-card-desc">{highlight}</p>
                <div className="mac-card-pricing">
                    <span className="mac-card-price">From ${price.toLocaleString()}</span>
                    {monthly != null && (
                        <span className="mac-card-monthly">or ${monthly}/mo.</span>
                    )}
                </div>
            </div>

            <div className="mac-card-swatches" role="group" aria-label="Colour">
                <span className="mac-swatches-label">Colour</span>
                <div className="mac-swatches-row">
                    {colors.map(({ hex, label }) => (
                        <span
                            key={hex}
                            className="mac-swatch"
                            style={{ backgroundColor: hex }}
                            title={label}
                            aria-label={label}
                        />
                    ))}
                </div>
            </div>

            <div className="mac-card-actions">
                <Link to={primaryHref} className="btn-primary-pill">
                    {primaryLabel}
                </Link>
                <Link to={secondaryHref} className="btn-ghost-pill">
                    {secondaryLabel}
                </Link>
            </div>
        </article>
    );
};

export default ProductCard;
