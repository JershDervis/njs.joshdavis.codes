import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Linkedin, Github, EnvelopeFill } from 'react-bootstrap-icons';

const socials = [
	{
		name: 'LinkedIn',
		icn: <Linkedin className="w-6 h-6 text-gray-300" />,
		href: 'https://www.linkedin.com/in/joshua--davis/'
	},
	{
		name: 'GitHub',
		icn: <Github className="w-6 h-6 text-gray-300" />,
		href: 'https://github.com/JershDervis'
	},
	{
		name: 'Email',
		icn: <EnvelopeFill className="w-6 h-6 text-gray-300" />,
		href: 'mailto:me@joshdavis.codes'
	}
];

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
				src="/bg.jpg"
				alt="Photo of Josh Davis"
				layout="fill"
				objectFit="cover"
				placeholder="blur"
				blurDataURL="/bg-blur.png"
				priority
			/>
			<div className="w-full h-screen bg-slate-900 bg-opacity-80 relative">
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
						<div className="flex justify-center">
							{socials.map(({ name, icn, href }) => (
								<a
									key={name}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="p-4 md:m-2 m-4 rounded-md hover:bg-gray-800 transform duration-200 hover:bg-opacity-100 transition-all hover:scale-110"
								>
									{icn}
								</a>
							))}
						</div>
					</div>
				</main>
			</div>
		</>
	);
};
export default Home;
