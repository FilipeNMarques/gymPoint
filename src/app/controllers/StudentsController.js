// Model
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res.status(400).json({
        error: 'Student already exists',
      });
    }

    const { id, name, email } = await Students.create(req.body);
    return res.json({ id, name, email });
  }
}

export default new StudentsController();