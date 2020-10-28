import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-8 bg-gray-900 text-green-300">
      <div className="flex container mx-auto">
        <div className="my-2 mr-2 px-8 pb-16 w-1/3">
          <p className="text-3xl font-bold">Ferris</p>
          <p className="mt-2 text-lg">Leave protecting your community to us.</p>
        </div>
        <FooterColumn name="RESOURCES">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/discord">Support Server</FooterLink>
        </FooterColumn>
        <FooterColumn name="SUPPORT">
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/docs">Documentation</FooterLink>
          <FooterLink to="/guides">Guides</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterColumn>
        <FooterColumn name="LEGAL">
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </FooterColumn>
        <div className="m-2 p-1 flex-1">
          <img
            src={"/img/crystal-outline-dark.svg"}
            draggable={false}
            alt="Ferris Crystal"
          />
        </div>
      </div>
    </footer>
  );
};

function FooterColumn(props: any) {
  return (
    <div className="m-2 p-1 flex-1">
      <div className="flex flex-col">
        <h2 className="tracking-widest select-none font-bold">{props.name}</h2>
        {props.children}
      </div>
    </div>
  );
}

function FooterLink(props: any) {
  return (
    <Link href={props.to}>
      <a className="mt-2">{props.children}</a>
    </Link>
  );
}

export default Footer;
