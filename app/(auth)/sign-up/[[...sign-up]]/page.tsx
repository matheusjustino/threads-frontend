import { FC } from 'react';
import { SignUp } from '@clerk/nextjs';

const SignUpPage: FC = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<SignUp />
		</div>
	);
};

export default SignUpPage;
