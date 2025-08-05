'use client'
// import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Container from '@/components/ui/container';
import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Image from 'next/image'


const certificates = [
    { title: 'ISO 9001:2015 dari TUV Rheinland - Germany', src: '/images/sertifikasi/sertifikat-1.webp' },
    { title: 'CPAKB dari Kementrian Kesehatan Republik Indonesia', src: '/images/sertifikasi/sertifikat-1.webp' },
    { title: 'Sertifikat IEC 60601 untuk Produk Elektrikal BIPMED', src: '/images/sertifikasi/sertifikat-1.webp' },
    { title: 'Sertifikat Welder Training', src: '/images/sertifikasi/sertifikat-1.webp' },
    { title: 'Sertifikat Arduino Software', src: '/images/sertifikasi/sertifikat-1.webp' },
    { title: 'Sertifikat Audit Mutu Internal', src: '/images/sertifikasi/sertifikat-1.webp' },
    { title: 'Sertifikat Quality Awareness', src: '/images/sertifikasi/sertifikat-1.webp' },
];

const Certificate = () => {
    // let [isOpen, setIsOpen] = useState(false)
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        // <Container>
        <div className='col-span-10 sm:col-span-8'>

            <div className="space-y-2 pb-2 px-4">
                <div className='top-1 mt-2 font-semibold text-xl text-center items-center justify-center text-customBlue mb-2'>
                    <h1>Sertifikasi Perusahaan</h1>
                    <hr className="h-px mx-auto bg-gray-400 border-0 invisible dark:bg-gray-700 sm:visible"></hr>
                </div>

                <p className="text-gray-600 text-justify text-sm sm:text-base">
                    Demi meningkatkan kualitas dan mutu produk, BIPMED tidak pernah berhenti untuk melakukan UPGRADE baik dari sisi
                    manajemen maupun dari sisi SDM. Berikut beberapa sertifikasi PT BUMI INDAH PUTRA baik dari sisi manajemen mutu maupun SDM:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {certificates.map((cert, index) => (
                        <div key={index}>
                            <h2 className="font-medium text-sm sm:text-base">
                                {index + 1}. {cert.title}
                            </h2>
                            <div
                                className="cursor-pointer pt-2"
                                onClick={() => setOpenIndex(index)}
                            >
                                <Image
                                    src={cert.src}
                                    alt={`sertifikat-${index + 1}`}
                                    height={60}
                                    width={60}
                                    className="h-60 sm:h-64 w-auto mx-auto object-cover rounded-md shadow-md"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {openIndex !== null && (
                    <Dialog open={openIndex !== null} onClose={() => setOpenIndex(null)} className="relative z-50">
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
                            <DialogPanel className="max-w-lg w-full bg-white rounded-lg p-4 shadow-lg">
                                <Image
                                    src={certificates[openIndex].src}
                                    alt={`sertifikat-${openIndex + 1}`}
                                    className="w-full object-contain rounded-md"
                                    height={180}
                                    width={180}
                                />
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </div>
        </div>
        //</Container >
    );
};

export default Certificate;
