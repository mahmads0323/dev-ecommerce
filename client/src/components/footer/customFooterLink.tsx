import { Link } from "react-router-dom";

type CustomFooterLinkProps = {
  content: string;
  contentLink: string;
};

const CustomFooterLink = ({ content, contentLink }: CustomFooterLinkProps) => {
  return (
    <Link to={contentLink}>
      =&gt;
      <span className="hover:underline hover:underline-offset-2">
        {content}
      </span>
    </Link>
  );
};

export default CustomFooterLink;
