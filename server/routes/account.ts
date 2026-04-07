import { Router } from 'express';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';
import { getProfile, upsertProfile, buildUserProfile } from '../lib/profiles.js';
import { HttpError, sendError } from '../lib/errors.js';

const router = Router();

router.get('/api/user/profile', requireAuth, async (request: AuthedRequest, response) => {
  try {
    const user = request.authUser;

    if (!user) {
      throw new HttpError(401, 'Not signed in.');
    }

    const profile = (await getProfile(user.id)) || (await upsertProfile(user));

    response.json(buildUserProfile(user, profile));
  } catch (error) {
    sendError(response, error);
  }
});

export default router;
