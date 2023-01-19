import { MessageAndLink } from '@components/messageAndLink';
import Head from 'next/head';

export default function Page404(): JSX.Element {
  return (
    <>
      <Head>
        <title>C-SHOES | Link de Demonstração</title>
      </Head>
      <MessageAndLink
        href="/c-shoes/home"
        textLink="Voltar ao início"
        textMessage="Link desativado."
      />
    </>
  );
}
