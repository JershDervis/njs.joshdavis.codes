// pages/api/cron/github.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import { log, withAxiom } from 'next-axiom';

type Repo = {
	id: number;
	name: string;
	full_name: string;
	description: string;
	html_url: string;
	stargazers_count: number;
	watchers_count: number;
	language: string;
	forks_count: number;
	open_issues_count: number;
	pushed_at: string;
	created_at: string;
	updated_at: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { authorization } = req.headers;

			if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
				let response = await fetch(
					`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`
				);

				if (response.status === 200) {
					let resData = await response.json();
					log.debug('Github API response', resData);

					// Upsert many records at a time
					const dbUpdateTrans = await prisma.$transaction(
						resData.map((repo: Repo) =>
							prisma.repository.upsert({
								create: {
									repoId: repo.id,
									name: repo.name,
									description: repo.description,
									url: repo.html_url,
									stars: repo.stargazers_count,
									forks: repo.forks_count,
									createdAt: repo.created_at,
									updatedAt: repo.updated_at
								},
								update: {
									repoId: repo.id,
									name: repo.name,
									description: repo.description,
									url: repo.html_url,
									stars: repo.stargazers_count,
									forks: repo.forks_count,
									createdAt: repo.created_at,
									updatedAt: repo.updated_at
								},
								where: { repoId: repo.id }
							})
						)
					);

					log.debug('DB update transaction', dbUpdateTrans);
				}

				res.status(200).json({ success: true });
			} else {
				log.warn('Inavalid API key used', authorization);
				res.status(401).json({ success: false });
			}
		} catch (err: any) {
			log.error('Error in repository update', err.message);
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}

export default withAxiom(handler);
