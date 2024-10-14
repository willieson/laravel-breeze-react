import ScheduleList from '@/Components/Homepage/ScheduleList';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function EditMovie({ movie }) {
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [genre, setGenre] = useState(movie.genre);
    const [duration, setDuration] = useState(movie.duration);
    const [alertMessage, setAlertMessage] = useState(null);
    const [poster, setPoster] = useState(null);
    const [previousPoster, setPreviousPoster] = useState(movie.poster);
    const [thumbnail, setThumbnail] = useState(`/storage/${movie.poster}`); // State untuk thumbnail
    const [schedules, setSchedules] = useState([]); // State untuk menyimpan jadwal

    useEffect(() => {
        setPreviousPoster(movie.poster);
        fetchSchedules(); // Ambil jadwal saat komponen di-mount
    }, [movie]);

    // Fungsi untuk mengambil jadwal dari server
    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`/schedules?movie_id=${movie.movie_id}`); // Ganti dengan endpoint yang sesuai
            setSchedules(response.data); // Simpan data jadwal ke state
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Buat FormData untuk mengupload file
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('duration', parseInt(duration));

        // Cek apakah poster baru diupload
        if (poster) {
            formData.append('poster', poster);
        }

        try {
            const response = await axios.post(`/movies/${movie.movie_id}`, formData, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAlertMessage(response.data.message);
            // Refresh thumbnail setelah berhasil update
            if (poster) {
                setThumbnail(URL.createObjectURL(poster)); // Update thumbnail ke file yang diupload
            }
        } catch (error) {
            console.error('There was an error!', error);
            setAlertMessage('Terjadi kesalahan, silakan coba lagi.');
        }
    };

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        setPoster(file);
        if (file) {
            // Menampilkan thumbnail baru saat file diupload
            setThumbnail(URL.createObjectURL(file));
        } else {
            // Jika tidak ada file, kembalikan ke poster sebelumnya
            setThumbnail(`/storage/${previousPoster}`);
        }
    };

    // Mengarahkan kembali ke halaman admin/movies setelah update berhasil
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                window.location.href = '/admin/movies'; // Arahkan ke halaman admin/movies
            }, 2000); // 2 detik sebelum redirect

            return () => clearTimeout(timer); // Bersihkan timer saat unmount
        }
    }, [alertMessage]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Movie
                </h2>
            }
        >
            <Head title="Edit Movie" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900">
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
                        <div className="flex mb-4 gap-4">
                            {/* Menampilkan thumbnail poster */}
                            <div><img
                                src={thumbnail} // Gunakan state thumbnail
                                alt={title}
                                className="w-48 h-48 object-cover mb-4"
                            /></div>

                            <div>
                                <h1 className="text-xl font-semibold">Schedule List</h1>
                                <ScheduleList schedules={schedules} /> {/* Pass schedules to ScheduleList */}
                            </div>
                        </div>
                        <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder="Description" className="m-2 input input-bordered w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input type="text" placeholder="Genre" className="m-2 input input-bordered w-full" value={genre} onChange={(e) => setGenre(e.target.value)} />
                        <input type="text" placeholder="Duration" className="m-2 input input-bordered w-full" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <input type="file" className="m-2" onChange={handlePosterChange} />
                        <button className="m-2 btn btn-primary" onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
