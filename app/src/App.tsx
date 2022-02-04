import RootRouter from './components/RootRouter';
import SideNav from './components/SideNav';

function App() {
    return (
        <div className='flex'>
            <SideNav />
            <RootRouter />
        </div>
    );
}

export default App;
