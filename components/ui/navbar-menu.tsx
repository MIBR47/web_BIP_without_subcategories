'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import './styles.css';

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className='relative'>
      <motion.p
        transition={{ duration: 0.3 }}
        className='cursor-pointer  hover:underline  dark:text-white text-customBlue'
        // className='cursor-pointer hover:opacity-[0.9] dark:text-white text-customBlue'
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className='absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-2'>
              <motion.div
                transition={transition}
                layoutId='active' // layoutId ensures smooth animation
                className='bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl'
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className='w-max h-full p-4'
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className='relative rounded-full border  border-transparent hover:bg-customeGreen dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 '
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link
      href={href}
      className='flex space-x-10 hover:bg-slate-200 hover:rounded-md'
    >
      <Image
        src={src}
        width={50}
        height={40}
        alt={title}
        className='flex-shrink-0 rounded-md shadow-2xl'
      />
      <div className='text-customBlue mb-5 items-center text-center justify-center'>
        {/* <h4 className='text-xl font-bold mb-1 text-black dark:text-white'> */}
        {title}
        {/* </h4> */}
        <p className='text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300'>
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className='text-customBlue dark:text-neutral-200 hover:text-white hover:bg:customBlue hover:bg-customBlue dark:hover:text-white px-4 py-1 rounded-md'
    >
      {children}
    </Link>
  );
};
