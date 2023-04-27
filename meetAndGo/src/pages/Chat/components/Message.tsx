import { IMessage } from "../../../types/types";

interface MessageProps extends Pick<IMessage, "body" | "createdById"> {}

const Message = ({ body, createdById }: MessageProps) => {
  return (
    <div className="">
      <div className="">{createdById}</div>
      <div className="">{body}</div>
    </div>
  );
};

export default Message;
