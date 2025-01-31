import type { LoaderFunction } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import Product from '~/components/blocks/product';

import type { ReservableResponse } from '~/lib/reservables.db.server';
import { getReservable } from '~/lib/reservables.db.server';
import {
	getCancellationCost,
	getDisplayDateRange,
	normalizeDate,
} from '~/utils';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { getUserByRequestToken } from '~/lib/auth.server';
import type { ReservationResponse } from '~/lib/reservations.db.server';
import { getReservation } from '~/lib/reservations.db.server';
import ReservationBreakdown from '~/components/ReservationBreakdown';
import Modal from '~/components/Modal';
import { useEffect } from 'react';
import { useMountEffect } from '~/lib/react/hooks';

type BookingsData = {
	reservations: ReservationResponse[];
	reservables: Record<string, ReservableResponse>;
};

export let loader: LoaderFunction = async ({ request }) => {
	const { user } = await getUserByRequestToken(request);
	console.log('user :>> ', user);
	if (user) {
		const reservablIds = Array.from(
			new Set(
				user.reservations.map((res) => res.reservableId).filter((id) => !!id)
			)
		) as string[];
		const reservables = Object.fromEntries(
			new Map(
				await Promise.all(
					reservablIds.map(
						(id) =>
							new Promise<[string, ReservableResponse]>(async (resolve) => {
								resolve([id, await getReservable(id)]);
							})
					)
				)
			)
		);
		const reservations = await Promise.all(
			user.reservations.map((res) => getReservation(res.id))
		);
		return json({
			reservations,
			reservables,
		});
	} else {
		return redirect('/account?sendto=/account/bookings');
	}
};

export default function Bookings() {
	let data = useLoaderData<BookingsData>();
	useMountEffect(() => {
		console.log('location.hash :>> ', location.hash);
		if (location.hash) {
			const div = document.querySelector(location.hash.toLowerCase());
			if (div) {
				div.scrollIntoView({ block: 'center', inline: 'nearest' });
			}
		}
	});

	data.reservations = data.reservations.sort((a, b) => {
		return (
			(normalizeDate(a?.startDate)?.getTime() || 0) -
			(normalizeDate(b.startDate)?.getTime() || 0)
		);
	});

	return (
		<div className="flex min-h-screen flex-col gap-4">
			{data.reservations.map((reservation, i) => {
				const reservable = data.reservables[reservation?.reservableId!]!;
				return (
					<div id={reservation?.id?.toLowerCase()} key={i}>
						<Product
							header={
								<div className="card mb-4 place-content-center bg-primary p-4 text-center text-lg font-semibold uppercase text-primary-content">
									<p className="font-bold">Reservation #{reservation?.id}</p>
									<p className="font-bold">
										{getDisplayDateRange(
											reservation!.startDate,
											reservation?.endDate,
											''
										)}
									</p>
								</div>
							}
							information={
								<div className="">
									{reservable.terms?.map((term, i) => (
										<div key={i} className="form-control text-base-content">
											<label className="label cursor-pointer">
												<span className="label-text text-base-content">
													<label
														htmlFor={`${term.name}${i}`}
														className="cursor-pointer underline"
													>
														{term.name}
													</label>
												</span>
											</label>
											{term.description && (
												<Modal id={`${term.name}${i}`}>
													<span className="uppercase text-primary-content underline">
														{term.name || ''}
													</span>
													<div className="mt-4 pl-8 text-primary-content">
														<DocumentRenderer document={term.description} />
													</div>
												</Modal>
											)}
										</div>
									))}
									{reservable.cancellationCost &&
									reservable.cancellationCost.cost ? (
										<div className="form-control text-base-content">
											<span className="label-text text-base-content">
												Contact us if you wish to cancel this reservation ($
												{getCancellationCost(
													reservable,
													reservation?.receipt?.reservationCost!
												)}
												)
											</span>
										</div>
									) : (
										''
									)}
								</div>
							}
							bg="base-300"
							simple
							reservable={reservable}
						>
							<div className="flex flex-col gap-4 ">
								<DocumentRenderer document={reservable.reservationNote} />
								<p className="font-semibold underline">Pickup Location</p>
								<p>{reservable.pickup?.name}</p>
								<p>{reservable.pickup?.address?.address}</p>
								<p>
									{reservable.pickup?.address?.city},{' '}
									{reservable.pickup?.address?.state}{' '}
									{reservable.pickup?.address?.zipCode}
								</p>
								{reservable.pickup?.address?.longitude &&
									reservable.pickup?.address?.latitude && (
										<p>
											{reservable.pickup?.address?.latitude} x{' '}
											{reservable.pickup?.address?.longitude}{' '}
										</p>
									)}
								<ReservationBreakdown reservation={reservation} />
							</div>
						</Product>
					</div>
				);
			})}
		</div>
	);
}
