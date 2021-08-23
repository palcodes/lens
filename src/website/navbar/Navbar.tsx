import React, { useState } from "react"
import { Button } from "../../components/button/Button"
import { Icon } from "../../components/icon/Icon"
import { Menu } from "../../components/menu/Menu"
import cn from "classnames"

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav
      id="navbar"
      className={cn(
        "w-full",
        "grid grid-cols-navbar grid-rows-navbar items-center",
        "px-5",
        {
          "fixed inset-0 bg-white z-50": isMobileMenuOpen,
        }
      )}
    >
      <div className="logo">
        <a href="/">
          <svg
            width="90"
            height="29"
            viewBox="0 0 90 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.209637 19.5075C-0.0659575 19.0728 -0.0701211 18.5191 0.198904 18.0802L10.3282 1.55731C10.8916 0.638316 12.252 0.718671 12.7033 1.69759L21.9569 21.7708C22.3002 22.5156 21.905 23.3919 21.1194 23.6276L6.72474 27.946C6.14558 28.1197 5.52155 27.8869 5.19781 27.3762L0.209637 19.5075ZM11.4969 6.38848C11.5945 5.90241 12.2605 5.83232 12.4572 6.28741L18.8402 21.0573C18.9603 21.3354 18.8108 21.6561 18.5205 21.7427L8.57492 24.7116C8.20935 24.8207 7.85916 24.5013 7.93428 24.1272L11.4969 6.38848ZM48.4948 21.6373H51.3226V11.2722H48.4948V21.6373ZM48.3744 8.59301C48.3744 7.67245 48.8878 7.21184 49.9137 7.21184C50.9394 7.21184 51.4527 7.67245 51.4527 8.59301C51.4527 9.03201 51.3244 9.37345 51.068 9.61767C50.8114 9.86189 50.4267 9.98367 49.9137 9.98367C48.8878 9.98367 48.3744 9.52011 48.3744 8.59301ZM87.1709 16.8352L86.0768 16.8722C85.2548 16.8971 84.6429 17.0457 84.2412 17.3174C83.8392 17.5895 83.6386 18.0033 83.6386 18.5598C83.6386 19.3569 84.0959 19.7557 85.0106 19.7557C85.6656 19.7557 86.1897 19.5674 86.5819 19.19C86.9744 18.8132 87.1709 18.3126 87.1709 17.688V16.8352ZM88.0053 21.6377L87.4583 20.2284H87.384C86.908 20.8281 86.4182 21.2439 85.9144 21.4757C85.4109 21.7074 84.7542 21.823 83.9446 21.823C82.9491 21.823 82.1661 21.5388 81.5941 20.9702C81.0226 20.4019 80.7368 19.592 80.7368 18.5411C80.7368 17.4412 81.1214 16.63 81.8907 16.1075C82.6607 15.5853 83.8209 15.2963 85.3723 15.2406L87.1709 15.185V14.7306C87.1709 13.6801 86.633 13.1546 85.5576 13.1546C84.7293 13.1546 83.7558 13.4047 82.6371 13.9056L81.7009 11.9957C82.8938 11.3718 84.2167 11.0592 85.6689 11.0592C87.0596 11.0592 88.1258 11.3623 88.8676 11.9679C89.6091 12.5736 89.98 13.4948 89.98 14.7306V21.6377H88.0053ZM72.4802 21.6377H69.6524V15.5836C69.6524 14.8359 69.527 14.2752 69.2772 13.901C69.0265 13.5271 68.6326 13.3399 68.0948 13.3399C67.3719 13.3399 66.8465 13.606 66.5188 14.1373C66.1911 14.669 66.0275 15.5437 66.0275 16.7612V21.6377H63.1996V11.2725H65.3599L65.74 12.5984H65.8978C66.1757 12.1227 66.5778 11.7502 67.1029 11.4814C67.6283 11.2123 68.231 11.0778 68.9109 11.0778C70.4623 11.0778 71.5128 11.5848 72.0631 12.5984H72.3132C72.5915 12.1162 73.001 11.7423 73.5419 11.4765C74.0827 11.2107 74.6929 11.0778 75.3728 11.0778C76.5471 11.0778 77.4359 11.3793 78.0382 11.9819C78.6409 12.5846 78.9421 13.5504 78.9421 14.8788V21.6377H76.1051V15.5836C76.1051 14.8359 75.9798 14.2752 75.73 13.901C75.4792 13.5271 75.0854 13.3399 74.5475 13.3399C73.8555 13.3399 73.3379 13.5874 72.9945 14.0817C72.6517 14.5763 72.4802 15.361 72.4802 16.4364V21.6377ZM60.17 20.9887C60.9088 20.4325 61.2781 19.6229 61.2781 18.5596C61.2781 18.047 61.1887 17.6047 61.0093 17.2338C60.8299 16.8629 60.5517 16.5355 60.1749 16.251C59.7981 15.9669 59.2046 15.6611 58.3946 15.3334C57.4862 14.9687 56.8976 14.6934 56.6285 14.5081C56.3601 14.3228 56.2252 14.1035 56.2252 13.8498C56.2252 13.3987 56.6426 13.1731 57.477 13.1731C57.9465 13.1731 58.4071 13.2445 58.8582 13.3862C59.3093 13.5286 59.7948 13.7106 60.314 13.9333L61.1668 11.8938C59.9863 11.35 58.7718 11.078 57.5232 11.078C56.2127 11.078 55.2009 11.3297 54.4872 11.8335C53.7729 12.3373 53.416 13.0497 53.416 13.9703C53.416 14.5081 53.5012 14.9612 53.6714 15.3288C53.841 15.6965 54.113 16.0225 54.4872 16.3067C54.8607 16.5912 55.4467 16.9002 56.2438 17.2338C56.8 17.4688 57.2453 17.6744 57.5788 17.8505C57.9128 18.0267 58.1475 18.1845 58.2837 18.3233C58.4195 18.4624 58.4876 18.6431 58.4876 18.8657C58.4876 19.4589 57.9743 19.7555 56.9483 19.7555C56.4478 19.7555 55.8684 19.672 55.2103 19.5054C54.5517 19.3384 53.9601 19.1315 53.4347 18.884V21.2205C53.8983 21.4182 54.3959 21.5681 54.9275 21.6703C55.4591 21.7721 56.1014 21.8231 56.8557 21.8231C58.3266 21.8231 59.4314 21.5449 60.17 20.9887ZM46.9948 11.1612C46.7414 11.1056 46.4232 11.0778 46.0398 11.0778C45.3969 11.0778 44.8021 11.2555 44.2554 11.611C43.708 11.9666 43.2739 12.4347 42.9524 13.0154H42.8136L42.3962 11.2725H40.2546V21.6377H43.0824V16.3624C43.0824 15.528 43.3341 14.8788 43.8376 14.4153C44.3418 13.9517 45.0446 13.7199 45.9472 13.7199C46.2749 13.7199 46.5528 13.751 46.7817 13.8126L46.9948 11.1612ZM31.9317 14.4616H32.8774C33.7613 14.4616 34.4223 14.2871 34.8613 13.9378C35.3003 13.5888 35.5196 13.0801 35.5196 12.4126C35.5196 11.7392 35.3356 11.2416 34.968 10.9201C34.6 10.5986 34.0239 10.4379 33.2388 10.4379H31.9317V14.4616ZM38.4214 12.3108C38.4214 13.7696 37.9657 14.8852 37.0537 15.6575C36.1423 16.4304 34.8459 16.8164 33.1649 16.8164H31.9317V21.6375H29.0577V8.0832H33.3872C35.0315 8.0832 36.2814 8.43708 37.1375 9.14485C37.9936 9.85262 38.4214 10.9081 38.4214 12.3108Z"
              fill={isMobileMenuOpen ? "#2D3748" : "#F7FAFC"}
            />
          </svg>
        </a>
      </div>

      <div className="">
        <div className="hidden md:block">
          <MenuLinks />
        </div>
        <div className="md:hidden">
          <Button
            variant="quiet"
            onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon
              name={isMobileMenuOpen ? "x" : "menu"}
              size="md"
              className={cn({
                "text-gray-800": isMobileMenuOpen,
                "text-gray-100": !isMobileMenuOpen,
              })}
            />
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="col-span-2 self-start pt-4 md:hidden">
          <MenuLinks />
        </div>
      )}
    </nav>
  )
}

