import { CronJob } from 'cron';
import jwt from 'jsonwebtoken';

import config from '@config';

const CRON_PER_HOUR = '0 59 * * * *';
const CRON_PER_DAY = '0 0 23 * * *';

export async function cleanUpInvalidTokenHandler() {

}

export async function runCleanUpInvalidTokensJob({ app, cronTime }) {
	return new CronJob({
		cronTime,
	});
}


export async function run({ app }) {
	const cleanUpInvalidTokensJobCronTime = (
		(config.CRON_CHECK_INVALID_TOKENS_DELAY_SECS || 3600) < 24 * 60 * 60 ? CRON_PER_HOUR : CRON_PER_DAY
	);
	await runCleanUpInvalidTokensJob({ app, cronTime: cleanUpInvalidTokensJobCronTime });
}
