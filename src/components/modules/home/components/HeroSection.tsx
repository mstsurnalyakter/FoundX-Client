
import { SearchIcon } from "@/src/assets/icons";
import { Input } from "@heroui/input";


const HeroSection = () => {
  return (
    <div className="h-[calc(100vh-67px)] bg-[url('/wallet.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="max-w-xl flex-1 p-2 mx-auto">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          placeholder="Search..."
          size="lg"
          startContent={
            <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
          }
          type="text"
        />
      </div>
    </div>
  );
};

export default HeroSection;
