'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registrasi gagal');
            }

            router.push('/admin/auth/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#035ea2] overflow-hidden">
            {/* Blur background */}
            <div className="absolute inset-0 bg-[#035ea2] backdrop-blur-lg"></div>

            {/* Register form */}
            <div className="relative z-10 w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="w-full">
                    <h2 className="text-3xl font-bold mb-6 text-center text-[#035ea2]">Daftar Admin</h2>

                    {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nama</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#035ea2]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#035ea2]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#035ea2]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#85bc49] hover:bg-[#6aa737] text-white font-bold py-3 px-4 rounded transition"
                    >
                        Daftar
                    </button>

                    <p className="text-center text-gray-600 mt-4">
                        Sudah punya akun?{' '}
                        <Link href="/auth/login" className="text-[#035ea2] hover:underline font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
