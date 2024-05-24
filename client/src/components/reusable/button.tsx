type ButtonProps = {
  content: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  classNames?: string;
  usage?: "primary" | "secondry" | "delete";
  disabled?: boolean,
};

const Button = ({
  content,
  onClick,
  type,
  classNames = "",
  usage = "primary",
  disabled=false
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${usage == "primary" && "text-lightWhite bg-bunker"} ${
        usage == "secondry" && "text-bunker bg-lightWhite"
      } ${
        usage == "delete" && "text-lightWhite bg-red-600"
      } py-1 px-2 rounded-lg active:scale-[1.01] ${classNames} ${disabled ? "opacity-85 cursor-not-allowed" : "opacity-100"}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
