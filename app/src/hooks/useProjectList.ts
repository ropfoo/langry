import { useEffect, useState } from 'react';
import { Method, useFetch } from './useFetch';

export function useProjectList() {
    const [projects, setProjects] = useState([]);

    const projectsData = useFetch(
        `${process.env.REACT_APP_LANGRY_API}/projects`,
        Method.GET
    );

    useEffect(() => {
        if (projectsData.data) {
            setProjects(projectsData.data);
        }
    }, [projectsData.data]);

    return { projects };
}
