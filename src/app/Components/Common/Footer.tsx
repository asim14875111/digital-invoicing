export default function Footer() {
  return (
    <div className="w-full bg-[#111828]">
      <div className="flex flex-wrap gap-40 justify-self-center  border-b mb-4 border-gray-500 text-white py-14 px-4">
        <div className="flex flex-col">
          <h2 className="text-4xl">Invox</h2>
          <p className="text-gray-300 text-sm max-w-[290px] pt-4">
            Pakistans leading digital invoicing solution for FBR compliance.
            Trusted by thousands of businesses nationwide.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="fonnt-semibold">Product</h2>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Features</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Pricing</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Integrations</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">API</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="fonnt-semibold">Support</h2>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Help Center</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Documentation</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Tutorials</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Contact Us</p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="fonnt-semibold">Contact</h2>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">Islamabad, Pakistan</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">+92 00 75423434</p>
          <p className="text-gray-300 text-sm hover:text-white cursor-pointer">support@fbrinvoicepro.com</p>
        </div>
      </div>
      <div className="hidden lg:flex justify-self-center gap-160 text-white  pb-14 pt-6 ">
        <div>
          <p className="text-xs text-gray-300">© 2024 FBR Invoice Pro. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <p className="text-xs text-gray-300 hover:text-white cursor-pointer">Privacy Policy</p>
          <p className="text-xs text-gray-300 hover:text-white cursor-pointer">Terms of Service</p>
          <p className="text-xs text-gray-300 hover:text-white cursor-pointer">Cookie Policy</p>
        </div>
      </div>
    </div>
  );
}
