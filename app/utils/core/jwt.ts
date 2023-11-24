import jwt, { JwtPayload } from 'jsonwebtoken';
import { DEFAULT_SIGN_OPTION } from '@/config/core/app_settings';

export function signJwtAccessToken(
	payload: JwtPayload,
	options: {
		expiresIn?: string | number;
	} = DEFAULT_SIGN_OPTION,
) {
	const secret_key = process.env.SECRET_KEY;
	const token = jwt.sign(payload, secret_key!, options);
	return token;
}

export function verifyJwt(token: string) {
	try {
		const secret_key = process.env.SECRET_KEY;
		const decoded = jwt.verify(token, secret_key!);
		return decoded as JwtPayload;
	} catch (error) {
		return null;
	}
}
