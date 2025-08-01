import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
const router = express.Router()
router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.get('/api/users/me', authCtrl.requireSignin, (req, res) => {
  res.json(req.auth);
});

router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization,
        userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,
        userCtrl.remove)
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove)
router.route('/api/users/:userId/password').put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.changePassword)
router.route('/api/users/:userId/role').put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateRole)
export default router
