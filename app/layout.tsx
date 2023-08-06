import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Threads',
	description: 'Your best social network',
};

// PROVIDERS
import { AppProvider } from '../providers/app.provider';

// COMPONENTS
import { Toaster } from '../components/ui/toaster';

export default function RootLayout({
	children,
	...props
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-dark-1`}>
				<NextTopLoader color="#877EFF" />
				<ClerkProvider
					appearance={{
						baseTheme: dark,
					}}
				>
					<AppProvider pageProps={props}>{children}</AppProvider>
				</ClerkProvider>
				<Toaster />
			</body>
		</html>
	);
}
