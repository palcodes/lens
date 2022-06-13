import React from "react"
import { Container } from "./Container"
import styled from "styled-components"
import { theme } from "../theme"
import {
  NavBar,
  NavBarContext,
  NavBarInner,
  NavItemsContainer,
  MenuButton,
  NavItem,
} from "../website/navbar/Navbar"
import {
  ArticleLink,
  ArticlesHeader,
  HorizontalDivider,
  IconLink,
  Link,
  Panel,
  SectionHeader,
  Spacer,
  VerticalDivider,
} from "../website/dropdown/Dropdown"

const Label = styled.span`
  border-radius: 4px;
  background-color: ${theme.colors.teal500};
  padding: ${theme.space[4]} ${theme.space[8]};
  color: ${theme.colors.white};
  line-height: 1;
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
`

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  //background-color: ${theme.colors.white};
  z-index: 9999;

  &.open {
    height: 100vh;
    overflow: scroll;
  }

  .container {
    @media only screen and (max-width: ${940 - 1}px) {
      padding: 0;
    }
  }

  .hidden-on-mobile {
    @media only screen and (max-width: ${940 - 1}px) {
      display: none;
    }
  }

  .mobile-header {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 18px 8px 30px 24px;
    border-bottom: 1px solid ${theme.colors.gray300};
    .menu-toggle-button {
      display: inline-flex;
      color: ${theme.colors.gray800};
    }
    @media only screen and (min-width: ${940}px) {
      border-bottom: none;
      padding: 0;
      display: initial;
      width: auto;
      .menu-toggle-button {
        display: none;
      }
    }
  }

  .header-cta-container {
    width: 100%;
    a {
      width: 100%;
    }
    padding: 24px 24px 24px;
    @media only screen and (min-width: ${940}px) {
      padding: 0;
      width: auto;
      a {
        width: auto;
      }
    }
  }

  .company-dropdown-container {
    display: flex;
    flex-direction: row;
    .company-links {
      flex-shrink: 0;
      width: 100%;
      @media only screen and (min-width: ${940}px) {
        padding: 0 12px 0 20px;
        box-sizing: content-box;
        width: 187px;
      }
    }
    .articles {
      padding: 0 24px;
      display: none;
      @media only screen and (min-width: ${940}px) {
        display: block;
      }
    }
  }
`

const ButtonLink = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  transition: "background-color .1s ease, color .2s ease";
  font-family: ${theme.fonts.text};
  font-weight: 500;
  background-color: ${theme.colors.indigo600};
  color: ${theme.colors.white};
  padding: ${theme.space[16]} ${theme.space[20]};
  hover: {
    backgroundcolor: ${theme.colors.indigo700};
  }
`
interface HeaderProps {
  className?: string
}
const logoUrl = "https://website-v9.vercel.app/logo-dark.svg"

