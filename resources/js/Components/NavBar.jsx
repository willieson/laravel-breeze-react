const Navbar = () => {
return(
    <header className="bg-indigo-500">
        <div className="flex md:flex-row flex-col justify-between p-4 gap-2">
            <a className="font-bold text-white text-2xl" href="/">Anime List</a>
            <input placeholder="Cari anime...." className=""/>
        </div>
    </header>
)
}

export default Navbar
