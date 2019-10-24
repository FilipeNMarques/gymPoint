import { Router } from 'express';
// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionContrller';

const routes = new Router();

// Cadastrar um novo aluno
routes.post('/sessions', SessionController.store);
routes.post('/students', StudentsController.store);

routes.use(authMiddleware);
routes.put('/students', StudentsController.update);

export default routes;