const WebsiteHeader = ({ className }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <NavBar>
        <NavBarContext.Consumer>
          {({ state: { mobileOpen } }: any) => (
            <>
              <div className={className + (mobileOpen ? " open" : "")}>
                <Container className="container">
                  <NavBarInner>
                    <div className="mobile-header">
                      <a href="/">
                        <img
                          src={logoUrl}
                          width={90}
                          height={27}
                          alt="prisma_logo"
                          style={{ cursor: "pointer" }}
                        />
                      </a>

                      <MenuButton />
                    </div>

                    <NavItemsContainer
                      className={mobileOpen ? "" : "hidden-on-mobile"}
                    >
                      <NavItem
                        title={"Products"}
                        dropdown={
                          <Panel>
                            <SectionHeader>Prisma ORM</SectionHeader>
                            <IconLink
                              href={"#"}
                              icon={""}
                              title={"Client"}
                              subtitle={"Write Queries the way you think"}
                            />
                            <IconLink
                              href={"#"}
                              icon={""}
                              title={"Migrate"}
                              subtitle={"Generate customisable SQL migrations"}
                            />

                            <SectionHeader>Prisma Data Platform</SectionHeader>
                            <IconLink
                              href={"#"}
                              icon={""}
                              title={"Data Browser"}
                              subtitle={
                                "Explore and manipulate data in your projects"
                              }
                            />
                            <IconLink
                              href={"#"}
                              icon={""}
                              title={"Serverless Data Proxy"}
                              subtitle={"Manage and scale your connection pool"}
                            />
                          </Panel>
                        }
                      />

                      <NavItem href="/pricing" title={"Pricing"} />

                      <NavItem
                        title={"Developers"}
                        dropdown={
                          <Panel width={461}>
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Documentation"}
                              subtitle={
                                "Learn about Prisma, explore our guides, features and examples"
                              }
                            />
                            <Spacer height={10} />
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"API Reference"}
                              subtitle={
                                "Reference documentation for the Prisma API"
                              }
                            />
                            <Spacer height={10} />
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Data Guide"}
                              subtitle={
                                "How to use databases in your application"
                              }
                            />
                            <Spacer height={10} />
                            <IconLink
                              href={"/support"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Support"}
                              subtitle={
                                "Browse our resources, visit our status page, or submit a ticket to our support team."
                              }
                            />
                            <HorizontalDivider />
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Community"}
                              subtitle={
                                "Engage with a vibrant group of developers"
                              }
                            />
                            <Spacer height={15} />
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Prisma in your stack"}
                              subtitle={
                                "How to incorporate Prisma in your application"
                              }
                            />
                          </Panel>
                        }
                      />

                      <NavItem
                        title={"Use Cases"}
                        dropdown={
                          <Panel width={441}>
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Customer Stories"}
                              subtitle={
                                "Learn about applications built with Prisma"
                              }
                            />
                            <Spacer height={15} />
                            <IconLink
                              href={"#"}
                              titleOnlyOnMobile
                              icon={""}
                              title={"Enterprise"}
                              subtitle={
                                "Up-level your Applications with our Data Platform"
                              }
                            />
                          </Panel>
                        }
                      />

                      <NavItem
                        title={"Company"}
                        dropdown={
                          <Panel width={621}>
                            <div className="company-dropdown-container">
                              <div className="company-links">
                                <Link href={"#"}>About</Link>
                                <Link href={"#"}>Blog</Link>
                                <Link href={"#"}>Vision</Link>
                                <Link href={"#"}>
                                  Careers <Label>We&apos;re Hiring</Label>
                                </Link>
                                <Link href={"#"}>Events</Link>
                                <Link href={"#"}>Press & Media</Link>
                                <Link href={"#"}>Causes</Link>
                              </div>

                              <VerticalDivider />

                              <div className="articles">
                                <ArticlesHeader>
                                  Latest from the blog
                                </ArticlesHeader>

                                <ArticleLink
                                  href={"#"}
                                  image={
                                    <img
                                      src="/content/series-b-announcement.png"
                                      alt="Landscape picture"
                                      width={148}
                                      height={83}
                                    />
                                  }
                                  title={
                                    "Prisma Raises $40M to Build the Application Data Platform"
                                  }
                                />

                                <ArticleLink
                                  href={"#"}
                                  image={
                                    <img
                                      src="/content/amplication-prisma-customer-story.png"
                                      alt="Landscape picture"
                                      width={148}
                                      height={83}
                                    />
                                  }
                                  title={
                                    "How Prisma helps Application revolutionize backend..."
                                  }
                                />
                              </div>
                            </div>
                          </Panel>
                        }
                      />
                    </NavItemsContainer>

                    <div
                      className={
                        "header-cta-container" +
                        (mobileOpen ? "" : " hidden-on-mobile")
                      }
                    >
                      <ButtonLink href={"#"}>Get Started</ButtonLink>
                    </div>
                  </NavBarInner>
                </Container>
              </div>
            </>
          )}
        </NavBarContext.Consumer>
      </NavBar>
    </HeaderWrapper>
  )
}

export { WebsiteHeader }
