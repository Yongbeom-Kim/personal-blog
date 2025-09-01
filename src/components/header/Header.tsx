function Header() {
  return (
    <header className="my-16 md:mt-14 md:mb-20 text-left">
      <div className="flex items-center gap-5 md:gap-5">
        <img 
          src="/corgi_circle_compressed.png" 
          alt="Corgi" 
          className="w-20 h-20 md:w-16 sm:w-12 md:h-16 sm:h-12 rounded-full object-cover flex-shrink-0" 
        />
        <div className="flex-1">
          <h1 className="text-5xl md:text-4xl sm:text-3xl font-black m-0 mb-2 tracking-tight leading-tight">
            Yongbeom's Dev Blog
          </h1>
          <p className="text-lg md:text-base m-0 font-normal">
            I write about everything tech (that interests me).
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;