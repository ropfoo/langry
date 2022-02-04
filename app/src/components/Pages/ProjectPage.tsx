import { useParams } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';
import { SubTitle, Title } from '../Text';

const ProjectPage: React.FC = () => {
    const { project } = useParams();
    const { projectLang, langueSections } = useProject(project ?? '');

    return (
        <div className='p-12 '>
            <Title>{project}</Title>
            {/* <pre>{JSON.stringify(projectLang)}</pre> */}
            <div>
                {langueSections.map(languageSection => (
                    <section
                        className='bg-cloud p-6 rounded-xl mb-5'
                        key={languageSection.title}>
                        <SubTitle>{languageSection.title}</SubTitle>
                        <div>
                            {languageSection.fields.map(field => (
                                <div key={field[0]} className='flex'>
                                    <p className='mr-3 text-greenpantone'>
                                        {field[0]}
                                    </p>
                                    <p>{field[1]}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
