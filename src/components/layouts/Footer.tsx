const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cyan-950 text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

      {/* Main content */}
      <div className="flex flex-col items-center justify-between px-[clamp(2rem,15vw,15rem)] py-[clamp(2rem,5vw,4rem)] gap-8 text-left sm:items-center lg:flex-row">
        {/* Left zone – Branding */}
        <div>
          <div className="leading-[0.8] uppercase ">
            <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black text-[clamp(2rem,5vw,6rem)]">
              <span className="">t</span>
              he
            </p>
            <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black text-[clamp(2rem,5vw,6rem)]">
              <span className="">m</span>
              ovie
            </p>
            <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black text-[clamp(2rem,5vw,6rem)]">
              <span className="">d</span>
              ata
              <span className="">b</span>
              ase
            </p>
          </div>
        </div>

        {/* Right zone – Info */}
        <div className="flex flex-col items-start sm:items-center">
          <p className="font-bold text-[clamp(0.7rem,0.9vw,0.9rem)]">
            © {currentYear} The Movie Database (TMDB)
          </p>
          <p className="italic font-semibold text-[clamp(0.7rem,0.9vw,0.9rem)] opacity-80 hidden sm:block">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 opacity-40" />
    </footer>
  );
};

export default Footer;
