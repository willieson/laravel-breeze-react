import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

const ViewMovie = ({ movies }) => {
    const [alertMessage, setAlertMessage] = useState(null); // State untuk alert message

    const handleDelete = async (movieId) => {
        if (confirm('Apakah Anda yakin ingin menghapus movie ini?')) {
            try {
                await axios.delete(`/movies/${movieId}`, {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'), // Mengambil CSRF token
                    },
                });
                setAlertMessage('Movie berhasil dihapus');
                // Refresh page atau fetch data ulang
                window.location.reload();
            } catch (error) {
                console.error('There was an error!', error);
                setAlertMessage('Terjadi kesalahan saat menghapus movie.');
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Daftar Movies
                </h2>
            }
        >
            <Head title="View Movies" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {alertMessage && (
                        <div role="alert" className="alert alert-success mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{alertMessage}</span>
                        </div>
                    )}
                    <div className="mb-4">
                        <a href="/dashboard" className="btn btn-primary">Buat Movie Baru</a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {movies.map((movie) => (
                            <div key={movie.movie_id} className="card bg-base-100 w-full shadow-xl">
                                <figure>
                                    <img src={`/storage/${movie.poster}`} alt={movie.title} className="h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {movie.title}
                                    </h2>
                                    <p>{movie.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{movie.genre}</div>
                                        <div className="badge badge-outline">{movie.duration} Minutes</div>
                                        </div>

<div className='card-actions justify-end'>
                                            <a href={`/admin/movies/edit/${movie.movie_id}`} className="btn btn-warning">Edit</a>
                                        <button onClick={() => handleDelete(movie.movie_id)} className="btn btn-secondary">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ViewMovie;
