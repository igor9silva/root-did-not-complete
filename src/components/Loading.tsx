import { TextShimmer } from '~/components/text-shimmer';
import { cn } from '~/lib/utils';

export function Loading({ className }: { className?: string }) {
	return (
		<div className={cn('flex flex-col items-center justify-center h-full w-full gap-4', className)}>
			<TextShimmer text="Loading..." />
		</div>
	);
}
