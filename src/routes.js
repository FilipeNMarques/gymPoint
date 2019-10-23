import { Router } from 'express';

// Controllers
import StudentsController from './app/controllers/StudentsController';

const routes = new Router();

// Cadastrar um novo aluno
routes.post('/students', StudentsController.store);

export default routes;
