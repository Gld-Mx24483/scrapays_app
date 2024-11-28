// // src/components/Welcome.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from 'react-native';
// import tw from 'twrnc';
// import Swiper from 'react-native-swiper';
// import LinearGradient from 'react-native-linear-gradient';
// import { useAuth } from '../context/AuthContext';

// const { width, height } = Dimensions.get('window');

// const Welcome: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState(0); 
//   const { login } = useAuth();
  
//   const slides = [
//     require('../assets/images/recycle1.jpg'),
//     require('../assets/images/recycle2.jpg'),
//     require('../assets/images/recycle3.jpg'),
//   ];

//   return (
//     <View style={tw`flex-1 bg-black`}>
//       {/* Background Swiper */}
//       <Swiper
//         loop
//         autoplay
//         autoplayTimeout={5}
//         showsPagination={false}
//         onIndexChanged={(index) => setActiveIndex(index)} 
//       >
//         {slides.map((slide, index) => (
//           <View key={index} style={tw`relative flex-1`}>
//             <Image source={slide} style={tw`w-full h-full`} resizeMode="cover" />
//             <LinearGradient
//               colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 1)']}
//               style={tw`absolute top-0 left-0 right-0 bottom-0`}
//             />
//           </View>
//         ))}
//       </Swiper>
//       {/* Welcome Content */}
//       <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
//         <Text style={tw`text-4xl font-bold text-white mb-4 tracking-wide`}>Welcome</Text>
//         <Text style={tw`text-lg text-white/80 text-center px-8 mb-12`}>
//           Discover a greener future. Together, we can make a difference, one recycling step at a time.
//         </Text>
//         <TouchableOpacity 
//           onPress={login}
//           style={tw`px-8 py-4 border border-cyan-400 rounded-full bg-transparent`}
//         >
//           <Text style={tw`text-cyan-300 text-lg font-semibold tracking-wider`}>Login with Auth0</Text>
//         </TouchableOpacity>
//       </View>
//       {/* Minimalist Dots */}
//       <View style={tw`absolute bottom-12 left-0 right-0 flex-row justify-center items-center`}>
//         {slides.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               tw`w-2.5 h-2.5 rounded-full mx-1`,
//               {
//                 backgroundColor: activeIndex === index ? 'white' : 'rgba(255, 255, 255, 0.3)',
//                 transition: 'background-color 0.5s',
//               },
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// export default Welcome;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import tw from 'twrnc';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0 } from 'react-native-auth0';

const { width, height } = Dimensions.get('window');

const Welcome: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const { authorize } = useAuth0();
  
  const slides = [
    require('../assets/images/recycle1.jpg'),
    require('../assets/images/recycle2.jpg'),
    require('../assets/images/recycle3.jpg'),
  ];

  const login = async () => {
    try {
      await authorize();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      {/* Background Swiper */}
      <Swiper
        loop
        autoplay
        autoplayTimeout={5}
        showsPagination={false}
        onIndexChanged={(index) => setActiveIndex(index)} 
      >
        {slides.map((slide, index) => (
          <View key={index} style={tw`relative flex-1`}>
            <Image source={slide} style={tw`w-full h-full`} resizeMode="cover" />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 1)']}
              style={tw`absolute top-0 left-0 right-0 bottom-0`}
            />
          </View>
        ))}
      </Swiper>
      {/* Welcome Content */}
      <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
        <Text style={tw`text-4xl font-bold text-white mb-4 tracking-wide`}>Welcome</Text>
        <Text style={tw`text-lg text-white/80 text-center px-8 mb-12`}>
          Discover a greener future. Together, we can make a difference, one recycling step at a time.
        </Text>
        <TouchableOpacity 
          onPress={login}
          style={tw`px-8 py-4 border border-cyan-400 rounded-full bg-transparent`}
        >
          <Text style={tw`text-cyan-300 text-lg font-semibold tracking-wider`}>Login with Auth0</Text>
        </TouchableOpacity>
      </View>
      {/* Minimalist Dots */}
      <View style={tw`absolute bottom-12 left-0 right-0 flex-row justify-center items-center`}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              tw`w-2.5 h-2.5 rounded-full mx-1`,
              {
                backgroundColor: activeIndex === index ? 'white' : 'rgba(255, 255, 255, 0.3)',
                transition: 'background-color 0.5s',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Welcome;