import getPlural from '@/helpers/utils/getPlural';

import SpecialFeatures from './SpecialFeatures';

const AboutProduct = ({ product }) => {
    const descriptions = [
        `Dimensions: ${product.dimensions.width}cm x ${product.dimensions.height}cm x ${product.dimensions.depth}cm`,
        `Weight: ${getPlural(product.weight, 'kg', 's')}`,
        `Minimum Order Quantity: ${getPlural(product.minimumOrderQuantity, 'item', 's')}`
    ];

    return (
        <section aria-label="Extra Details about Product">
            <SpecialFeatures product={product} />

            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About Product
            </h2>
            <ul className="list-disc">
                {
                    descriptions.map(d => (
                        <li key={d} className="mb-2">
                            {d}
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default AboutProduct;
