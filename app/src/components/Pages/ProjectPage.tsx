import { Field, Formik } from 'formik';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';
import { SubTitle, Title } from '../Text';

const ProjectPage: React.FC = () => {
    const { project } = useParams();
    const { projectLang, languageSections, refetch } = useProject(
        project ?? ''
    );

    const [activeLanguage, setActiveLanguage] = useState(0);

    const getFormikFieldArrays = (sections: any[]) => {
        return sections.map(section =>
            section.fields.reduce((values: any, field: any) => {
                values = {
                    ...values,
                    [field[0]]: field[1],
                };
                return values;
            }, [])
        );
    };

    const formikValues = useMemo(
        () => getFormikFieldArrays(languageSections),
        [languageSections]
    );

    const activeLangSection = languageSections[activeLanguage];

    const submitLanguageUpdate = async (lang: string, values: any) => {
        console.log('submitting', values, lang);
        // http://localhost:5000/projects/bob/lang/de/updateAttribute

        const response = await fetch(
            `${process.env.REACT_APP_LANGRY_API}/projects/${project}/lang/${lang}/updateAttributesMulti`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ attributes: { ...values } }),
            }
        );
        console.log(response.body);
        await refetch();
    };

    return (
        <div className='p-12 '>
            <Title>{project}</Title>
            {/* <pre>{JSON.stringify(projectLang)}</pre> */}
            <nav className='flex items-center mb-12'>
                {languageSections.map((langSection, index) => (
                    <button
                        key={index}
                        className={`
                            mr-2 
                            font-bold
                            transition-all
                            px-3
                            py-2
                            border-2 
                            ${
                                index === activeLanguage
                                    ? 'border-2 border-blue rounded-lg  scale-110'
                                    : 'border-richblack'
                            }
                        `}
                        onClick={() => setActiveLanguage(index)}>
                        {langSection.title}
                    </button>
                ))}
            </nav>

            <div>
                {activeLangSection && (
                    <section
                        className='bg-space p-6 rounded-xl '
                        key={`${
                            activeLangSection.title
                        }${project}${Date.now()}`}>
                        <div className='flex mb-5'>
                            <button>add</button>
                            <input />
                        </div>
                        {formikValues[activeLanguage] && (
                            <Formik
                                initialValues={formikValues[activeLanguage]}
                                onSubmit={values =>
                                    submitLanguageUpdate(
                                        activeLangSection.title,
                                        values
                                    )
                                }>
                                {({ handleSubmit, values, dirty }) => (
                                    <div>
                                        {activeLangSection.fields.map(field => (
                                            <label
                                                key={`${field[0]}${project}`}
                                                className='flex mb-2 '>
                                                <p className='mr-3 text-grey font-bold w-32'>
                                                    {field[0]}
                                                </p>
                                                <Field name={field[0]} />
                                            </label>
                                        ))}

                                        {dirty && (
                                            <button
                                                className='border-2 border-blue px-4 py-1 text-blue rounded-full mt-5'
                                                type='submit'
                                                onClick={() =>
                                                    handleSubmit(values)
                                                }>
                                                save
                                            </button>
                                        )}
                                    </div>
                                )}
                            </Formik>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
