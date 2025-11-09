import Image from "next/image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const ProductImagesSection = ({ title, images }) => {
    const moreThanOne = images.length > 1;

    return (
        <div className="flex h-full items-center justify-center px-4 py-8 sm:px-10 lg:px-16">
            <Carousel className="w-full max-w-[520px]">
                <CarouselContent>
                    {images.map(x => (
                        <CarouselItem key={x} className="group">
                            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted">
                                <Image
                                    src={x}
                                    alt={title}
                                    fill
                                    className="object-contain p-6 sm:p-10 transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {
                    !moreThanOne ? null : (
                        <>
                            <CarouselPrevious className="!left-6 md:!left-12" />
                            <CarouselNext className="!right-6 md:!right-12" />
                        </>
                    )
                }
            </Carousel>
        </div>
    );
}

export default ProductImagesSection;