const MenuLinks = () => {
  return (
    <ul className="flex flex-col md:flex-row md:items-center">
      <li className="md:px-2">
        <ProductsLinks />
      </li>
      <li className="md:px-5">
        <a
          href="https://www.prisma.io/docs/getting-started/quickstart"
          className="flex text-gray-800 text-2xl py-3 font-medium md:text-sm md:py-0 md:text-gray-200 md:hover:text-white"
        >
          Quickstart
        </a>
      </li>
      <li className="md:px-5">
        <a
          href="https://www.prisma.io/docs/"
          className="flex text-gray-800 text-2xl py-3 font-medium md:text-sm md:py-0 md:text-gray-200 md:hover:text-white"
        >
          Docs
        </a>
      </li>
      <li className="md:px-5">
        <a
          href="https://www.prisma.io/docs/about/prisma/faq"
          className="flex text-gray-800 text-2xl py-3 font-medium md:text-sm md:py-0 md:text-gray-200 md:hover:text-white"
        >
          FAQ
        </a>
      </li>
      <li className="md:px-5">
        <a
          href="https://www.prisma.io/community"
          className="flex text-gray-800 text-2xl py-3 font-medium md:text-sm md:py-0 md:text-gray-200 md:hover:text-white"
        >
          Community
        </a>
      </li>
      <li className="md:px-5">
        <a
          href="https://www.prisma.io/blog/"
          className="flex text-gray-800 text-2xl py-3 font-medium md:text-sm md:py-0 md:text-gray-200 md:hover:text-white"
        >
          Blog
        </a>
      </li>
      <li className="md:pl-5">
        <a
          href="https://github.com/prisma/prisma"
          className="flex items-center text-gray-800 text-2xl py-3 font-medium md:text-sm md:py-0 md:text-gray-200 md:hover:text-white"
        >
          {/* Using actual icon svg as the Icon color cannot be changed for GitHub.. */}
          <svg
            width={24}
            height={24}
            viewBox="0 0 18 18"
            className="mr-2 md:mr-0"
          >
            <path
              d="M16.7926 4.70258C15.9878 3.32365 14.8961 2.23195 13.5173 1.42724C12.1383 0.622478 10.6328 0.220201 8.99986 0.220201C7.36707 0.220201 5.8611 0.622601 4.48238 1.42724C3.10345 2.23191 2.01183 3.32365 1.20703 4.70258C0.402359 6.08147 0 7.58723 0 9.21981C0 11.1809 0.57216 12.9444 1.71677 14.5107C2.86125 16.0771 4.33975 17.161 6.15215 17.7625C6.36312 17.8017 6.51929 17.7741 6.62084 17.6806C6.72242 17.5869 6.77315 17.4696 6.77315 17.3292C6.77315 17.3057 6.77114 17.0949 6.76724 16.6964C6.76322 16.2979 6.76133 15.9502 6.76133 15.6536L6.49179 15.7002C6.31994 15.7317 6.10314 15.7451 5.8414 15.7413C5.57979 15.7376 5.3082 15.7102 5.027 15.6592C4.74568 15.6087 4.48402 15.4915 4.24182 15.3079C3.99974 15.1243 3.82789 14.884 3.7263 14.5874L3.60912 14.3177C3.53101 14.1382 3.40804 13.9387 3.24005 13.7201C3.07205 13.5013 2.90217 13.353 2.73032 13.2749L2.64827 13.2161C2.5936 13.1771 2.54287 13.13 2.49595 13.0754C2.44908 13.0208 2.41399 12.9661 2.39055 12.9113C2.36707 12.8566 2.38653 12.8116 2.44912 12.7764C2.51171 12.7411 2.62483 12.724 2.78897 12.724L3.02325 12.759C3.17951 12.7903 3.37279 12.8838 3.60333 13.0402C3.83376 13.1964 4.02318 13.3995 4.17163 13.6494C4.35141 13.9698 4.568 14.2139 4.82202 14.3819C5.07584 14.5499 5.33176 14.6337 5.58951 14.6337C5.84727 14.6337 6.0699 14.6142 6.25747 14.5753C6.44484 14.5363 6.62063 14.4775 6.78477 14.3995C6.85508 13.8758 7.04651 13.4735 7.3589 13.1923C6.91365 13.1455 6.51334 13.0751 6.15777 12.9814C5.80241 12.8875 5.43519 12.7353 5.05635 12.5241C4.6773 12.3133 4.36286 12.0515 4.11294 11.7391C3.86298 11.4266 3.65784 11.0163 3.49781 10.5086C3.33769 10.0008 3.25761 9.4149 3.25761 8.75088C3.25761 7.80542 3.56627 7.00087 4.18345 6.33677C3.89434 5.62596 3.92163 4.82912 4.26542 3.94634C4.49199 3.87595 4.82798 3.92877 5.27323 4.10448C5.71856 4.28028 6.04461 4.43087 6.25172 4.55573C6.45883 4.68054 6.62478 4.78631 6.7498 4.8721C7.47649 4.66905 8.22641 4.56751 8.99977 4.56751C9.77313 4.56751 10.5232 4.66905 11.25 4.8721L11.6952 4.59098C11.9998 4.40341 12.3593 4.23152 12.7732 4.07526C13.1872 3.91909 13.5038 3.87607 13.7227 3.94646C14.0741 4.82929 14.1054 5.62608 13.8162 6.33689C14.4334 7.00099 14.7421 7.80575 14.7421 8.751C14.7421 9.41502 14.6618 10.0027 14.5019 10.5145C14.3418 11.0264 14.1349 11.4363 13.8811 11.745C13.627 12.0537 13.3105 12.3135 12.9317 12.5243C12.5528 12.7352 12.1854 12.8875 11.8301 12.9813C11.4745 13.0752 11.0742 13.1457 10.629 13.1925C11.0351 13.544 11.2382 14.0987 11.2382 14.8564V17.3288C11.2382 17.4693 11.287 17.5866 11.3848 17.6803C11.4824 17.7738 11.6366 17.8013 11.8476 17.7621C13.6602 17.1607 15.1387 16.0768 16.2832 14.5104C17.4275 12.9441 17.9999 11.1806 17.9999 9.21948C17.9995 7.5871 17.5969 6.08147 16.7926 4.70258Z"
              className="fill-current md:text-gray-200 md:hover:text-white"
            />
          </svg>

          <span className="md:hidden">GitHub</span>
        </a>
      </li>
    </ul>
  )
}

