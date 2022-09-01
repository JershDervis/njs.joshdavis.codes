// pages/api/cron/github.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				let response = await fetch(
					`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`
				);

				if (response.status === 200) {
					let data = await response.json();

					// Fill the SQL database
				}
				// See example-response for what the above data will look like

				res.status(200).json({ success: true });
			} else {
				res.status(401).json({ success: false });
			}
		} catch (err: any) {
			//TODO: work out the type for this error
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
