import { Billboards } from '@/types';

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;

export const getBillboard = async (iShowedStatus: string): Promise<Billboards> => {
    try {
        const URL = `${BASE_URL}/billboard/findbillboard/${iShowedStatus}`;
        // console.log('BASE_URL:', BASE_URL);
        // const response = await axios.get(URL);
        const response = await fetch(URL, {
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 20 },
        });
        // console.error(response.headers);
        // if (!response.ok) {
        //     const errorText = await response.text();
        //     console.error('Failed to fetch billboard:', response.status, errorText);
        //     throw new Error(`Error ${response.status}: ${errorText}`);
        // }
        const billboard = await response.json();
        return billboard;
    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //   console.error('Axios error:', error.response?.data || error.message);
        //   throw new Error(error.response?.data?.message || error.message);
        // } else {
        //   console.error('Unexpected error:', error);
        //   throw new Error('An unexpected error occurred');
        // }
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
    }
};
