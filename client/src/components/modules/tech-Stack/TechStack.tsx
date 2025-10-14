import Image from 'next/image';
import React from 'react';

interface TechStackCardProps {
  name: string;
  imageSrc: string;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ name, imageSrc }) => {
  return (
    <div className="group bg-gray-200  rounded-xl p-6 flex flex-col items-center justify-center shadow-md transition duration-300 hover:shadow-[0_0_30px_#f97316] hover:bg-gray-100">
      <Image
        src={imageSrc}
        width={200}
        height={200}
        alt={name}
        className="w-16 h-16 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
      />
      <p className="text-black font-semibold text-sm">{name}</p>
    </div>
  );
};

export default TechStackCard;
