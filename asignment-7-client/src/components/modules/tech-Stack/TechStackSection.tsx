import React from 'react';
import TechStackCard from './TechStack';


const techStacks = [
  { name: 'AWS', imageSrc: '/aws.png' },
  { name: 'Javascript', imageSrc: '/js.png' },
  { name: 'Prisma', imageSrc: '/prisma.png' },
  { name: 'PostgresSQL', imageSrc: '/postgres.png' },
  { name: 'Typescript', imageSrc: '/tsc.png' },
  { name: 'GraphQl', imageSrc: '/graphql.png' },
  { name: 'Mongoose', imageSrc: '/mongoose.png' },
  { name: 'Node Js', imageSrc: '/node-js.webp' },
  { name: 'React JS', imageSrc: '/icons8-react.gif' },
  { name: 'Next Js', imageSrc: '/next.png' },
  { name: 'React-Redux', imageSrc: '/redux.png' },
  { name: 'My-SQL', imageSrc: '/mysql.png' },
];

const TechStackSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-300 to-white py-14 px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        My Tech Stack
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {techStacks.map((tech) => (
          <TechStackCard key={tech.name} name={tech.name} imageSrc={tech.imageSrc} />
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;



