import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// Import your screens and stacks

const Stack = createStackNavigator()

export default function RootNavigator() {
  return (
    <NavigationContainer>
      {/* Your navigation setup */}
    </NavigationContainer>
  )
}