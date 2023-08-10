import { NextPage } from 'next';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// UTILS
import { getUser } from '../../../services/user/get-user';

// COMPONENTS
import { PostThread } from '../../../components/forms/post-thread';

const CreateThreadPage: NextPage = async () => {
	const user = await currentUser();
	if (!user) {
		redirect('/');
		return null;
	}

	// const userInfo = await getUser(user.id);
	// if (!userInfo?.onboarded) {
	// 	redirect('/onboarding');
	// }

	return (
		<>
			<h1 className="head-text">Create Thread</h1>

			<PostThread userId={user.id} />
		</>
	);
};

export default CreateThreadPage;
