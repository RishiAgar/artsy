import SortBySelect from './SortBySelect';

const Header = ({ title, total }) => {
    return (
        <>
            <h1 className="text-4xl md:text-5xl mb-12 font-bold tracking-tight text-gray-900">
                {title}
            </h1>

            <div className="flex w-full justify-between items-center mb-4">
                <div className="text-lg font-light text-gray-500">
                    {`Showing ${total} products`}
                </div>

                <SortBySelect />
            </div>
        </>
    );
}

export default Header;
