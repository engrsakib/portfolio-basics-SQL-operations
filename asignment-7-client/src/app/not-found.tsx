

// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function NotFoundPage() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md text-center">
//         <h1 className="text-6xl font-bold text-gray-800">404</h1>
//         <h2 className="mt-2 text-2xl font-semibold text-gray-700">
//           Page not found
//         </h2>
//         <p className="mt-2 text-gray-500">
//           Sorry, we couldn’t find the page you’re looking for.
//         </p>

//         <div className="mt-6">
//           <Button asChild>
//             <Link href="/">Go Home</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }





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
				fill="#FFC107"
			/>
			<rect
				x="523.426"
				y="-89.5391"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 523.426 -89.5391)"
				fill="#2F80ED"
			/>
			<rect
				x="721.426"
				y="-21.5391"
				width="175"
				height="526"
				rx="87.5"
				transform="rotate(39.7614 721.426 -21.5391)"
				fill="#FF774D"
			/>
		</svg>
	);
};

const HttpCodes4 = () => {
	return (
		<section className="ezy__httpcodes4 light py-48 md:py-80 bg-white dark:bg-[#0b1727] text-[#04004d] dark:text-white relative overflow-hidden z-[1]">
			<Shape />

			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 lg:col-span-5 text-center lg:text-start flex flex-col h-full justify-center">
						<h2 className="text-[80px] leading-none font-bold md:text-[100px] mb-6">
							404
						</h2>
						<p className="text-xl leading-none opacity-80 md:text-[28px]">
							Something Missing ,Page not found!
						</p>
						<div className="lg:mt-5 mt-3">
							<Link href={"/"}
								type="button"
								className="py-3 px-9 text-lg font-medium bg-blue-600 hover:bg-opacity-90 duration-300 rounded text-white mt-6"
							>
								Back Home
							</Link>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-7">
						<img
							src="https://cdn.easyfrontend.com/pictures/httpcodes/four.png"
							alt=""
							className="max-w-full h-auto"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HttpCodes4