import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiBackwardTime } from 'react-icons/gi';
import { FaFacebookF, FaTruck } from 'react-icons/fa';
import {
  AiFillCreditCard,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai';

import * as Styled from './styled';

export function Footer(): JSX.Element {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setFooterVisible(true), 1200);
  }, []);

  return (
    <Styled.Container>
      {footerVisible && (
        <>
          <Styled.FooterIcons>
            <Styled.Truck>
              <FaTruck size={60} />
              <p>
                ENTREGA GRÁTIS
                <span>Em produtos selecionados</span>
              </p>
            </Styled.Truck>
            <Styled.Time>
              <GiBackwardTime size={60} />
              <p>
                ENTREGA EXPRESSA
                <span>A partir de 2 dias úteis</span>
              </p>
            </Styled.Time>
            <Styled.Card>
              <AiFillCreditCard size={60} />
              <p>
                EM ATÉ 10X SEM JUROS
                <span>No cartão de crédito</span>
              </p>
            </Styled.Card>
          </Styled.FooterIcons>
          <Styled.HelpSection>
            <Styled.Institutioinal>
              <p>Institucional</p>
              <Link href="/institucional/sobre" passHref>
                <a>Sobre a commerce-shoes</a>
              </Link>
              <Link href="/institucional/politica-de-privacidade" passHref>
                <a>Política de privacidade</a>
              </Link>
              <Link href="/institucional/trabalhe-conosco" passHref>
                <a>Trabalhe conosco</a>
              </Link>
              <Link href="/institucional/programa-de-afiliados" passHref>
                <a>Programa de afiliados</a>
              </Link>
            </Styled.Institutioinal>
            <Styled.Help>
              <p>Ajuda</p>
              <Link href="/help/trocas-e-devolucoes" passHref>
                <a>Trocas e evolucoes</a>
              </Link>
              <Link href="/help/delivery" passHref>
                <a>Entregas</a>
              </Link>
              <Link href="/help/me-account" passHref>
                <a>Minha conta</a>
              </Link>
              <Link href="/help/me-requests" passHref>
                <a>Meus pedidos</a>
              </Link>
            </Styled.Help>
            <Styled.MediaSocial>
              <p>Fique por dentro das novidades</p>
              <Styled.SocialIcons>
                <Link href="/social/facebook" passHref>
                  <FaFacebookF size={30} />
                </Link>
                <Link href="/social/instagram" passHref>
                  <AiOutlineInstagram size={30} />
                </Link>
                <Link href="/social/twitter" passHref>
                  <AiOutlineTwitter size={30} />
                </Link>
              </Styled.SocialIcons>
            </Styled.MediaSocial>
          </Styled.HelpSection>
        </>
      )}
    </Styled.Container>
  );
}
