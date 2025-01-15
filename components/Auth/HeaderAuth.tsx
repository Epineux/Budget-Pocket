import Image from "next/image";

const HeaderAuth = () => {
  return (
    <header className="flex items-center justify-center rounded-b-lg bg-grey-900 py-xl lg:hidden">
      <Image
        src="/assets/images/logo-large.svg"
        alt="Logo"
        width={121}
        height={22}
      />
    </header>
  );
};

export default HeaderAuth;
