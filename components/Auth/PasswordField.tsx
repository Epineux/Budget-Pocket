import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

const PasswordField = (props: ControllerRenderProps<FieldValues, string>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex items-center">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className="border-beige-500"
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        type="button"
        className="absolute right-md"
      >
        <Image
          src={
            showPassword
              ? "/assets/images/icon-hide-password.svg"
              : "/assets/images/icon-show-password.svg"
          }
          width={20}
          height={20}
          alt="Show/Hide Password Icon"
          className=" h-[14px] w-auto"
        />
      </button>
    </div>
  );
};

export default PasswordField;
