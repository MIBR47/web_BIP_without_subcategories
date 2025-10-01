'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setAlert({ type: 'warning', message: 'Username dan Password wajib diisi!' });
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // 🛠️ kirim username, bukan email
            });

            const login = await res.json();

            if (!res.ok) {
                throw new Error(login.message || 'Username atau Password salah');
            }

            localStorage.setItem('authToken', login.data.token);

            router.push('/admin/dashboard');
        } catch (err: any) {
            setAlert({ type: 'error', message: err.message });
        }
    };

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ type: '', message: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
            {/* Background Image + Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center backdrop-blur-md"
                style={{
                    backgroundImage: "url('/images/about-company.webp')",
                }}
            ></div>

            {/* Overlay warna biru transparan */}
            <div className="absolute inset-0"></div>

            {/* Form login */}
            <div className="relative z-10 w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} noValidate className="w-full">
                    <h2 className="text-3xl font-bold mb-6 text-center text-[#035ea2]">Login Admin</h2>

                    {/* Alert Section */}
                    {alert.message && (
                        <div
                            className={`mb-4 p-3 rounded text-center text-sm transition-all ${alert.type === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                                }`}
                        >
                            {alert.message}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#035ea2]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#035ea2]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#035ea2] hover:bg-[#024a82] text-white font-bold py-3 px-4 rounded transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600 mt-4">
                        Belum punya akun?{' '}
                        <Link href="/auth/register" className="text-[#85bc49] hover:underline font-semibold">
                            Daftar
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
