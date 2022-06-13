import React from "react"
import styled from "styled-components"
import { Icon } from "../components/icon/Icon"

import { theme } from "../theme"
import { Container } from "./Container"

const FooterContainer = styled.div`
  background-color: ${theme.colors.white};
  padding: 46px 0 1px;
`

const Row = styled.div`
  @media only screen and (min-width: 940px) {
    display: flex;
  }
`

const Column = styled.div<{ flex?: number }>`
  margin-bottom: 48px;
  &.hide-on-mobile {
    display: none;
  }
  @media only screen and (min-width: 940px) {
    margin-bottom: 0;
    padding: 0 0.5rem;
    flex: ${(p) => p.flex || 1};
    &.hide-on-desktop {
      display: none;
    }
    &.hide-on-mobile {
      display: initial;
    }
  }
`

const Title = styled.h4`
  text-transform: uppercase;
  font-weight: 400;
  font-size: ${theme.fontSizes[16]};
  color: ${theme.colors.gray700};
  letter-spacing: 0.08em;
  margin-top: 0;
  margin-bottom: 1rem;
  @media only screen and (min-width: 940px) {
    margin-bottom: 0.5rem;
  }
`

const Link = styled.a`
  font-size: ${theme.fontSizes[18]};
  color: ${theme.colors.gray800};
  font-weight: 400;
  cursor: pointer;
  font-weight: 500;
  box-sizing: border-box;
  display: block;
  text-decoration: none;
  line-height: ${25 / 18};
  padding: 1rem 0;
  @media only screen and (min-width: 940px) {
    padding: 0.5rem 0;
  }
  &:hover {
    color: ${theme.colors.indigo600};
  }
`

const DesktopSpacer = styled.div`
  @media only screen and (min-width: 940px) {
    height: 100px;
  }
`

const FooterP = styled.p`
  font-size: ${theme.fontSizes[18]};
  color: ${theme.colors.gray800};
  font-weight: 400;
  margin-top: 0;
  line-height: ${25 / 18};
  margin-bottom: ${theme.space[24]};
`
const SocialLinksContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;

  a {
    font-size: ${theme.fontSizes[18]};
    color: ${theme.colors.gray800};
    font-weight: 400;
    &:hover {
      color: ${theme.colors.indigo600};
    }
  }
`

const logoUrl = "https://website-v9.vercel.app/logo-dark.svg"
const WebsiteFooter = ({ newsletterComponent }: any) => (
  <FooterContainer>
    <Container>
      <Row>
        <Column className="hide-on-desktop">
          <Title style={{ marginBottom: "2rem" }}>Newsletter</Title>
          <FooterP>
            Stay up to date with the latest features and changes to Prisma
          </FooterP>
          {/* <FooterNewsletterForm /> */}
          {newsletterComponent}
          <div style={{ height: 16 }} />
        </Column>

        <Column>
          <Title>Products</Title>
          <Link href="#">Client</Link>
          <Link href="#">Migrate</Link>
          <Link href="#">Data Browser</Link>
          <Link href="#">Serverless Data Proxy</Link>
        </Column>

        <Column>
          <Title>Developers</Title>
          <Link href="#">Docs</Link>
          <Link href="#">Prisma in your Stack</Link>
          <Link href="/support">Support</Link>
          <Link href="#">Community</Link>
          <Link href="#">Data Guide</Link>
        </Column>

        <Column>
          <Title>Use Cases</Title>
          <Link href="#">Customer Stories</Link>
          <Link href="#">Enterprise</Link>
        </Column>

        <Column>
          <Title>Company</Title>
          <Link href="#">About</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Vision</Link>
          <Link href="#">
            {/* Careers <Label type={"secondary"}>We're Hiring</Label> */}
          </Link>
          <Link href="#">Press &amp; Media</Link>
          <Link href="#">Causes</Link>
          <Link href="#">Terms &amp; Privacy</Link>
        </Column>
      </Row>

      <DesktopSpacer />

      <Row>
        <Column>
          <div style={{ marginBottom: theme.space[24] }}>
            <img src={logoUrl} width={90} height={27} alt="prisma_logo" />
          </div>

          <FooterP>&copy; {new Date().getFullYear()} Prisma Data, Inc.</FooterP>

          <SocialLinksContainer>
            <a href="#">
              <Icon name="twitter" />
            </a>
            <a href="#">
              <Icon name="facebook" />
            </a>
            <a href="#">
              <Icon name="youtube" />
            </a>
            <a href="#">
              <Icon name="slack" />
            </a>
            <a href="#">
              <Icon name="github" />
            </a>
          </SocialLinksContainer>
        </Column>

        <Column flex={3 / 4} className="hide-on-mobile">
          <Title>Newsletter</Title>
          <div style={{ height: 16 }} />
          <FooterP>
            Stay up to date with the latest features and changes to Prisma
          </FooterP>
          {newsletterComponent}
        </Column>
      </Row>

      <DesktopSpacer />
    </Container>
  </FooterContainer>
)

export { WebsiteFooter }
