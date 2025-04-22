'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const SearchBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== '') {
      router.push(`/products/product-list?name=${value}`);
    }
  };

  return (
    <form
      className='flex items-center justify-between gap-2 p-2 w-full'
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='relative flex w-full items-center'>
        <Search
          className='absolute left-3 text-gray-500 md:left-3 lg:left-4'
          size={16}
        />
        <Input
          type='search'
          name='name'
          placeholder={isMobile ? 'Cari produk' : 'Cari produk di sini'}
          className='flex-1 pl-10 pr-3 py-2 bg-transparent outline-none text-sm rounded-full md:pl-8 lg:pl-10'
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
