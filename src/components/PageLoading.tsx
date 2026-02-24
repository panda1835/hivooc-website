import Image from "next/image";

export default function PageLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="h-full w-full rounded-full border-4 border-branding-green/20 border-t-branding-green animate-spin" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="HiVOOC logo"
            width={60}
            height={60}
            priority
          />
        </div>
      </div>
    </div>
  );
}
