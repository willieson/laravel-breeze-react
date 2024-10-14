import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState, useRef } from 'react';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [duration, setDuration] = useState('');
    const [poster, setPoster] = useState(null); // State untuk file poster
    const [alertMessage, setAlertMessage] = useState(null); // State untuk alert message
    const [thumbnail, setThumbnail] = useState(null); // State untuk thumbnail
    const fileInputRef = useRef(null); // Membuat ref untuk input file

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPoster(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result); // Simpan data URL untuk thumbnail
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah refresh halaman

        const formData = new FormData(); // Membuat objek FormData untuk mengirim data dengan file
        formData.append('title', title);
        formData.append('description', description);
        formData.append('genre', genre);
        formData.append('duration', parseInt(duration)); // Pastikan duration adalah angka
        if (poster) {
            formData.append('poster', poster); // Tambahkan file poster ke FormData
        }

        try {
            const response = await axios.post('/movies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Pastikan konten tipe adalah multipart/form-data
                },
            });
            setAlertMessage(response.data.message); // Menangkap pesan dari server

            // Reset input setelah berhasil
            setTitle('');
            setDescription('');
            setGenre('');
            setDuration('');
            setPoster(null);
            setThumbnail(null); // Mengosongkan thumbnail

            // Kosongkan input file
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Mengosongkan nilai input file
            }
        } catch (error) {
            console.error('There was an error!', error);
            setAlertMessage('Terjadi kesalahan, silakan coba lagi.'); // Menampilkan pesan kesalahan
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Movies
                </h2>
            }
        >
            <Head title="Dashboard" />

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
                        <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <input type="text" placeholder="Description" className="m-2 input input-bordered w-full" onChange={(e) => setDescription(e.target.value)} value={description} />
                        <input type="text" placeholder="Genre" className="m-2 input input-bordered w-full" onChange={(e) => setGenre(e.target.value)} value={genre} />
                        <input type="text" placeholder="Duration" className="m-2 input input-bordered w-full" onChange={(e) => setDuration(e.target.value)} value={duration} />

                        {/* Input untuk upload poster dengan ref */}
                        <input type="file" accept="image/*" className="m-2 input input-bordered w-full" onChange={handlePosterChange} ref={fileInputRef} />

                        {/* Tampilkan thumbnail jika ada */}
                        {thumbnail && (
                            <div className="m-2">
                                <img src={thumbnail} alt="Thumbnail" className="w-32 h-32 object-cover" />
                            </div>
                        )}

                        <button className='m-2 btn btn-primary' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
