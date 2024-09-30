import { Head, Link } from '@inertiajs/react';
import FilmList from '@/Components/FilmList';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/NavBar';

export default function Home(props) {

    const [animeList, setAnimeList] = useState([]);
    useEffect(() => {
        async function fetchAnime() {
            try {
                const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=8');
                const data = await response.json();
                setAnimeList(data.data); // Asumsi struktur respons API mengandung properti data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchAnime();
    }, []); // Empty dependency array to run the effect once on component mount


    return(
        <div>
            <Head title={props.title}/>
            <Navbar/>
            <FilmList animeList={animeList}/>
        </div>
    )
}
