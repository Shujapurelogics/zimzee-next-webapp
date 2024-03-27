// import CoffeeHead from "@/components/CoffeeHead";
import { useRouter } from "next/router";
import React from "react";

const HouseDetail = ({ house, page_url }) => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>

            <a
                href="#"
                className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow m-auto mt-6"
            >
                <h5 className="mb-2 text-2xl font-bold text-gray-900">
                    {house.name}
                </h5>
                <p className="font-normal text-gray-700">
                    Founded by {house.founder}
                </p>
                <p className="font-normal text-gray-700">
                    House Animal: {house.animal}
                </p>
            </a>
        </>
    );
};

export default HouseDetail;

export const getServerSideProps = async (context) => {
    const { id } = context.query;

    const res = await fetch(
        `https://wizard-world-api.herokuapp.com/Houses/${id}`
    );
    const house = await res.json();
    console.log(house);
    // house.image = `${process.env.NEXT_PUBLIC_SITE_URL}/Hogwarts-Houses.jpg`;

    const page_url = context.req.headers.host + `/houses/${id}`;
    
    return { props: { house, page_url } };
};