import React from "react";
import {  Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import MovieList from "@/Components/Homepage/MovieList";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props){
    return (
        <>
            <Head title={props.title}/>
            <Navbar user={props.auth.user}/>
            <div className="flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4">
            <MovieList movies={props.movies.data}/>
            </div>
            <div className="flex justify-center items-center">
                <Paginator meta={props.movies.meta}/>
            </div>
            </>
    )
}
