import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";

export default function MovieManagement(props) {
  const { delete: destroy } = useForm();

  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to delete the movie "${title}"?`)) {
      destroy(`/admin/movies/${id}`);
    }
  };

  return (
    <>
      <Head title={props.title} />

      {/* Tampilkan pesan flash jika ada */}
      {props.flash?.message && (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4">
          {props.flash.message}
        </div>
      )}

      <div className="flex justify-between p-4">
        <Link href="/admin/movies/create" className="bg-green-500 text-white px-4 py-2 rounded-md">
          Create Movie
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
                {props.movies.map((movie) => (
                    <div key={movie.movie_id} className="p-4 m-2 bg-white text-black shadow-xl">
                        <img
                            src={movie.poster && movie.poster !== 'https://placehold.co/600x400/png'
                                ? `storage/${movie.poster}`
                                : 'https://placehold.co/600x400/png'}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                        <h3 className="font-bold text-lg">{movie.title}</h3>
                        <p>{movie.description}</p>

            <p className="text-right">{movie.genre}</p>
            <p className="text-right">{movie.duration} Minutes</p>

            {/* Tombol Edit dan Delete */}
            <div className="flex justify-end mt-4">
              <Link
                href={`/admin/movies/${movie.movie_id}/edit`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(movie.movie_id, movie.title)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
