import { toast } from 'sonner';
import { useMDX } from './useMDX';

import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Loading } from '~/components/Loading';
import { cn } from '~/lib/utils';

const components = {
	// AddBudgetButton,
	// AddCustomBudgetButton,
	// Balance,
	// Separator,
	// Button,
	// Card,
	// CardContent,
	// CardDescription,
	// CardFooter,
	// CardHeader,
	// CardTitle,
	// TwoColumn,
	// TaskConversation,
	// TaskDetailAndSubstasks,
	// TaskDetailAndChat,
	// TaskDetail,
	// Grid,
	// QuickSeek,
	// ListAndDetail,
	// TaskDetailAndConversation,
	// Inbox,
	// Task,
	// ScrollArea,
	// EasterEgg,
	// TopUpCard,
	// ActionTest,
};

export default function MDX({
	text, //
	onClickFix,
	errorFallback,
	className,
	shouldRenderComponents = true,
}: {
	text: string;
	onClickFix?: (e: React.MouseEvent) => void;
	errorFallback?: React.ReactNode;
	className?: string;
	shouldRenderComponents?: boolean;
}) {
	//
	const { Component, error, isPending } = useMDX(text, shouldRenderComponents);

	if (isPending) return <Loading />;
	if (error) return errorFallback ?? <MDXError text={text} error={error} onClickFix={onClickFix} />;

	if (!Component) throw new Error('No component found');

	return (
		<div className={cn('whitespace-normal [&>*]:break-normal [&>*]:hyphens-none h-full', className)}>
			<ErrorBoundary
				fallbackRender={({ error }) => <MDXError text={text} error={error} onClickFix={onClickFix} />}
			>
				<Component
					components={{
						a: ({ children, href }) => (
							<a
								href={href} //
								className="text-blue-500 hover:underline break-all overflow-wrap-anywhere"
								target="_blank"
								rel="noopener"
							>
								{children}
							</a>
						),
						code: function CodeComponent({ className, children, ...props }) {
							//
							const language = extractLanguage(className);

							// check if the code is inline (claude randomly added that, thanks!)
							if (typeof children !== 'string' || children.includes('\n') === false) {
								return (
									<span
										className={cn(
											'bg-muted text-foreground rounded-sm px-1 py-0.5 font-mono text-sm',
											className,
										)}
										{...props}
									>
										{children}
									</span>
								);
							}

							return (
								<pre
									className={cn(
										'bg-muted text-foreground rounded-sm px-1 py-0.5 font-mono text-sm',
										className,
									)}
								>
									{children}
								</pre>
							);
						},
						pre: function PreComponent({ children }) {
							return <>{children}</>;
						},
						blockquote: ({ children }) => (
							<blockquote className="pl-4 border-l-4 border-muted-foreground/20 italic my-4 text-muted-foreground">
								{children}
							</blockquote>
						),
						table: ({ children }) => <table className="w-full border-collapse my-4">{children}</table>,
						td: ({ children }) => <td className="border border-border p-2">{children}</td>,
						th: ({ children }) => (
							<th className="border border-border p-2 font-bold text-primary">{children}</th>
						),
						tr: ({ children }) => <tr className="even:bg-muted/50">{children}</tr>,
						thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
						tbody: ({ children }) => <tbody className="">{children}</tbody>,
						img: ({ src, alt }) => (
							<img src={src} alt={alt} className="rounded-xl max-w-full h-auto my-4" />
						),
						ul: ({ children }) => <ul className="ml-8 list-disc space-y-1 my-2">{children}</ul>,
						ol: ({ children }) => <ol className="ml-8 list-decimal space-y-1 my-2">{children}</ol>,
						li: ({ children }) => <li className="leading-normal">{children}</li>,
						hr: () => <hr className="my-4 border-t border-border" />,
						h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-2">{children}</h1>,
						h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-2">{children}</h2>,
						h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
						h4: ({ children }) => <h4 className="text-base font-bold mt-3 mb-2">{children}</h4>,
						h5: ({ children }) => <h5 className="text-sm font-bold mt-2 mb-1">{children}</h5>,
						h6: ({ children }) => <h6 className="text-xs font-bold mt-2 mb-1">{children}</h6>,
						p: ({ children }) => <p className="my-2 md:my-1 leading-relaxed">{children}</p>,
						strong: ({ children }) => <span className="font-bold">{children}</span>,
						em: ({ children }) => <span className="italic">{children}</span>,
						del: ({ children }) => <span className="line-through">{children}</span>,
						...components,
					}}
				/>
			</ErrorBoundary>
		</div>
	);
}

function MDXError({
	text, //
	error,
	onClickFix,
}: {
	text: string;
	error: Error;
	onClickFix?: (e: React.MouseEvent) => void;
}) {
	//
	const [shouldShowRaw, setShouldShowRaw] = React.useState(false);

	const handleErrorClick = (e: React.MouseEvent<HTMLPreElement>) => {
		e.stopPropagation();
		navigator.clipboard.writeText(error.message);
		toast('Error copied to clipboard.');
	};

	const handleFixClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (onClickFix) return onClickFix(e);
		toast.error('Not implemented yet.');
	};

	if (shouldShowRaw)
		return (
			<div>
				<pre className="whitespace-pre-wrap">{text}</pre>
				<br />
				<button onClick={() => setShouldShowRaw(false)}>Try rendering again</button>
			</div>
		);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col">
				<p>Error loading content:</p>
				<pre onClick={handleErrorClick} className="text-destructive whitespace-pre-wrap">
					{error.message}
				</pre>
			</div>
			<div className="flex flex-row gap-1">
				<button onClick={handleFixClick}>Fix it</button>
				<button onClick={() => setShouldShowRaw(true)}>Show raw</button>
			</div>
		</div>
	);
}

function extractLanguage(className?: string): string {
	if (!className) return 'plaintext';
	const match = className.match(/language-(\w+)/);
	return match ? match[1] : 'plaintext';
}
