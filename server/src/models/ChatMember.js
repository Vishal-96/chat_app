import mongoose from 'mongoose';
const { Schema } = mongoose;

const chatMemberSchema = new Schema(
  {
    room_id: {
      type: String,
      required: true,
    },
    member_id: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

chatMemberSchema.methods.toJSON = function () {
  return {
    id: this._id,
    room_id: this.room_id,
    member_id: this.member_id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const ChatMember = mongoose.model('ChatMember', chatMemberSchema);

export default ChatMember;
