const Logo = () => {
  return (
    <div className="flex flex-col items-start font-serif p-12 ">
      {/* Pear highlight bar */}
      <div className="bg-pear w-12 h-2 mb-1" />

      {/* Brand Name */}
      <h1 className="text-4xl font-bold font-serif text-slate">CareerCanvas</h1>

      {/* Tagline */}
      <p className="uppercase tracking-widest text-sm mt-1 font-sans text-slate-500">
        Craft Your Career Path
      </p>

    </div>
  );
};

export default Logo;