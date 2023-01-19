import * as Styled from './styled';

export type MessageAndLink = {
  href: string;
  textLink: string;
  textMessage: string;
};

export function MessageAndLink({
  href,
  textLink,
  textMessage,
}: MessageAndLink): JSX.Element {
  return (
    <Styled.MessageInfo>
      <h2>{textMessage}</h2>
      <a href={href}>{textLink}</a>
    </Styled.MessageInfo>
  );
}
