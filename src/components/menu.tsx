import { NavLink, useLocation } from 'react-router-dom';

export function Menu() {
  const { pathname } = useLocation();
  const routeSelected = pathname;
  console.log('location', location);

  const selectedCss = 'py-2 px-4 rounded-xl bg-amber-500 text-zinc-50';
  return (
    <header>
      <nav className="bg-cyan-900 h-16 flex items-center justify-between px-8 text-zinc-100">
        <h1 className="font-serif tracking-tight">
          Sistema<span className="text-amber-500">.</span>
        </h1>
        <ul className="flex gap-6 font-sans">
          <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl ">
            <NavLink
              to="/"
              className={`${routeSelected === '/' ? selectedCss : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl">
            <NavLink
              to="/connecthub"
              className={`${routeSelected === '/connecthub' ? selectedCss : ''}`}
            >
              ConnectHub
            </NavLink>
          </li>
          <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl">
            <NavLink
              to="/moneyflow"
              className={`${routeSelected === '/moneyflow' ? selectedCss : ''}`}
            >
              MoneyFlow
            </NavLink>
          </li>
          <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl">
            <NavLink
              to="/taskmanager"
              className={`${routeSelected === '/taskmanager' ? selectedCss : ''}`}
            >
              TaskManager
            </NavLink>
          </li>
        
        </ul>
      </nav>
    </header>
  );
}
