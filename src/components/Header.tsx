interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <div className="overlay"></div>
      <div className="container">
        <div className="header-title text-center">{title}</div>
      </div>
    </header>
  );
};

export default Header;
