import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors';
import { Welcome } from '../pages/welcome';
import { User } from '../pages/User';
import {Confirmar} from '../pages/Confirmar';
import {SelectPlantas} from '../pages/SelecionarPlanatas'
import {Salvar} from "../pages/Salvar"

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}>
            <stackRoutes.Screen name="Welcome"
            component={Welcome} />
            <stackRoutes.Screen name="User"
            component={User} />
            <stackRoutes.Screen name="Confirma"
            component={Confirmar} />
            <stackRoutes.Screen name="Plantas"
            component={SelectPlantas} />
             <stackRoutes.Screen name="Salvar"
            component={Salvar} />
        </stackRoutes.Navigator>
)

export default AppRoutes;