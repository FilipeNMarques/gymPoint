// Data validator
import * as Yup from 'yup';
// Model
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res.status(400).json({
        error: 'This email of Student already exists',
      });
    }
    const { id, name, email, age, weight, height } = await Students.create(
      req.body
    );
    return res.json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validations fails',
      });
    }

    const { id } = req.params;
    const { email } = req.body;

    const students = await Students.findByPk(id);

    if (!students) {
      return res.status(400).json({
        error: 'The student does not exist',
      });
    }

    if (email !== students.email) {
      const studentExists = await Students.findOne({
        where: { email: req.body.email },
      });

      if (studentExists) {
        return res.status(400).json({
          error: 'Student already exists',
        });
      }
    }

    const { name, age, weight, height } = await students.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
