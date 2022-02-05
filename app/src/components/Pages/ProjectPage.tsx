import { Field, Formik } from 'formik';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';
import { SubTitle, Title } from '../Text';

const ProjectPage: React.FC = () => {
    const { project } = useParams();
    const { projectLang, languageSections } = useProject(project ?? '');

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

    const submitLanguageUpdate = (lang: string, values: any) => {
        console.log('submitting', values, lang);
        // http://localhost:5000/projects/bob/lang/de/updateAttribute

        // fetch(
        //     `${process.env.REACT_APP_LANGRY_API}/projects/${project}/lang/${lang}/updateAttribute`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(values),
        //     }
        // );
    };

    return (
        <div className='p-12 '>
            <Title>{project}</Title>
            {/* <pre>{JSON.stringify(projectLang)}</pre> */}
            <div>
                {languageSections.map((languageSection, index) => (
                    <section
                        className='bg-cloud p-6 rounded-xl mb-5'
                        key={`${languageSection.title}${project}${Date.now()}`}>
                        <SubTitle>{languageSection.title}</SubTitle>
                        {formikValues[index] && (
                            <Formik
                                initialValues={formikValues[index]}
                                onSubmit={values =>
                                    submitLanguageUpdate(
                                        languageSection.title,
                                        values
                                    )
                                }>
                                {({ handleSubmit, values, dirty }) => (
                                    <div>
                                        {languageSection.fields.map(field => (
                                            <label
                                                key={`${field[0]}${project}`}
                                                className='flex mb-2 '>
                                                <p className='mr-3 text-space font-bold w-32'>
                                                    {field[0]}
                                                </p>
                                                <Field name={field[0]} />
                                            </label>
                                        ))}

                                        {dirty && (
                                            <button
                                                className='bg-space px-4 py-1 text-cloud rounded-full mt-5'
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
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
