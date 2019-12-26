import { Router } from 'express';
// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionContrller';
import PlansController from './app/controllers/PlansController';

const routes = new Router();

// Register new student
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// Students
routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);
// Plans
routes.get('/plans', PlansController.index);
routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);

export default routes;
