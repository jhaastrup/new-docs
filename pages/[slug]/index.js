import Link from 'next/link'; 
import { groq } from 'next-sanity';
import { getClient } from '../../sanity';
import { useRouter } from 'next/router'


const Page = ({ data }) => {
    //console.log("dd",data);
    const router = useRouter()
    const { slug } = router.query
   

    //console.log(typeof(data));
    //const { section = '' } = data
    
      return (
        <ul>
          {data.map((item)=> <li><Link href={`/${slug}/${item.slug.current}`}>{item.title}</Link></li>)}
        </ul> 
  
  
     
      ) 
  }
  
  
  export default Page;
  
  export async function getServerSideProps({ params }) { 
  
    
  
      const { slug } = params;
      if (slug == "favicon.ico"){
        return{props:{}}
      } 
     // console.log(slug)
      const query = groq`*[_type =='book' && slug.current == "${slug}"]{
       ...
     }
     `
    // console.log(query); 
      //const res = await client.fetch(query); 
      const res = await getClient().fetch(query);
      
      //console.log(res[0]._id);
  
      const new_query = groq`*[_type =='chapter'&& book._ref == '${res[0]._id}' ]{
        ...
      }` 
  
      const new_res = await getClient().fetch(new_query);
        
     return {
       props: { data: new_res }
     }
   }