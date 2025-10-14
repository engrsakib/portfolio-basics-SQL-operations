"use client";

import React, { useState } from "react";

const ServiceItem = ({ image, title, description, onImageClick }: any) => (
  <div
    className="relative bg-center bg-no-repeat bg-cover rounded-[20px] flex flex-col justify-center items-center h-64 cursor-pointer group"
    style={{ backgroundImage: `url(${image})` }}
    onClick={() => onImageClick(image)}
  >
    {/* Overlay Content */}
    <div className="absolute inset-0 rounded-[20px] bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
      <span className="text-white text-lg font-semibold bg-indigo-600 px-4 py-2 rounded-lg shadow-md">
        View Image
      </span>
    </div>
  </div>
);

const Certificate = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4">
        {/* Title Section */}
        <div className="grid grid-cols-12 mb-6 md:mb-12">
          <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center">
            <h2 className="text-3xl md:text-[45px] font-bold mb-6">Certificates</h2>
            <p className="text-lg opacity-80">
              Hover any certificate to preview, click to enlarge in full screen.
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-12 gap-6 text-center">
         
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ServiceItem
              image="https://scontent.frjh7-1.fna.fbcdn.net/v/t39.30808-6/488447846_975834958019343_5163210679315779534_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeETDAGfb43_12p92mtGRgnsKMcOmL52ZXQoxw6YvnZldHQBvuDiZ3pbhNDU9bEEj4SebW0VY6_cxd5mE3Tq-Ow9&_nc_ohc=yxKQY6xJJZYQ7kNvwEQzKyG&_nc_oc=Adnu3Vu-V-mHgQP1KJ2-XGzxLsuqRRMhPe9695GhUCMN6_ftRyqfZZddlLCFWf5U-jRyp2r-PkgrP4nrRJ942uAR&_nc_zt=23&_nc_ht=scontent.frjh7-1.fna&_nc_gid=swAYHoiVL47HRCmVUPektg&oh=00_AfYSk3Tz64F2ewKsj58JbSh3T-LoMake6r2lk_PQqIuvHg&oe=68E45FB8"
              title="Certificate 1"
              description="This is my first certificate"
              onImageClick={handleImageClick}
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ServiceItem
              image="https://i.postimg.cc/DfCsN4Hz/551844249-4225290447749390-8784599074855748199-n.png"
              title="Certificate 2"
              description="This is my second certificate"
              onImageClick={handleImageClick}
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ServiceItem
              image="https://i.postimg.cc/HxdZ68KS/481779864-953637426905763-3180465919249724596-n.jpg"
              title="Certificate 3"
              description="This is my third certificate"
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full p-4">
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Certificate"
              className="rounded-lg shadow-lg w-full object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
