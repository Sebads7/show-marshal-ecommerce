const Footer = () => {
  return (
    <footer className="mt-16 mb-10 mx-auto px-4 sm;px-6 lg:px-8">
      <div className="border-t border-gray-900/10 sm:mt-20 lg:mt-24">
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
