const Footer = () => {
  return (
    <div className="bg-[#2269a7] h-50 text-white py-6 font-bodyFont">
      <div className="max-w-7xl mx-auto pl-10 grid grid-cols-3">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-titleFont">Made by Logan Sailer</h2>
          <p className="text-sm tracking-wide hover:text-gray-300 duration-300">
            <a href="https://github.com/logansailer/bookofthemonth">
              Repository
            </a>
          </p>
          <p className="text-sm tracking-wide hover:text-gray-300 duration-300">
            <a href="https://linkedin.com/in/logan-sailer">LinkedIn</a>
          </p>
          <p className="text-sm tracking-wide hover:text-gray-300 duration-300">
            <a href="https://logan-sailer.netlify.app/">Portfolio</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
