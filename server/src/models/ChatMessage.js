import mongoose from 'mongoose';
import Joi from 'joi';

const { Schema } = mongoose;

const chatMessageSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    room_name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    is_private: { type: Boolean, default: false },
    reciever_id: String,
  },
  { timestamps: true },
);

chatMessageSchema.methods.toJSON = function () {
  return {
    id: this._id,
    author: this.author,
    room: this.room,
    room_name: this.room_name,
    message: this.message,
    is_private: this.is_private,
    reciever_id: this.reciever_id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const validateChatMessage = (chatMessage) => {
  const schema = {
    room_name: Joi.string().min(2).max(30).required(),
    message: Joi.string()
      .min(1)
      .max(500)
      .regex(/^[a-zA-Z0-9_]+$/)
      .required(),
  };

  return Joi.validate(chatMessage, schema);
};

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
