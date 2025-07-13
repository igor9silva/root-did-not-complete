import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { z } from 'zod';
import { BasicError } from '~/components/BasicError';
import { Loading } from '~/components/Loading';

const searchSchema = z.object({
	q: z.string().optional(),
	isBudgetDrawerOpen: z.boolean().optional(),
	debug: z.boolean().optional(),
});

export const Route = createFileRoute('/$')({
	component: MDXPage,
	errorComponent: () => <BasicError text="Not found (or something else went wrong)." />,
	validateSearch: searchSchema,
});

async function load() {
	const response = await fetch('https://api.github.com/users/octocat');
	const data = await response.json();
	return JSON.stringify(data, null, 2);
	// return new Promise<string>((resolve) => {
	// 	setTimeout(() => {
	// 		resolve(JSON.stringify(data, null, 2));
	// 	}, 2000);
	// });
}

function MDXPage() {
	//

	return (
		<Suspense fallback={<Loading />}>
			<Content />
		</Suspense>
	);
	// const params = useSplatParams();

	// const slug = params.slug || 'list';
	// const { composition } = useComposition(slug);

	// const taskId = params.taskId || composition.defaultTaskId || 'inbox';

	// track('$', {
	// 	slug,
	// 	taskId,
	// });

	// return <MDX text={composition.body} shouldRenderComponents={true} />;
}

function Content() {
	//
	const { data } = useSuspenseQuery({
		queryKey: ['test'],
		queryFn: load,
	});

	return data;
}