const ProductsLinks = () => {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)

  const navigateTo = (key: string): void => {
    switch (key) {
      case "client": {
        window.location.href = "https://www.prisma.io/client"
        break
      }
      case "migrate": {
        window.location.href = "https://www.prisma.io/migrate"
        break
      }
      case "studio": {
        window.location.href = "https://www.prisma.io/studio"
        break
      }
      case "data-platform": {
        window.location.href = "https://cloud.prisma.io/"
        break
      }
      default:
        break
    }
  }
  return (
    <>
      <div className="hidden md:block">
        <Menu.Container>
          <Button variant="quiet">
            <span className="flex items-center text-sm font-medium text-gray-200 hover:text-white">
              Products
              <Icon
                name={isProductsMenuOpen ? "chevron-up" : "chevron-down"}
                size="xs"
                className="ml-2"
              />
            </span>
          </Button>
          <Menu.Body
            title="Product Links"
            anchor="left"
            onSelectionChange={navigateTo}
          >
            <Menu.Option key="client">
              <div className="flex items-center py-1">
                <div className="pr-2">
                  <Icon
                    name="terminal"
                    size="md"
                    className="text-gray-800 dark:text-gray-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 dark:text-gray-400">
                    Client
                  </span>
                  <span className="text-gray-600">
                    Write queries the way you think
                  </span>
                </div>
              </div>
            </Menu.Option>
            <Menu.Option key="migrate">
              <div className="flex items-center py-1">
                <div className="pr-2">
                  <Icon
                    name="repeat"
                    size="md"
                    className="text-gray-800 dark:text-gray-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 dark:text-gray-400">
                    Migrate
                  </span>
                  <span className="text-gray-600">
                    Generate customizable SQL database migrations
                  </span>
                </div>
              </div>
            </Menu.Option>
            <Menu.Option key="studio">
              <div className="flex items-center py-1">
                <div className="pr-2">
                  <Icon
                    name="database"
                    size="md"
                    className="text-gray-800 dark:text-gray-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 dark:text-gray-400">
                    Studio
                  </span>
                  <span className="text-gray-600">
                    Explore and manipulate Data in your Prisma projects
                  </span>
                </div>
              </div>
            </Menu.Option>
            <Menu.Option key="data-platform">
              <div className="flex items-center py-1">
                <div className="pr-2">
                  <Icon
                    name="layout"
                    size="md"
                    className="text-gray-800 dark:text-gray-400"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center font-semibold text-gray-800 dark:text-gray-400">
                    Data Platform &nbsp;
                    <span className="text-xs px-1 py-[0.75] rounded-md text-indigo-600 bg-indigo-100">
                      BETA
                    </span>
                  </span>
                  <span className="text-gray-600">
                    Get started with Prisma without leaving your browser
                  </span>
                </div>
              </div>
            </Menu.Option>
          </Menu.Body>
        </Menu.Container>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}>
          <span className="flex items-center text-2xl py-3 font-medium text-gray-800">
            Products
            <Icon
              name={isProductsMenuOpen ? "chevron-up" : "chevron-down"}
              size="xs"
              className="ml-2"
            />
          </span>
        </button>
        {isProductsMenuOpen && (
          <ul>
            <li>
              <a href="https://www.prisma.io/client" className="py-2">
                <span className="flex items-center">
                  <Icon
                    name="terminal"
                    size="sm"
                    className="text-gray-800 mr-2"
                  />
                  <span className="text-gray-800 text-lg">Client</span>
                </span>
              </a>
            </li>
            <li>
              <a href="https://www.prisma.io/migrate" className="py-2">
                <span className="flex items-center">
                  <Icon
                    name="repeat"
                    size="sm"
                    className="text-gray-800 mr-2"
                  />
                  <span className="text-gray-800 text-lg">Migrate</span>
                </span>
              </a>
            </li>
            <li>
              <a href="https://www.prisma.io/studio" className="py-2">
                <span className="flex items-center">
                  <Icon
                    name="database"
                    size="sm"
                    className="text-gray-800 mr-2"
                  />
                  <span className="text-gray-800 text-lg">Studio</span>
                </span>
              </a>
            </li>
            <li>
              <a href="https://cloud.prisma.io/" className="py-2">
                <span className="flex items-center">
                  <Icon
                    name="layout"
                    size="sm"
                    className="text-gray-800 mr-2"
                  />
                  <span className="text-gray-800 text-lg mr-2">
                    Data Platform
                  </span>
                  <span className="text-xs px-1 py-[0.75] rounded-md text-indigo-600 bg-indigo-100">
                    BETA
                  </span>
                </span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}
