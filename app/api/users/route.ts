import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest) {
	const { pathname } = await request.json();
	if (pathname === '/profile/edit') {
		revalidatePath(pathname);
	}

	return NextResponse.json('ok');
}
