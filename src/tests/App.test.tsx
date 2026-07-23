import React from "react";
import { render, screen } from "@testing-library/react-native";
import {Text} from "react-native";
import { describe, it, expect } from '@jest/globals';

describe("App", () => {
  it("should render text correctly", () => {
    render(<Text>Hello, World!</Text>);
    expect(screen.getByText("Hello, World!")).toBeTruthy();
  })
});