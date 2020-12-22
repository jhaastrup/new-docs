import Link from 'next/link'; 
import { groq } from 'next-sanity';
import { useRouter } from 'next/router'
import { getClient } from '../../../sanity';


const Page = ({ data }) => {
    const router = useRouter()
    const { slug,chapter } = router.query

   //console.log("what to expect",data.map((item)=>item.section));
console.log(data);
     const fab =  data.map((item)=>item.section) 
     //console.log(fab)
     //console.log('what i need',fab.map((dd)=>dd.name))
    //console.log(typeof(data));
    //const { section = '' } = data
    
      return (
        <div> 
          
         {data.map((item)=> 
        <div>
        <h1>{item.title}</h1>
        </div>
        )}
    </div>
     
      ) 
  }
  
  
  export default Page;
  
  export async function getServerSideProps({ params }) { 
  
    
  
      const { chapter } = params;
     /*  if (chapter == "favicon.ico"){
        return{props:{}}
      }  */
     console.log(chapter)
      const query = groq`*[_type =='chapter'&& slug.current == '${chapter}']{
          ...
        }
          
     `
    // console.log(query); 
      //const res = await client.fetch(query); 
      const res = await getClient().fetch(query);
      //console.log("what i want:",res[0]._id)

      const new_query = groq`*[_type =='page' && chapter._ref == '${res[0]._id}']{
        ...
      }
       ` 
      
      const new_res = await getClient().fetch(new_query); 
     // console.log("result meant to come back",new_res);
        
     return {
       props: { data: new_res }
     }
   }