function CallToAction() {
    return (
        <section className="cta-banner" id="demo" aria-labelledby="cta-title">
            <div className="cta-banner__bg" aria-hidden="true" />
            <div className="container cta-banner__inner">
                <h2 id="cta-title" className="cta-banner__title">
                    Ready to boost your sales productivity?
                </h2>
                <p className="cta-banner__desc">
                    Join more than 500 companies using SalesPilot to supercharge their sales teams. 14-day free trial, no credit card required.
                </p>
                <div className="cta-banner__actions">
                    <a href="#demo" className="btn btn--white btn--lg">
                        Book a Demo Now
                    </a>
                    <a href="#pricing" className="btn btn--outline-white btn--lg">
                        Compare Plans
                    </a>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;
