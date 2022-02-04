import { Route, Routes } from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage';

const RootRouter: React.FC = () => {
    return (
        <div className='ml-32 w-full'>
            <Routes>
                <Route path={`:project`} element={<ProjectPage />} />
            </Routes>
        </div>
    );
};
export default RootRouter;
