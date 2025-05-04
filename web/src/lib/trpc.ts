import { PUBLIC_API_URL, PUBLIC_SERVER_PUBLIC_KEY } from '$env/static/public';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { getIdToken } from "firebase/auth";

import { auth } from "./firebase";

import type { AppRouter } from "../../../server/src";

export const api = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: PUBLIC_API_URL,
			async headers() {
				if (!auth.currentUser) {
					return {};
				}

				const token = await getIdToken(auth.currentUser);
				return {
					Authorization: `Bearer ${token}`,
				};
			}
		})
	]
});
