
const Header = ({title, subTitle}) => {

    return (
        <header>
            <div className="py-6">
            <small className="text-xs text-gray-500">
                {subTitle}
            </small>
            <h1 className="text-3xl text-gray-900">
                {title}
            </h1>
            </div>
        </header>
    )
}
export default Header