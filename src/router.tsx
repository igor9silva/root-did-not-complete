import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary';
import { Loading } from '~/components/Loading';
import { NotFound } from '~/components/NotFound';
import { ThemeProvider } from '~/components/ThemeProvider';
import { routeTree } from './routeTree.gen';

export function createRouter() {
	//
	const queryClient = new QueryClient();

	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			scrollRestoration: true,
			defaultViewTransition: true,
			defaultPreload: 'intent',
			defaultPreloadDelay: 50, // 50ms is the default, just making it explicit here
			defaultPreloadStaleTime: 0, // 0 so we don't cache at the loader level, leaving it all to TanStack Query
			defaultPendingComponent: Loading,
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: () => <NotFound />,
			context: { queryClient },
			Wrap: ({ children }) => {
				return <ThemeProvider>{children}</ThemeProvider>;
			},
		}),
		queryClient,
	);

	return router;
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
