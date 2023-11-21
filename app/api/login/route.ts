import { signJwtAccessToken } from '@/app/utils/core/jwt';
import prisma from '@/app/utils/core/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
	username: string;
	password: string;
}

export async function POST(request: Request) {
	const body: RequestBody = await request.json();
	const user = await prisma.appUsers.findFirst({
		where: {
			email: body.username,
		},
	});

	if (user && (await bcrypt.compare(body.password, user.password))) {
		const { password, ...userWithoutPass } = user;
		const accessToken = signJwtAccessToken(userWithoutPass);
		const result = { ...userWithoutPass, accessToken };

		return new Response(JSON.stringify(result));
	} else return new Response(JSON.stringify(null));
}