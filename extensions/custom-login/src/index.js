import { defineEndpoint } from '@directus/extensions-sdk';
import { createDirectus, authentication, rest, login } from '@directus/sdk';

export default defineEndpoint((router, { services, env, logger }) => {
  const { ItemsService } = services;

  // Initialize Directus SDK client
  const client = createDirectus('http://localhost:8055') // Use your Directus URL
    .with(authentication('json'))
    .with(rest());

  router.post('/', async (req, res) => {
    try {
      const { mobile_number, password } = req.body;

      // Log request input
      logger.info(`Request body: mobile_number=${mobile_number}, password=[hidden]`);

      // Validate input
      if (!mobile_number || !password) {
        return res.status(400).json({
          errors: [{ message: 'Mobile number and password are required.' }],
        });
      }

      // Log schema and accountability
      logger.info(`Schema exists: ${!!req.schema}`);
      logger.info(`Accountability: ${JSON.stringify(req.accountability || 'Missing', null, 2)}`);

      // Initialize ItemsService for customer_profile
      const profileService = new ItemsService('profile', {
        schema: req.schema,
        accountability: {
          role: null,
          admin: true,
          user: null,
          permissions: [],
        },
      });

      // Find customer_profile by mobile_number
      const profiles = await profileService.readByQuery({
        filter: { mobile_number: { _eq: mobile_number } },
        fields: ['user.id', 'user.email','user.first_name','user.last_name', 'mobile_number' , 'user.role.name' , 'unit', 'id' ],
        limit: 1,
      });

      // Log profiles with more detail
      logger.info(`Profiles found: ${profiles ? profiles.length : 0}`);
      logger.info(`Profiles data: ${JSON.stringify(profiles, null, 2)}`);

      if (!profiles || profiles.length === 0) {
        return res.status(401).json({
          errors: [{ message: 'Invalid mobile number.' }],
        });
      }

      const profile = profiles[0];
      logger.info(`Profile: ${JSON.stringify(profile, null, 2)}`);

      const userId = profile.user?.id;
      if (!userId) {
        return res.status(401).json({
          errors: [{ message: 'No associated user found.' }],
        });
      }

      // Log before authentication attempt
      logger.info(`Attempting login for email: ${profile.user.email}`);

      // Use SDK to login
      const authResponse = await client.request(
        login(profile.user.email, password, { mode: 'json' })
      );

      // Return the token and user info
      res.json({
        access_token: authResponse.access_token,
        expires: authResponse.expires,
        refresh_token: authResponse.refresh_token,
        profile: profile, 

      });
    } catch (error) {
      logger.error(`Error in custom-login: ${error.message}`, error.stack);
      return res.status(500).json({
        errors: [{ message: error.message || 'An error occurred during login.' }],
      });
    }
  });
});