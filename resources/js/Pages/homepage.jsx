import { Head, Link } from '@inertiajs/react';

export default function Homepage(props) {
    return(
        <div className='flex justify-center items-center min-h-screen bg-stone-300 text-white text-2xl'>
            <Head title={props.title}/>
            <h1>{props.description}</h1>
        </div>
    )
}
