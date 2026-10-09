import { FEATURES } from '../data/features';

function Features() {
    return (
        <section className="features" id="features" aria-labelledby="features-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">Core Features</span>
                    <h2 id="features-title" className="section-header__title">
                        One platform for every sales challenge
                    </h2>
                    <p className="section-header__desc">
                        From pipeline management to analytics, SalesPilot covers everything your sales team needs day to day.
                    </p>
                </div>

                <div className="features__grid" role="list">
                    {FEATURES.map((feature) => (
                        <article
                            key={feature.id}
                            className="features__card"
                            role="listitem"
                        >
                            <div className="features__icon" aria-hidden="true">
                                {feature.icon}
                            </div>
                            <h3 className="features__title">{feature.title}</h3>
                            <p className="features__desc">{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
