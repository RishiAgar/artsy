import Header from './Header';
import ReviewList from './ReviewList';

const Reviews = ({ product }) => {
    return (
        <section aria-label="Product ratings and reviews">
            <Header product={product} />

            <div className="mt-8 space-y-5">
                <ReviewList reviews={product.reviews || []} />
            </div>
        </section>
    );
};

export default Reviews;
