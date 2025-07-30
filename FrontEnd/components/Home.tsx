import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
const data = [
    "https://unsplash.com/photos/a-silver-car-hovers-above-a-grassy-field-E_EHWMqdEao",
    "https://images.unsplash.com/photo-1627866965574-81d35f482103?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    "https://unsplash.com/photos/a-picturesque-street-with-charming-houses-C5UVKTWI-l4",
]
function Home() {
	return (
		<div className="flex justify-center items-center h-screen">
			<Carousel className="w-full max-w-5xl flex justify-center items-center">
				<CarouselContent>
					{data.map((imageUrl, index) => (
						<CarouselItem key={index}>
							<div className="p-1">
								<div
									className="relative aspect-video w-full rounded-lg overflow-hidden"
									
								>
									<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center w-full">
										<span className="text-white text-4xl font-semibold">
											Slide {index + 1}
										</span>
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="text-white bg-black/50 hover:bg-black/70" />
				<CarouselNext className="text-white bg-black/50 hover:bg-black/70" />
			</Carousel>
		</div>
	);
}

export default Home;
