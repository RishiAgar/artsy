import serverGet from '@/helpers/utils/serverGet';

const DEFAULT_SKIP = 24;

export const revalidate = 300; 

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page  = Number(searchParams.get("page") || 1);
        const limit  = Number(searchParams.get("limit") || DEFAULT_SKIP);

        const data = await serverGet({
            path: "/products",
            params: {
                skip: (page - 1 ) * limit,
                limit: limit,
            },
            options: {
                cache: "no-store",
            },
        });

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message || "Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
            },
        });
    }
}
