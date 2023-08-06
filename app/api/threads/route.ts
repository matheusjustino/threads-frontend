import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
	const { pathname } = await request.json();
	revalidatePath(pathname);

	return NextResponse.json('ok');
}
