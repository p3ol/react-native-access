// import nock from 'nock';
// import React from 'react';
// import { Text } from 'react-native';
// import { render, wait, fireEvent } from '@testing-library/react-native';
//
// import { AppContext } from '../src/paywall/services/contexts';
// import Widget from '../src/paywall/components/RestrictionWidget';
// import RestrictionWidget from '../src/paywall/components/Widget';
// import PaywallContext from '../src/paywall/components/PaywallContext';
//
// describe('<Widget />', () => {
//
//   it('should render without issues', async () => {
//     nock('https://api.poool.local:8443/api/v3')
//       .post('/access/track')
//       .reply(200, {
//         action: '',
//         styles: {},
//         texts: {},
//         config: {},
//       });
//
//     const context = {
//       setAlternative: alternative => { context.alternative = alternative; },
//       alternative: false,
//     };
//
//     const component = render(
//       <AppContext.Provider value={context}>
//         <Text>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
//         </Text>
//         <Widget />
//       </AppContext.Provider>
//     );
//
//     await wait(() =>
//       expect(component).toReturn()
//     );
//   });
//
// });
