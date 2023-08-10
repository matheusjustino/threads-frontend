import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

// SERVICES
import { getUser } from '../../services/user/get-user';

// COMPONENTS
import { TopBar } from '../../components/shared/top-bar';
import { BottomBar } from '../../components/shared/bottom-bar';
import { LeftSideBar } from '../../components/shared/left-side-bar';
import { RightSideBar } from '../../components/shared/right-side-bar';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const clerkUser = await currentUser();
	if (clerkUser?.id) {
		const user = await getUser(clerkUser.id);
		if (!user || !user.onboarded) {
			redirect('/onboarding');
		}
	}

	return (
		<div>
			<TopBar />
			<main className="flex flex-row">
				<LeftSideBar />

				<section className="main-container">
					<div className="w-full max-w-4xl">{children}</div>
				</section>

				<RightSideBar />
			</main>
			<BottomBar />
		</div>
	);
}
