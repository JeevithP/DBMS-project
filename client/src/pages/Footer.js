// import React from 'react';
// import { Typography ,Con} from '@mui/material';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-4 mt-auto">
//       <Container maxWidth="sm">
//         <Typography variant="body2" align="center">
//           &copy; {new Date().getFullYear()} Activity Points Management System. All Rights Reserved.
//         </Typography>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Typography ,Container} from '@mui/material';
import { useScrollTrigger } from '@mui/material';

const Footer = () => {
  const trigger = useScrollTrigger();

  return (
    <footer className={`bg-gray-800 text-white py-4 ${trigger ? 'expanded' : ''}`}> 
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Activity Points Management System. All Rights Reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;

// Add this CSS to your global styles or a separate CSS file
const styles = {
  '@keyframes expand': {
    '0%': { height: '0px' },
    '100%': { height: '50px' } // Adjust height as needed
  },
  '.expanded': {
    animation: 'expand 0.3s ease-out forwards' 
  }
};