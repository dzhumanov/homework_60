import { MessageProps } from "../../types";
import Message from "./Message";

interface Props {
  Messages: MessageProps[];
}

const Messages: React.FC<Props> = ({ Messages }) => {
  return (
    <>
      {Messages.map((messageItem) => (
        <Message
          key={Math.random()}
          author={messageItem.author}
          message={messageItem.message}
          datetime={messageItem.datetime}
        />
      ))}
    </>
  );
};

export default Messages;
