import React from "react";
import { shallow, configure } from "enzyme";
import OrderForm from "../orders-form";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

function render(args) {
  return shallow(<OrderForm />);
}

it("does show and error when trying to send empty email", () => {
  const wrapper = render();
  const check = wrapper.find("[data-testid='send-button']").first();
  check.simulate("click");
  expect(wrapper.contains("[data-testid='error-container']"));
});

it("does show and error when trying to send string different from email format", () => {
  const wrapper = render();
  const input = wrapper.find("[data-testid='order-input']").first();
  input.simulate('change', { target: { value: 'Hello' } })
  const check = wrapper.find("[data-testid='send-button']").first();
  check.simulate("click");
  expect(wrapper.contains("[data-testid='error-container']"));
});
