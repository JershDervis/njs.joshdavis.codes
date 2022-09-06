// pages/api/cron/github.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';

type Repo = {
	id: number;
	name: string;
	description: string;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	created_at: Date;
	updated_at: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				let response = await fetch(
					`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`
				);

				if (response.status === 200) {
					let resData = await response.json();

					// Fill the SQL database TODO: Fix this createMany records
					await prisma.repository.createMany({
						data: resData.map((repo: Repo) => ({
							name: repo.name,
							description: repo.description,
							url: repo.html_url,
							stars: repo.stargazers_count,
							forks: repo.forks_count,
							createdAt: repo.created_at,
							updatedAt: repo.updated_at
						}))
					});
				}

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
