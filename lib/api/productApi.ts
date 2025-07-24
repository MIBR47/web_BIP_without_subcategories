import { ProductRequest, ProductDescRequest, ProductResponse, UpdateProductRequest, ProductDescResponse } from '@/types';
import { uploadToCloudinary } from "../utils/cloudinaryHandler";
// import { updateProduct } from '@/lib/api/productApi';


const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;

// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        Authorization: token || "",
    };
};

export const createProduct = async (formData: ProductRequest): Promise<number> => {
    const res = await fetch(`${BASE_URL}/product/admin/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
    });


    if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed:", res.status, errorText);
        throw new Error("Gagal membuat produk: " + errorText);
    }

    const { data } = await res.json();
    return data.id;
};

// export const uploadImages = async (
//     productId: number,
//     imageFiles: File[],
//     primaryIndex: number | null
// ): Promise<void> => {
//     for (let i = 0; i < imageFiles.length; i++) {
//         const imageURL = await uploadToCloudinary(imageFiles[i]);

//         const res = await fetch(`${BASE_URL}/product/admin/createImageProduct`, {
//             method: "POST",
//             headers: getAuthHeaders(),
//             body: JSON.stringify({
//                 imageURL,
//                 isPrimary: i === primaryIndex,
//                 iStatus: "Active",
//                 product_id: productId,
//             }),
//         });

//         if (!res.ok) throw new Error(`Gagal upload gambar ke-${i + 1}`);
//     }
// };
export const uploadImages = async (
    productId: number,
    imageFiles: File[],
    primaryIndex: number | null
): Promise<void> => {
    for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append("file", imageFiles[i]);
        formData.append("product_id", productId.toString());
        formData.append("isPrimary", (i === primaryIndex).toString());
        formData.append("iStatus", "Active");

        const res = await fetch(`${BASE_URL}/product/admin/createImageProduct`, {
            method: "POST",
            headers: {
                // ❌ Jangan set Content-Type secara manual!
                // ✅ fetch akan otomatis set multipart boundary
                Authorization: getAuthHeaders().Authorization,
            },
            body: formData,
        });

        if (!res.ok) throw new Error(`Gagal upload gambar ke-${i + 1}`);
    }
};


export const uploadDescriptions = async (
    productId: number,
    formDataDesc: ProductDescRequest
): Promise<void> => {
    const res = await fetch(`${BASE_URL}/product/admin/createDescProduct`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            ...formDataDesc,
            product_id: productId,
        }),
    });

    if (!res.ok) throw new Error("Gagal upload deskripsi produk");
};



export const updateProduct = async (formData: UpdateProductRequest): Promise<ProductResponse> => {
    const res = await fetch(`${BASE_URL}/product/admin/update`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            ...formData,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to update category:', errorText);
        throw new Error('Update failed');
    }

    const data = await res.json();
    return data.data; // Sesuai response API-mu
};

export const updateProductDesc = async (id: number, formDataDesc: ProductDescRequest) => {
    const res = await fetch(`${BASE_URL}/product/admin/updateDescProduct`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
            id,
            ...formDataDesc,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to update category:', errorText);
        throw new Error('Update failed');
    }

    const data = await res.json();
    // return data.data; // Sesuai response API-mu
};

// export const updateProductImage = async (
//     productId: number,
//     imageList: {
//         id: number | null; // null untuk gambar baru
//         file?: File;        // hanya wajib jika id === null (gambar baru)
//         isPrimary: boolean;
//     }[]
// ): Promise<void> => {
//     for (let { id, file, isPrimary } of imageList) {
//         const formData = new FormData();
//         formData.append("product_id", productId.toString());
//         formData.append("isPrimary", isPrimary.toString());
//         formData.append("iStatus", "Active");

//         if (file) formData.append("file", file);
//         if (id !== null) formData.append("id", id.toString());

//         const url = id === null
//             ? `${BASE_URL}/product/admin/updateImageProduct` // bisa sama dengan create, tergantung backend
//             : `${BASE_URL}/product/admin/updateImageProduct`;

//         const res = await fetch(url, {
//             method: "PATCH",
//             headers: {
//                 Authorization: getAuthHeaders().Authorization,
//             },
//             body: formData,
//         });

//         if (!res.ok) {
//             throw new Error(`${id ? "Gagal update" : "Gagal upload"} gambar ${id ?? "(baru)"}`);
//         }
//     }
// };


export const updateProductImage = async (id: number, data: { isPrimary: boolean; iStatus: string; product_id: number }) => {
    const res = await fetch(`${BASE_URL}/product/admin/updateImageProduct/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal update gambar");
    return res.json();
};

export const deleteProductImageById = async (id: number) => {
    const res = await fetch(`${BASE_URL}/product/admin/deleteImageProduct/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: getAuthHeaders().Authorization
        }
    });
    if (!res.ok) throw new Error("Gagal menghapus gambar");
};


interface GetProductsProps {
    category_id: number;
}
export const getProducts = async ({
    category_id,
}: GetProductsProps): Promise<ProductResponse[]> => {
    try {
        const URL = `${BASE_URL}/product/findbyid/${category_id}`;
        // console.log(category_id)

        const res = await fetch(URL);
        // console.log(res)
        const data = await res.json();
        // console.log(data['data']);

        return data['data'];
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

export const getAllProducts = async (page: number = 1, limit: number = 20) => {
    try {
        const URL = `${BASE_URL}/product/findall?page=${page}&limit=${limit}`;
        // console.log(category_id)

        const res = await fetch(URL);
        // console.log(res)
        const data = await res.json();
        // console.log(data['data']);

        return data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

export const getAllProductsAdmin = async (page: number = 1, limit: number = 20) => {
    try {
        const URL = `${BASE_URL}/product/admin/findall?page=${page}&limit=${limit}`;
        // console.log(category_id)

        const res = await fetch(URL);
        // console.log(res)
        const data = await res.json();
        // console.log(data['data']);

        return data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};
interface Query {
    slug?: string;
    // descriptions?: string;
}
///product/findbyslug/
export const getProductBySlug = async (query: Query): Promise<ProductResponse> => {
    let url = `${BASE_URL}/product/findbyslug`;
    if (query.slug?.trim()) {
        url = `${url}/${query.slug.trim()}`;
    }

    try {
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            console.error(`Error fetching product: ${res.statusText}`);
            throw new Error(`Error fetching product: ${res.statusText}`);
        }

        const product = await res.json();
        // console.log('berhasil')
        return product.data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

interface getProductsByNameProps {
    search: string;
}

export const getProductsByName = async ({
    search,
}: getProductsByNameProps): Promise<ProductResponse[]> => {
    try {
        const URL = `${BASE_URL}/product/findbyname/${search}`;

        const res = await fetch(URL, { cache: 'no-store' });

        const product = await res.json();
        return product.data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
};

