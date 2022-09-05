import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

//TODO: Find better way to set isPageLoaded state
// preferably not using 2x useEffect blocks

const Home: NextPage = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isPageLoaded, setIsPageLoaded] = useState(false);
	useEffect(() => {
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			setIsPageLoaded(true);
		}
	}, [isLoaded]);

	return (
		<>
			<Head>
				<title>Josh Davis | Codes</title>
				<meta name="description" content="A portfolio of my experiences as a software developer" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Main content */}
			<Image
				className="bg-cover"
				src="/bg.jpg"
				alt="Image of Josh Davis on holiday"
				layout="fill"
				objectFit="cover"
				placeholder="blur"
				blurDataURL="/bg-blur.png"
				priority
			/>
			<div className="w-full h-screen absolute bg-slate-900 bg-opacity-80">
				<main
					className={`container mx-auto flex flex-col items-center justify-center min-h-screen p-4`}
				>
					<div
						className={`absolute duration-700 transform ease-in transition-all ${
							isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
						}`}
					>
						<h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-200 text-center">
							Josh <span className="text-blue-400">Davis</span> Codes
						</h1>
						<p className="text-2xl text-gray-300 text-center">
							A portfolio of my developer experience
						</p>
					</div>
				</main>
			</div>
		</>
	);
};

export default Home;
