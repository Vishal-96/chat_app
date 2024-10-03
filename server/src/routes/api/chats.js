import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import ChatMessage from '../../models/ChatMessage';
import ChatMember from '../../models/ChatMember';

const router = Router();

router.get('/:id', requireJwtAuth, async (req, res) => {
  try {
    if (req.params.id) return res.status(422).json({ message: 'Missing room' });

    const messages = await ChatMessage.find({ room: { $eq: req.params.id } });
    const members = await ChatMember.find();
    res.json({
      messages: messages.map((m) => {
        return m.toJSON();
      }),
      members: members.map((m) => m.toJSON()),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/chat-rooms', requireJwtAuth, async (req, res) => {
  try {
    const me = req.user.toJSON();
    const members = await ChatMember.find({ _id: { $eq: me.id } });
    res.json({
      rooms: members.map((m) => m.toJSON().room_id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    //TODO
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
