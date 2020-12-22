import Head from 'next/head'
import styles from '../styles/Home.module.css' 
import Link from 'next/link'; 
import { groq } from 'next-sanity';
import { getClient } from '../sanity';

const Home = ({ value }) => { 
  return (
    <div>
      <h1>Table of content</h1> 
     
      <a>
      <ul>
      {value.map((tit, index) => <li key={index}><Link href={`${encodeURIComponent(tit.slug.current)}`}><a>{tit.title}</a></Link></li>)} 
     </ul>
     </a>
  
    </div>
  );
};
export default Home 
 const query = groq`*[_type =='book']{
  title,
  slug,
  _id
 }` 
  // add getStaticProps() function
 export async function getStaticProps() { 
   const res = await getClient().fetch(query)
   //const res = await client.fetch(query);
   //console.log({value: Object.values(res)});
  return {
    props: {value: Object.values(res)}
  }
}


