import { WebsiteCarbonCalculator, WebsiteCarbonCalculatorError } from 'website-carbon-calculator';

export default async function handler(req, res) {
    const websiteUrl = req.query.website || '';
    let result = {};

    try {
        const websiteCarbonCalculator = new WebsiteCarbonCalculator({
            pagespeedApiKey: process.env.PAGE_SPEED_API_KEY,
        });

        result = await websiteCarbonCalculator.calculateByURL(websiteUrl);
    } catch (error) {
        if (error instanceof WebsiteCarbonCalculatorError) {
            console.warn(error.message);
            res.status(500).json({ error })
        }
    }

    res.status(200).json(result);
}