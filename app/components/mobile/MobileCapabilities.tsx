import {
  productCapabilitiesIntro,
  type ProductCapability,
} from "../../data/mobile-story";

type Props = {
  capabilities: ProductCapability[];
};

export function MobileCapabilities({ capabilities }: Props) {
  return (
    <section aria-label="Product capabilities" className="mobile-capabilities" id="mobile-capabilities">
      <div className="mobile-capabilities-head">
        <span>{productCapabilitiesIntro.kicker}</span>
        <h2>{productCapabilitiesIntro.title}</h2>
        <p>{productCapabilitiesIntro.body}</p>
      </div>

      <div className="mobile-capabilities-grid">
        {capabilities.map((capability) => (
          <article className="mobile-capability-card" key={capability.id}>
            <span>{capability.tag}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
