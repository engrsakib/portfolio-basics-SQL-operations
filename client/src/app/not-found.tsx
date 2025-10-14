import Link from "next/link";
import React from "react";

const Shape = () => {
	return (
		<svg
			className="absolute top-0 right-0 hidden sm:block -z-[1]"
			width="544"
			height="495"
			viewBox="0 0 544 495"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="336.426"
				y="-167.539"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 336.426 -167.539)"
				fill="#612DDD"
			/>
			<rect
				x="523.426"
				y="-89.5391"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 523.426 -89.5391)"
				fill="#ff6fd8"
			/>
			<rect
				x="721.426"
				y="-21.5391"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 721.426 -21.5391)"
				fill="#38c7ff"
			/>
		</svg>
	);
};

const HttpCodes4 = () => {
	return (
		<section
			className="ezy__httpcodes4 light py-32 md:py-60 bg-gradient-to-br from-[#612DDD] via-[#ff6fd8] to-[#38c7ff] text-white relative overflow-hidden z-[1]"
			style={{
				minHeight: "100vh",
				position: "relative",
			}}
		>
			<Shape />
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-10 items-center">
					<div className="col-span-12 lg:col-span-5 text-center lg:text-start flex flex-col h-full justify-center">
						<h2 className="text-[90px] md:text-[120px] leading-none font-extrabold mb-6 text-shadow-lg drop-shadow-xl">
							404
						</h2>
						<p className="text-2xl md:text-3xl font-medium opacity-90 mb-4">
							Something Missing, Page not found!
						</p>
						<div className="lg:mt-8 mt-5">
							<Link
								href="/"
								type="button"
								className="inline-block py-3 px-10 text-lg font-semibold rounded-lg transition-all duration-300 bg-[#612DDD] hover:bg-[#4a1fa6] text-white shadow-xl border-2 border-white hover:border-[#ff6fd8]"
								style={{
									boxShadow: "0 4px 24px 0 rgba(97,45,221,0.15)",
								}}
							>
								Back Home
							</Link>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-7 flex justify-center items-center">
						<img
							src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="404 Illustration"
							className="max-w-full h-auto rounded-2xl shadow-2xl border-4 border-[#612DDD]/40"
						/>
					</div>
				</div>
			</div>
			{/* Decorative Circles */}
			<div className="absolute bottom-16 left-16 w-36 h-36 bg-[#ff6fd8]/30 rounded-full blur-2xl z-0"></div>
			<div className="absolute top-24 right-32 w-24 h-24 bg-[#612DDD]/40 rounded-full blur-xl z-0"></div>
			<div className="absolute top-3 left-4 w-12 h-12 bg-[#38c7ff]/50 rounded-full blur-lg z-0"></div>
		</section>
	);
};

export default HttpCodes4;