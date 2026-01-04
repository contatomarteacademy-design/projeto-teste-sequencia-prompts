/**
 * Componentes de ícones SVG inline
 * Baseados no design system do Figma
 */

interface IconProps {
  className?: string;
  size?: number;
}

export const HomeIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
      fill="currentColor"
    />
  </svg>
);

export const GolfIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19.5 3.5L18 2L16 4L18 6L19.5 3.5ZM11 24C12.1 24 13 23.1 13 22C13 20.9 12.1 20 11 20C9.9 20 9 20.9 9 22C9 23.1 9.9 24 11 24ZM3.5 22.5L2.5 21.5L21.5 2.5L22.5 3.5L19.5 6.5L20 7L18 9L16.5 8.5L3.5 21.5L2.5 22.5ZM14.5 6.69L12.97 5.18L16.82 1.32L18.34 2.83L14.5 6.69ZM6 24C7.1 24 8 23.1 8 22C8 20.9 7.1 20 6 20C4.9 20 4 20.9 4 22C4 23.1 4.9 24 6 24Z"
      fill="currentColor"
    />
  </svg>
);

export const CreditCardIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z"
      fill="currentColor"
    />
  </svg>
);

export const TransactionsIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7 18C5.9 18 5 17.1 5 16C5 14.9 5.9 14 7 14C8.1 14 9 14.9 9 16C9 17.1 8.1 18 7 18ZM1 2V22H23V20H3V4H1V2ZM17 18C15.9 18 15 17.1 15 16C15 14.9 15.9 14 17 14C18.1 14 19 14.9 19 16C19 17.1 18.1 18 17 18ZM21 6H9V10H21V6Z"
      fill="currentColor"
    />
  </svg>
);

export const ProfileIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="currentColor"
    />
  </svg>
);

export const SignOutIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
      fill="currentColor"
    />
  </svg>
);

export const ChevronLeftIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill="currentColor"
    />
  </svg>
);

export const ChevronRightIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
      fill="currentColor"
    />
  </svg>
);

