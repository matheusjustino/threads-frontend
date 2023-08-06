// COMPONENTS
import { TopBar } from '../../components/shared/top-bar';
import { BottomBar } from '../../components/shared/bottom-bar';
import { LeftSideBar } from '../../components/shared/left-side-bar';
import { RightSideBar } from '../../components/shared/right-side-bar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
