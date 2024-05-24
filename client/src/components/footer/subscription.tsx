import { ChangeEvent, useState } from "react";
import Input from "../reusable/input";
import Button from "../reusable/button";

const Subscription = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleEmailSubmit = (e) => {
    e.prventDefault();
  };
  return (
    <div className="flex flex-col w-full items-start p-2 space-y-1  border-b border-lightWhite pt-2 pb-4 sm:items-center lg:justify-center lg:h-full lg:border-none lg:p-0">
      <p className="text-lg font-semibold">Subscribe</p>
      <p>Get updates as soon as they come</p>
      <form action="#" onSubmit={handleEmailSubmit} className="flex items-center space-x-2">
        <Input
          placeHolder="Email"
          type="email"
          value={email}
          onChnage={handleEmailChange}
        />
        <Button
          content="subscribe"
          type="submit"
          usage="secondry"
        />
      </form>
    </div>
  );
};

export default Subscription;
