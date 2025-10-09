// interface IParams{
//     params:string
// }
// export default async function SingleBlog({params}:IParams) {

//     console.log(await params)

//   return (
//     <div>
      
//     </div>
//   )
// }



import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SingleBlog = () => {
  const router = useRouter();
  const { params } = router.query;

  useEffect(() => {
    if (params) {
      console.log(params); // এখানে params চেক করুন
    }
  }, [params]);

  return (
    <div>
      <h1>ব্লগ আইডি: {params}</h1>
    </div>
  );
};

export default SingleBlog;
