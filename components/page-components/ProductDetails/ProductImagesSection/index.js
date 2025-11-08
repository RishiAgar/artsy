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
        <Carousel className="w-full">
            <CarouselContent>
                {images.map(x => (
                    <CarouselItem key={x}>
                        <div className="relative aspect-[1/1] w-full overflow-hidden bg-muted">
                            <Image
                                src={x}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {
                !moreThanOne ? null : (
                    <>
                        <CarouselPrevious className="ml-[80px]" />
                        <CarouselNext className="mr-[80px]" />
                    </>
                )
            }
        </Carousel>
    );
}

export default ProductImagesSection;
