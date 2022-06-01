import { PrismaClient } from '~/../prisma/node_modules/.prisma/client';

const primaryDB = 'postgresql://postgres:please88@localhost:5432/reserve';

const isLocalHost = primaryDB.includes('localhost');

const logThreshold = 50;
let db: PrismaClient;

function getClient(type: 'write' | 'read'): PrismaClient {
	console.log(`Setting up Prisma client to localhost for ${type}`);
	// NOTE: during development if you change anything in this function, remember
	// that this only runs once per server restart and won't automatically be
	// re-run per request like everything else is.
	const client = new PrismaClient({
		log: [
			{ level: 'query', emit: 'event' },
			{ level: 'error', emit: 'stdout' },
			{ level: 'info', emit: 'stdout' },
			{ level: 'warn', emit: 'stdout' },
		],
		datasources: {
			db: {
				url: primaryDB,
			},
		},
	});
	client.$on('query', (e) => {
		if (e.duration < logThreshold) return;

		console.log(`prisma:query - ${e.duration}ms - ${e.query}`);
	});
	
	// make the connection eagerly so the first request doesn't have to wait
	void client.$connect();
	db = db || client;
	return client;
}

const isProd = process.env.NODE_ENV === 'production';

if (!isProd && !isLocalHost) {
	// if we're connected to a non-localhost db, let's make
	// sure we know it.

	console.warn(
		`
⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️
Connected to non-localhost DB in dev mode:
  ${primaryDB}
⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️ ⚠️
    `.trim()
	);
}

const linkExpirationTime = 1000 * 60 * 30;
const sessionExpirationTime = 1000 * 60 * 60 * 24 * 365;
getClient('read');
export { linkExpirationTime, sessionExpirationTime, getClient, db };
