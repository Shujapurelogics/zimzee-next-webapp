import React, { Component } from 'react';
import PublicShared from "../../components/PublicShare/Shared/Shared";
// import './style.css';
import { useRouter } from 'next/router'
import Head from 'next/head';
// import Router from "next/router";

function App({house}) {
    const router = useRouter();
    const { id } = router.query;
    // if(house.statusCode = 400){
        // window.location.href = "https://app.zimzee.com/";
        // router.push("/");
    // }
    // console.log(house.data.title,"house ----dsfdsfds------");
    return (
        <>
        <Head>
            <title>{house.data.title}</title>
            <meta name="title" content={house.data.title}/>
            <meta name="description" content={`Your easy solution to save, organize, Recall and Collaborate EVERYTHING important to you.  Save an ad, a video clip, full page screenshot, text, Youtube, Facebook`} />
            <meta
              property="og:image"
              content={house.data.content.imageUrl[0].url}
            />
        </Head>
        <PublicShared shared={house} sharedId={id}/>
        </>
        ); 
}

export default App;

export const getServerSideProps = async (context) => {
    const { id } = context.query;
    // console.log(context.query,"id server side");
    const res = await fetch(
        `https://prdapi.zimzee.com/api/cards/public-shared/${id}`
    );
    const house = await res.json();
    console.log(house,"house");
    // house.image = `${process.env.NEXT_PUBLIC_SITE_URL}/Hogwarts-Houses.jpg`;
  
    // const page_url = context.req.headers.host + `/houses/${id}`;
    
    return { props: { house } };
  };
