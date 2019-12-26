// Data validator
import * as Yup from 'yup';
// Model
import Plans from '../models/Plans';

class PlansController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { pageLimit = 20 } = req.query;

    const plans = await Plans.findAndCountAll({
      order: ['id'],
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json({ plans });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const planExists = await Plans.findOne({
      where: { title: req.body.title },
    });
    if (planExists) {
      return res.status(400).json({
        error: 'This plan already exists',
      });
    }
    const { id, title, duration, price } = await Plans.create(req.body);
    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .integer(),
      price: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validations fails',
      });
    }
    const { id } = req.params;
    const { title, duration, price } = req.body;

    const plan = await Plans.findByPk(id);

    if (req.body.title !== plan.title) {
      const planExists = await Plans.findOne({
        where: { title: req.body.title },
      });
      if (planExists) {
        return res.status(400).json({
          error: 'This plan already exists',
        });
      }
    }
    await plan.update({ title, duration, price });
    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plans = await Plans.findByPk(req.params.id);

    if (!plans) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    await plans.destroy();

    return res.json({ message: 'Plan deleted' });
  }
}

export default new PlansController();
