'use client';
import React, { useEffect, useState, useRef } from 'react';
// import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { Billboards } from '@/types';

import './style.css';

interface BillboardProps {
  data: Billboards;
}

const BillboardPage: React.FC<BillboardProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  console.log("data = " + data)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePause = () => {
      if (videoElement && videoElement.paused) {
        videoElement.play();
      }
    };

    if (videoElement) {
      videoElement.addEventListener('pause', handlePause);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  return (
    <div className='h-[calc(100vh-7px)] overflow-hidden'>
      <div
        className='w-full h-full flex flex-col gap-16 xl:flex-row'
      // key={data.id}
      >
        {!data.isImage ? (
          <div className='w-full h-full relative '>
            <video
              ref={videoRef}
              src={data.contentURL}
              autoPlay
              muted
              loop
              className={`w-full h-full object-cover ${isMobile ? 'mobile-video' : ''}`}
            />
          </div>
        ) : (
          <div className='w-full h-full relative'>
            <Image
              src={data.contentURL}
              height={300}
              width={300}
              alt='Image'
              className='object-cover'
              style={{ width: '100%', height: '90%' }}
              sizes='(max-width: 140px) 100vw, (max-width: 168px) 50vw, 33vw'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BillboardPage;
