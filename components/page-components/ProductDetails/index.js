import Reviews from './Reviews';
import RateDetails from './RateDetails';
import AboutProduct from './AboutProduct';
import ProductMainDetails from './ProductMainDetails';
import ProductImagesSection from "./ProductImagesSection";

const ProductDetails = ({ product }) => {
    return (
        <div className="mt-[73px]">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 lg:pr-6 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:max-h-[calc(100vh-73px)] lg:overflow-hidden">
                    <div className="h-full">
                        <ProductImagesSection images={product.images} title={product.title} />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 py-12 px-12 lg:h-[calc(100vh-73px)] lg:max-h-[calc(100vh-73px)] lg:overflow-y-auto">
                    <ProductMainDetails product={product} />

                    <hr className="my-5 border-t border-border" />

                    <RateDetails product={product} />

                    <hr className="my-8 border-t border-border" />

                    <AboutProduct product={product} />

                    <hr className="my-8 border-t border-border" />

                    <Reviews product={product} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
