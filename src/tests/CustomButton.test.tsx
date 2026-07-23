import React from 'react'
import { fireEvent, render, screen} from '@testing-library/react-native'
import { CustomButton } from '../../src/components/ui/CustomButton'
import { describe, it, expect, jest} from '@jest/globals'

describe('CustomButton', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CustomButton>Test</CustomButton>)
    expect(getByText('Test')).toBeTruthy()
  }),
  it('should call function when pressed', () => {
    const onPressMock = jest.fn()

    render(<CustomButton onPress={onPressMock}>Test</CustomButton>)

    const buttonInScreen = screen.getByText('Test')

    fireEvent.press(buttonInScreen)
    
    expect(onPressMock).toHaveBeenCalled()
  })
})