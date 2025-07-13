import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { z } from 'zod';
import { BasicError } from '~/components/BasicError';
import { Loading } from '~/components/Loading';
import MDX from '~/components/mdx';

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
	return new Promise<string>((resolve) => {
		setTimeout(() => {
			resolve(`
				# Dashboard Overview

Welcome to your **personal dashboard**! Here's what's happening today.

---

## Quick Stats

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h3 className="text-lg font-semibold text-blue-900">Total Users</h3>
    <p className="text-3xl font-bold text-blue-600 mt-2">1,247</p>
    <p className="text-sm text-blue-500 mt-1">↗ 12% from last month</p>
  </div>
  
  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
    <h3 className="text-lg font-semibold text-green-900">Revenue</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">$24,580</p>
    <p className="text-sm text-green-500 mt-1">↗ 8% from last month</p>
  </div>
  
  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
    <h3 className="text-lg font-semibold text-purple-900">Active Projects</h3>
    <p className="text-3xl font-bold text-purple-600 mt-2">23</p>
    <p className="text-sm text-purple-500 mt-1">↗ 3 new this week</p>
  </div>
</div>

## Recent Activity

<div className="bg-white border border-gray-200 rounded-lg shadow-sm my-6">
  <div className="px-6 py-4 border-b border-gray-200">
    <h3 className="text-lg font-medium text-gray-900">Latest Updates</h3>
  </div>
  
  <div className="divide-y divide-gray-200">
    <div className="px-6 py-4 flex items-center space-x-4">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white font-medium">JD</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">John Doe completed task "Update homepage"</p>
        <p className="text-xs text-gray-500">2 hours ago</p>
      </div>
    </div>
    
    <div className="px-6 py-4 flex items-center space-x-4">
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white font-medium">SM</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">Sarah Miller uploaded new design files</p>
        <p className="text-xs text-gray-500">4 hours ago</p>
      </div>
    </div>
    
    <div className="px-6 py-4 flex items-center space-x-4">
      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
        <span className="text-white font-medium">MJ</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">Mike Johnson created new project "Mobile App"</p>
        <p className="text-xs text-gray-500">6 hours ago</p>
      </div>
    </div>
  </div>
</div>

## Task Management

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">To Do</h3>
    </div>
    <div className="p-6 space-y-3">
      <div className="flex items-center space-x-3">
        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
        <span className="text-sm text-gray-700">Review pull request #247</span>
      </div>
      <div className="flex items-center space-x-3">
        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
        <span className="text-sm text-gray-700">Update documentation</span>
      </div>
      <div className="flex items-center space-x-3">
        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
        <span className="text-sm text-gray-700">Schedule team meeting</span>
      </div>
    </div>
  </div>
  
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
    </div>
    <div className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">API Integration</span>
        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">75%</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">UI Redesign</span>
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">45%</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Testing Suite</span>
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">90%</span>
      </div>
    </div>
  </div>
</div>

## Code Example

Here's a sample function that demonstrates our new API:

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      lastLogin: new Date(userData.lastLogin)
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}
\`\`\`

## Quick Actions

<div className="flex flex-wrap gap-3 my-6">
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
    Create New Task
  </button>
  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
    Generate Report
  </button>
  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
    Invite Team Member
  </button>
  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
    View Settings
  </button>
</div>

## Important Notes

> **Note**: This dashboard is updated in real-time. All data shown reflects the current state of your projects and team activity.

### Key Features:
- **Real-time updates** - See changes as they happen
- **Responsive design** - Works on all devices
- **Team collaboration** - Built for teams of any size
- **Analytics** - Track your progress over time

---

*Last updated: Just now*`);
		}, 2000);
	});
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

	return <MDX text={data} shouldRenderComponents={true} className="p-4" />;
}
