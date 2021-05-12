
const Header = ({title, subTitle}) => {

    return (
        <header className="pb-6 w-full">
            <small className="text-xs text-gray-500">
                {subTitle}
            </small>
            <h1 className="text-3xl text-gray-900">
                {title}
            </h1>
        </header>
    )
}
export default Header