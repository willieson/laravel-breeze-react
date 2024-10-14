const isMovies = (movies) => {
    return movies.map((data, i) => {
        return (
            <div key={i} className="card bg-base-100 w-full lg:w-96 shadow-xl">
                <figure>
                    {/* Menggunakan URL gambar dari data film */}
                    <img
                       src={`/storage/${data.poster}`}// Ganti dengan URL poster dari data
                        alt={data.title} // Gunakan judul film sebagai alt text
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                    </h2>
                    <p>{data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{data.genre}</div>
                        <div className="badge badge-outline">{data.duration} Minutes</div>
                    </div>
                    <div className="card-actions justify-start">
                <a href={`schedule/${data.movie_id}`} className="btn btn-primary">Showtime</a>
                    </div>
                </div>
            </div>
        );
    });
};

const noMovies = () => {
    return (
        <div>Tidak Ada Movie</div>
    );
};

const MovieList = ({ movies }) => {
    return !movies || movies.length === 0 ? noMovies() : isMovies(movies);
};

export default MovieList;
