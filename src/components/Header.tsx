import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-400 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl text-black font-bold"> <Link to={'/'}>Plataforma Blogger</Link> </h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-black font-bold hover:bg-gray-700 px-3 py-2 rounded">Inicio</Link>
            </li>
            <li>
              <Link to="/post" className="text-black font-bold hover:bg-gray-700 px-3 py-2 rounded">Post</Link>
            </li>
            <li>
              <Link to="/nosotros" className="text-black font-bold hover:bg-gray-700 px-3 py-2 rounded">Nosotros</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
