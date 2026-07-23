import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ClientCard } from '../components/ClientCard'
import { describe, it, expect, jest } from '@jest/globals'

jest.mock('@expo/vector-icons', () => {
  return {
    Feather: 'Feather', 
  };
});

describe('ClientCard', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ClientCard clientName="Incorporadora" totalValue={1000} totalMeals={2000} responsibleName="John Doe" onPress={() => {}} />)
    expect(getByText('John Doe')).toBeTruthy()
    expect(getByText('Incorporadora')).toBeTruthy()
    expect(getByText('Valor Total')).toBeTruthy()
    expect(getByText('R$ 1.000,00')).toBeTruthy()
  })

  it('should call function when pressed', () => {
    const onPressMock = jest.fn()
    const { getByText } = render(<ClientCard clientName="Incorporadora" totalValue={1000} totalMeals={2000} responsibleName="John Doe" onPress={onPressMock} />)
    const cardInScreen = getByText('Incorporadora')
    fireEvent.press(cardInScreen)
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should render correctly without responsibleName', () => {
    const { getByText, queryByText } = render(<ClientCard clientName="Incorporadora" totalValue={1000} totalMeals={2000} onPress={() => {}} />)
    expect(getByText('Incorporadora')).toBeTruthy()
    expect(getByText('Valor Total')).toBeTruthy()
    expect(getByText('R$ 1.000,00')).toBeTruthy()
    expect(queryByText('John Doe')).toBeNull()
  })
  
})