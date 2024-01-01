import express from 'express';
import controller from '../controllers/User-Controller';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAllUsers);
router.patch('/update/:userId', controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;