import type { PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import type { Post } from '~/../prisma/node_modules/.prisma/client';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import classNames from 'classnames';
import type { CarouselImage } from './Carousel';
import { getImageUrl } from '~/utils';

type Props = {
	post: Post;
	image?: CarouselImage;
};

export default function PostComp({
	post,
	image,
	children,
}: PropsWithChildren<Props>): ReactElement {
	const [imgLoaded, setImgLoaded] = useState(false);
	const img = image?.image_sizesMeta;
	const maxWidth = Math.min(img?.full?.width || 0, img?.lg?.width || 0);

	return (
		<div>
			{post.status === 'published' ? (
				<div
					className={classNames({
						'card bg-base-100 shadow-xl': true,
						'lg:card-side': image,
					})}
				>
					{image && img ? (
						<figure>
							<picture
								className={classNames({
									visible: imgLoaded,
									hidden: !imgLoaded,
								})}
							>
								<source
									media={`(min-width:${img.md.width}px)`}
									srcSet={getImageUrl('', img.lg, maxWidth)}
								/>
								<source
									media={`(min-width:${img.sm.width}px)`}
									srcSet={getImageUrl('', img.md, maxWidth)}
								/>
								<img
									onLoad={() => setImgLoaded(true)}
									src={getImageUrl('', img.sm, maxWidth)}
									alt={image.alt || image.name}
									width={img.full.width}
									height={img.full.height}
								/>
							</picture>
							{img.base64 && img.base64.base64Data && (
								<img
									className={classNames({
										hidden: imgLoaded,
									})}
									loading="lazy"
									src={img.base64.base64Data}
									alt={image.alt || image.name}
									width={img.full.width}
									height={img.full.height}
								/>
							)}
						</figure>
					) : (
						''
					)}
					<div className="card-body">
						<h2 className="card-title">{post.title}</h2>
						{post.content ? (
							<DocumentRenderer document={post.content as any} />
						) : (
							''
						)}
						{children}
						{/* <div className="card-actions justify-end">
							<button className="btn btn-primary">Listen</button>
						</div> */}
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}
