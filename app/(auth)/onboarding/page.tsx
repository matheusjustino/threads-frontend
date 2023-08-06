import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

// SERVICES
import { getUser } from '../../../services/user/get-user';

// COMPONENTS
import { AccountProfile } from '../../../components/forms/account-profile';

const OnboardingPage = async () => {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await getUser(user.id);
	if (userInfo?.onboarded) redirect('/');

	const userData = {
		id: user.id,
		objectId: userInfo.id,
		username: userInfo.username || user?.username || '',
		name: userInfo.name || user?.firstName || '',
		bio: userInfo.bio || '',
		image: userInfo.profilePhoto || user?.imageUrl,
	};

	return (
		<main className="mx-auto flex max-w-3xl min-h-screen flex-col justify-center p-10">
			<h1 className="head-text">Onboarding</h1>
			<p className="mt-3 text-base-regular text-light-2">
				Complete your profile now using Threads
			</p>

			<section className="mt-9 bg-dark-2 p-10">
				<AccountProfile user={userData} btnTitle="Continue" />
			</section>
		</main>
	);
};

export default OnboardingPage;
