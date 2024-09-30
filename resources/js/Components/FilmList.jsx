const FilmList = ({animeList}) => {
    return (
        <>
        <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Paling Populer</h1>
        <a className="text-xl underline hover:text-indigo-500 transition-all" href="/populer">Lihat semua</a>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 px-4">
            {animeList.map((anime) => (
                <div key={anime.mal_id} className="shadow-xl">
                    <a href={anime.mal_id}>
                    <img src={anime.images.webp.image_url} alt={anime.title} className="w-full max-h-80 object-cover" />
                    <h3 className="font-bold md:text-xl text-md  p-4">{anime.title}</h3>
                    </a>
                </div>
            ))}
        </div>
        </>
    )
}

export default FilmList
