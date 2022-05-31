import type {
	Reservable,
	ReservableDeposit,
	ReservableTerm,
	AddressStateType,
} from '~/../prisma/node_modules/.prisma/client';
import type { CarouselImage } from '~/components/Carousel';
import { db } from '~/lib/db.server';

export const getImages = async (): Promise<CarouselImage[]> => {
	const response = (await db.reservableImage.findMany()) as CarouselImage[];
	return response;
};
export const getImage = async (id?: string): Promise<CarouselImage> => {
	const response = (await db.reservableImage.findUnique({
		where: {
			id: id,
		},
	})) as CarouselImage;

	return response;
};
