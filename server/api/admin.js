const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.get('/orders/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.findAll({
        order: [['id', 'ASC']]
      })
      const ordersWithInfo = await Promise.all(
        orders.map(async order => {
          await order.getAllInfo()
          return order
        })
      )
      ordersWithInfo ? res.status(200).send(ordersWithInfo) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/orders/status', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      console.log('req.query: ', req.query.status)
      const orders = await Order.findAll({
        where: {
          status: req.query.status
        }
      })

      orders ? res.status(200).send(orders) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})

// '/users/billy/tasks?status=active'
// router.get('/users/:name/tasks', (req, res, next) => {
//   const name = req.params.name;
//   const query = req.query.status;
//   const users = todos.listPeople();
//   const tasks = todos.list(name);
//   const complete = query === 'complete';

//   try {
//     if (!users.includes(name)) {
//       res.status(404).send('Not found');
//     }
//     if (query) {
//       const queriedTasks = tasks.filter(task => {
//         return task.complete === complete;
//       });
//       res.status(200).json(queriedTasks);
//     } else {
//       res.status(200).json(tasks);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.put('/orders/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orderToUpdate = await Order.findByPk(req.params.id)

      console.log('req.body ', req.body)
      await orderToUpdate.update(req.body)

      const orders = await Order.findAll({
        order: [['id', 'ASC']]
      })
      const ordersWithInfo = await Promise.all(
        orders.map(async order => {
          await order.getAllInfo()
          return order
        })
      )
      orderToUpdate ? res.status(200).send(ordersWithInfo) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})
