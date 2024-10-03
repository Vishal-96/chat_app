import { Router } from 'express';
import usersRoutes from './users';
import chatRoutes from './chats';
const router = Router();

router.use('/users', usersRoutes);
router.use('/chats', chatRoutes);

export default router;
