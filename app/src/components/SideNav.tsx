import { Link, NavLink } from 'react-router-dom';
import { useProjectList } from '../hooks/useProjectList';

const SideNav: React.FC = () => {
    const { projects } = useProjectList();
    return (
        <nav
            className='
            flex 
            flex-col
            h-full
            w-32
            pt-12 pl-6
            bg-space
            drop-shadow-3xl
            absolute
            '>
            {projects?.map(project => (
                <NavLink
                    key={project}
                    to={`/${project}`}
                    className={({ isActive }) => `
                    text-xl 
                    font-bold
                    p-3
                    rounded-l-lg
                  
                    ${isActive ? 'text-bab bg-blue' : 'text-baby'}
                    `}>
                    {project}
                </NavLink>
            ))}
        </nav>
    );
};

export default SideNav;
