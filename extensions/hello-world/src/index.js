export default {
	id: 'hello-world',
	handler: (router) => {
	  router.get('/', (req, res) => res.send('Hello, World!'));
	},
  };