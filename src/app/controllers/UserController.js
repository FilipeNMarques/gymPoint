// Model
import user from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await user.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({
        error: 'user already exists',
      });
    }

    const { id, name, email } = await user.create(req.body);
    return res.status(201).json({
      message: 'user criado com sucesso',
      id,
      name,
      email,
    });
  }
}

export default new UserController();
