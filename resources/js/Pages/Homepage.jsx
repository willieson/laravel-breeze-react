import React from "react";
import { Link, Head } from "@inertiajs/react";

export default function Homepage(props){

    return (
        <>
            <Head title={props.title}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {props.movies ? props.movies.map((data, i) => {
                return(
                    <div key={i} className="p-4 m-2 bg-white text-black shadow-xl">

                        <img src={data.poster} />
                        <h3 className="font-bold text-lg">{data.title}</h3>
                        <p>{data.description}</p>


                        <p className="text-right">{data.genre}</p>
                        <p className="text-right">{data.duration} Minutes</p>

                    </div>
                )
            }): "Belum ada Film"}
            </div>
            </>
    )
}
