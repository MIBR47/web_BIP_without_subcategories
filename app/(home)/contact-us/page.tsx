// app/contact/page.tsx
import React from "react";

export default function ContactPage() {
    return (
        <div className="bg-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                {/* Form Card */}
                <div className="bg-white shadow-lg rounded-lg p-8 flex-1">
                    <h2 className="text-2xl font-bold text-customBlue mb-4">LEAVE US YOUR INFO</h2>
                    <hr className="mb-4" />
                    <p className="mb-4 text-gray-700">
                        Mohon untuk mengisi informasi Anda dengan tepat dan sesuai dengan yang sebenarnya, agar balasan email Anda bisa sesuai dengan yang Anda harapkan.
                    </p>
                    <p className="mb-4 text-gray-700">
                        Waktu respons bervariasi sesuai dengan banyaknya data yang diminta, akan kami usahakan dalam 1x24 jam sudah mendapatkan balasan.
                    </p>
                    <p className="mb-6 text-gray-700">
                        Kami memastikan bahwa data diri Anda akan aman dan hanya digunakan untuk kepentingan PT BUMI INDAH PUTRA.
                    </p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name*" className="w-full p-3 border border-gray-300 bg-gray-100 rounded" />
                        <input type="email" placeholder="Email*" className="w-full p-3 border border-gray-300 bg-gray-100 rounded" />
                        <input type="tel" placeholder="Telephone*" className="w-full p-3 border border-gray-300 bg-gray-100 rounded" />
                        <textarea placeholder="Message*" rows={5} className="w-full p-3 border border-gray-300 bg-gray-100 rounded"></textarea>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Kirim Pesan</button>
                    </form>
                </div>

                {/* Location Card */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3">
                    <h3 className="text-xl font-bold text-customBlue mb-4">LOCATION</h3>
                    <hr className="mb-4" />
                    <p className="text-gray-700 mb-2">Jalan Alex Bangun Cipendawa Baru</p>
                    <p className="text-gray-700 mb-2">
                        RT 003 / RW 002 Bantar Gebang,<br />
                        Kota Bekasi, Jawa Barat 17151
                    </p>
                    <p className="flex items-center gap-2 mt-4 text-gray-700">
                        <span>📧</span> 021 - 8273 1750
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                        <span>📞</span> 021 - 8273 1806
                    </p>

                    <h3 className="text-xl font-bold text-customBlue mt-6 mb-4">MAP</h3>
                    <hr className="mb-4" />
                    <div className="w-full h-64">
                        <iframe
                            src="https://www.google.com/maps?q=PT.%20BUMI%20INDAH%20PUTRA&output=embed"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            style={{ border: 0 }}
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
