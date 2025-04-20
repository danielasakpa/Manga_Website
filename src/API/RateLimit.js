import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({tokensPerInterval: 10, interval: "second"});

async function RemoveToken(total) {
	await limiter.removeTokens(total);
}

export default RemoveToken;