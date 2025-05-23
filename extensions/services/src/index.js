import { defineEndpoint } from '@directus/extensions-sdk';

export default defineEndpoint((router, { services, exceptions }) => {
  const { ItemsService } = services;


  // GET route to fetch all services
  router.get('/', async (req, res, next) => {
    try {
      const servicesService = new ItemsService('services', {
        schema: req.schema,
        accountability: req.accountability,
      });

      const serviceItems = await servicesService.readByQuery({ limit: -1 });
      res.json(serviceItems);
    } catch (error) {
      return  0;
    }
  });
});