'use client'
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import Container from '@/components/ui/container';
import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

const Certificate = () => {
    let [isOpen, setIsOpen] = useState(false)
    return (
        // <Container>
        <div className='col-span-10 sm:col-span-8'>

            <div className='space-y-2 pb-2'>
                <div className='top-1 mt-2 font-semibold text-xl text-center items-center justify-center text-customBlue mb-2'>
                    <h1>Sertifikasi Perusahaan</h1>
                    <hr className="h-px mx-auto bg-gray-400 border-0 invisible dark:bg-gray-700 sm:visible"></hr>
                </div>
                {/* <div className='relative w-full h-full flex items-center justify-center rounded-lg drop-shadow-md mb-32'>
                    <Image
                        src={'/images/visi-misi.webp'}
                        height={192} // Or any height closer to the image's actual height
                        width={288} // Or any width closer tor any width closer to the image's actual width
                        alt='Image'
                        className='object-contain rounded-lg'
                        style={{ width: '85%', height: 'auto' }} // Display image at full width and adjust height automatically
                        sizes='100vw' // Adjusts image size according to the viewport width
                        loading='eager'
                    />
                </div> */}

                <div className='w-full flex items-center justify-center text-customBlue'>
                    <div className='mt-3 px-4 md:px-10 lg:px-8 xl:px-8 2xl:px-8 text-base md:text-md text-gray-500 text-justify'>
                        Demi meningkatkan kualitas dan mutu produk, BIPMED tidak pernah berhenti untuk melakukan UPGRADE baik dari
                        sisi managemen maupun dari sisi SDM. Berikut beberapa sertifikasi PT BUMI INDAH PUTRA baik dari sisi
                        managemen mutu maupun SDM :
                        <div className='mt-4 text-justify'>
                            <div className="grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
                                <div className="h-full rounded-lg  ">
                                    1. ISO 9001:2015 dari TUV Rheinland - Germany
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>
                                <div className="h-full rounded-lg ">
                                    2. CPAKB dari Kementrian Kesehatan Republik Indonesia
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>
                                <div className="h-full rounded-lg ">
                                    3. Sertifikat IEC 60601 untuk Produk Elektrikal BIPMED
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>
                                <div className="h-full rounded-lg ">
                                    4. Sertifikat Welder Training
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>
                                <div className="h-full rounded-lg ">
                                    5. Sertifikat Arduino Software
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>
                                <div className="h-full rounded-lg ">
                                    6. Sertifikat Audit Mutu Internal
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>
                                <div className="h-full rounded-lg ">
                                    7. Sertifikat Quality Awareness
                                    <div
                                        className="relative cursor-pointer flex-col pt-2 "
                                    >

                                        <img
                                            alt="nature"
                                            onClick={() => setIsOpen(true)}
                                            className="h-96 w-auto object-cover object-center pl-8 "
                                            // src="/images/sertifikasi/sertifikat-1.webp"
                                            src="/images/sertifikasi/sertifikat-1.webp"

                                        />
                                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                                <DialogPanel className="max-w-lg space-y-2 border bg-white">
                                                    <img
                                                        alt="nature"
                                                        onClick={() => setIsOpen(true)}
                                                        className=" object-cover object-center"
                                                        // src="/images/sertifikasi/sertifikat-1.webp"
                                                        src="/images/sertifikasi/sertifikat-1.webp"

                                                    />
                                                </DialogPanel>
                                            </div>
                                        </Dialog>


                                    </div>
                                </div>


                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
        //</Container >
    );
};

export default Certificate;
