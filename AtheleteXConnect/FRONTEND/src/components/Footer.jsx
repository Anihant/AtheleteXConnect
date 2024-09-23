import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Copyright Notice</h3>
            <p>© 2024 VNR VJIET Sports Fest. All Rights Reserved.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <p>Email: sports@vnrvjiet.in</p>
            <p>Dr. G. SREE RAMA, Physical Director</p>
            <p>Mobile: +91 9440121314 (10AM to 6PM)</p>
            <p>Address: VNR VJIET, Hyderabad, Telangana, India</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/vnrvjietsports" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaFacebookF size={24} />
              </a>
              <a href="https://www.instagram.com/vnrvjietsports" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;