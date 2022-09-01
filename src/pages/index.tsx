import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Josh Davis | Codes</title>
				<meta name="description" content="A portfolio of my experiences as a software developer" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Main content */}
			<div className="w-full h-screen static bg-cover bg-[url('/bg.jpg')]">
				<div className="w-full h-screen static bg-slate-900 bg-opacity-80">
					<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
						<h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-200">
							Josh <span className="text-blue-400">Davis</span> Codes
						</h1>
						<p className="text-2xl text-gray-300">A portfolio of my developer experience</p>
					</main>
				</div>
			</div>
		</>
	);
};

export default Home;
