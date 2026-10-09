import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/84813949222"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact HiVOOC on WhatsApp"
      className="group fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#22a80f] text-white shadow-lg transition-all duration-300 hover:w-48 hover:justify-start hover:px-4 focus-visible:w-48 focus-visible:justify-start focus-visible:px-4"
    >
      <Image
        src="/icons/whatsapp.png"
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 shrink-0"
      />
      <span className="w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-auto group-focus-visible:opacity-100">
        WhatsApp
      </span>
    </a>
  );
}
