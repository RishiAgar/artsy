import {
    ShieldCheck,
    Truck,
    CircleDot,
    RotateCcw,
} from "lucide-react";

const FEATURES = [
    { key: 'warrantyInformation', icon: ShieldCheck },
    { key: 'shippingInformation', icon: Truck },
    { key: 'availabilityStatus', icon: CircleDot },
    { key: 'returnPolicy', icon: RotateCcw },
];

const SpecialFeatures = ({ product }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-8">
            {
                FEATURES.map(feature => !product[feature.key] ? null : (
                    <div
                        key={feature.key}
                        className="flex flex-1 flex-col items-center gap-2 max-w-[86px]"
                    >
                        <div className="rounded-full p-2 bg-gray-100">
                            <feature.icon
                                strokeWidth={1}
                                className="h-6 w-6 text-gray-500"
                            />
                        </div>
                        <div className="text-sm text-center text-gray-500">
                            {product[feature.key]}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SpecialFeatures;
