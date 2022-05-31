import { db } from '~/lib/db.server';
import type {
	Reservation,
	ReservableDeposit,
	PurchaseUnit,
	Receipt,
} from '~/../prisma/node_modules/.prisma/client';
export type ReservationsResponse = {
	startDate: string;
	endDate: string | null;
	reservableId: string | null;
};

export const getReservations = async (): Promise<ReservationsResponse[]> => {
	const response = (await db.reservation.findMany({
		select: {
			startDate: true,
			endDate: true,
			reservableId: true,
		},
	})) as unknown as ReservationsResponse[];
	return response;
};

export type ReservationResponse =
	| (Reservation & {
			receipt:
				| (Receipt & {
						purchaseUnits: (PurchaseUnit & {
							deposit: ReservableDeposit | null;
						})[];
				  })
				| null;
	  })
	| null;

export const getReservation = async (
	id: string
): Promise<ReservationResponse> => {
	const response = await db.reservation.findUnique({
		where: {
			id,
		},
		include: {
			receipt: {
				include: {
					purchaseUnits: {
						include: {
							deposit: true,
						},
					},
				},
			},
		},
	});
	return response;
};