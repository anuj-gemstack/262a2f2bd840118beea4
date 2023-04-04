import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AppContext } from '../context';
import ParkingHome, {getLots} from '../screens/ParkingHome';
import ExitParking from '../screens/ExitParking';
import AllocateParking from '../screens/AllocateParking';

jest.mock("@react-navigation/native",()=>{
    const actualNav=jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useNavigation:()=>({
            navigate: jest.fn()
        })
    }
})

const mock = jest.fn()

describe("Parking lot creation",()=>{
    it('should find the testID parking-create-text-input',()=>{
        const testTextName = "parking-create-text-input";
        const {getByTestId} = render(<AppContext.Provider value={{numberOfSlots:"",dispatch:mock}}>
            <ParkingHome setNumOfLots={mock}/>
        </AppContext.Provider>);
        const foundText = getByTestId(testTextName)
        fireEvent.changeText(foundText,"2")
        expect(mock).toHaveBeenCalledWith("ADD_SLOTS",{"slots":"2"})
    })

    it('should find the testID parking-create-submit-button',()=>{
        const testTextName = "parking-create-submit-button";

        const {getByTestId} = render(
        <AppContext.Provider value={{numberOfSlots:"",dispatch:mock}}>
            <ParkingHome setNumOfLots={mock}/>
        </AppContext.Provider>);
        const foundText = getByTestId(testTextName)
        fireEvent.press(foundText,getLots(2,mock()))
        expect(foundText).toBeTruthy()
    })

    test('should find the testID allocate-parking',()=>{
        const testTextName = "allocate-parking";

        const {getByTestId} = render(
        <AppContext.Provider value={{dispatch:mock}}>
            <AllocateParking />
        </AppContext.Provider>);
        const foundText = getByTestId(testTextName)
        fireEvent.press(foundText,mock())
    }) 
})


describe("Parking lot drawing",()=>{
    it('should find the testID parking-drawing-registration-input',()=>{
        const testTextName = "parking-drawing-registration-input";
        const mock = jest.fn()

        const {getByTestId} = render(
        <AppContext.Provider value={{dispatch:mock}}>
            <AllocateParking setRegistraionNumber={mock}/>
        </AppContext.Provider>);
        const foundText = getByTestId(testTextName)
        fireEvent.changeText(foundText,"MP09QE2134")
    })
});

const ExitParkingComponent=(
    <AppContext.Provider value={{dispatch:mock}}>
        <ExitParking />
    </AppContext.Provider>
)

describe("Car deregistration screen",()=>{
    it('should find the testID dederegister-car-registration',()=>{
        const mock = jest.fn()
        const testTextName = "paymentBtn";

        const {getByTestId} = render(ExitParkingComponent);
        const foundText = getByTestId(testTextName)
        fireEvent.press(foundText)
        expect(foundText).toBeTruthy()
    })
});