// Model
import Adm from '../models/Adm';

class AdmController {
  async store(req, res) {
    const studentExists = await Adm.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res.status(400).json({
        error: 'Adm already exists',
      });
    }

    const { name, email } = await Adm.create(req.body);
    return res.json({ message: 'Adm criado com sucesso', name, email });
  }
}

export default new AdmController();
