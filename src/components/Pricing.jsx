import { PRICING_PLANS } from '../data/pricing';

function Pricing() {
    return (
        <section className="pricing" id="pricing" aria-labelledby="pricing-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">Pricing</span>
                    <h2 id="pricing-title" className="section-header__title">
                        Simple, transparent pricing with no hidden fees
                    </h2>
                    <p className="section-header__desc">
                        Every plan includes a 14-day free trial, no credit card required.
                    </p>
                </div>

                <div className="pricing__grid" role="list">
                    {PRICING_PLANS.map((plan) => (
                        <article
                            key={plan.id}
                            className={`pricing__card ${plan.featured ? 'pricing__card--featured' : ''}`}
                            role="listitem"
                        >
                            {plan.badge && (
                                <span className="pricing__badge">{plan.badge}</span>
                            )}
                            <h3 className="pricing__plan-name">{plan.name}</h3>
                            <p className="pricing__plan-desc">{plan.description}</p>
                            <div className="pricing__price">
                                <span className="pricing__amount">{plan.price}</span>
                                {plan.period && <span className="pricing__period">{plan.period}</span>}
                            </div>
                            <a
                                href={plan.cta.href}
                                className={`btn btn--lg btn--full ${plan.featured ? 'btn--primary' : 'btn--outline'}`}
                            >
                                {plan.cta.label}
                            </a>
                            <ul className="pricing__features" role="list">
                                {plan.features.map((f) => (
                                    <li key={f} className="pricing__feature" role="listitem">
                                        <span className="pricing__check" aria-hidden="true">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;
