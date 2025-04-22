// import axios from 'axios';
// import { PriceList } from '@/types';

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/pricelists`;

// interface getPriceListProps {
//   iShowedStatus: boolean;
  
// }

// const getPriceList = async ({ iShowedStatus }: getPriceListProps): Promise<PriceList[]> => {
//   try {
//     const response = await axios.get(URL, {
//       params: {
//         iShowedStatus,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error((error as any).message);
//   }
// };
// export default getPriceList;
