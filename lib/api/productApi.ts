import { ProductForm, ProductDesc, Product } from "@/types";
import { uploadToCloudinary } from "../utils/cloudinaryHandler";


const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;

// const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL2}`;
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        Authorization: token || "",
    };
};

export const createProduct = async (formData: ProductForm): Promise<number> => {
    const res = await fetch(`${BASE_URL}/product/admin/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Gagal membuat produk");

    const { data } = await res.json();
    return data.id;
};

export const uploadImages = async (
    productId: number,
    imageFiles: File[],
    primaryIndex: number | null
): Promise<void> => {
    for (let i = 0; i < imageFiles.length; i++) {
        const imageURL = await uploadToCloudinary(imageFiles[i]);

        const res = await fetch(`${BASE_URL}/product/admin/createImageProduct`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                imageURL,
                isPrimary: i === primaryIndex,
                iStatus: "Active",
                product_id: productId,
            }),
        });

        if (!res.ok) throw new Error(`Gagal upload gambar ke-${i + 1}`);
    }
};

export const uploadDescriptions = async (
    productId: number,
    formDataDesc: ProductDesc
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

interface GetProductsProps {
    category_id: number;
}

export const getProducts = async ({
    category_id,
}: GetProductsProps): Promise<Product[]> => {
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
interface Query {
    slug?: string;
    // descriptions?: string;
}
///product/findbyslug/
export const getProductBySlug = async (query: Query): Promise<Product> => {
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

        return product['data'];
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
}: getProductsByNameProps): Promise<Product[]> => {
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

