import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { UserInfo } from "../checkout/UserInfo"

describe("UserInfo", () => {
  const onClickOrder = jest.fn()
  const onChangeName = jest.fn()
  const onChangePhone = jest.fn()
  const disableOrder = true
  const fullName = ""
  const phone = ""

  it("renders continue shopping link", () => {
    render(
      <UserInfo
        onClickOrder={onClickOrder}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        disableOrder={disableOrder}
        fullName={fullName}
        phone={phone}
      />
    )
    const linkText = screen.getByText("Continue Shopping")
    expect(linkText).toBeInTheDocument()
    expect(linkText.closest("a")).toHaveAttribute("href", "/menu")
  })

  it("renders full name and phone text fields", () => {
    render(
      <UserInfo
        onClickOrder={onClickOrder}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        disableOrder={disableOrder}
        fullName={fullName}
        phone={phone}
      />
    )
    const nameTextField = screen.getByLabelText("Full Name")
    const phoneTextField = screen.getByLabelText("Phone Number")
    expect(nameTextField).toBeInTheDocument()
    expect(phoneTextField).toBeInTheDocument()
  })

  it("renders a disabled button", () => {
    render(
      <UserInfo
        onClickOrder={onClickOrder}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        disableOrder={disableOrder}
        fullName={fullName}
        phone={phone}
      />
    )
    const orderButton = screen.getByRole("button")
    expect(orderButton).toBeDisabled()
  })

  it("renders full name and phone number", () => {
    render(
      <UserInfo
        onClickOrder={onClickOrder}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        disableOrder={disableOrder}
        fullName={"Deeksha"}
        phone={"6316817890"}
      />
    )
    const nameTextField = screen.getByLabelText("Full Name")
    const phoneTextField = screen.getByLabelText("Phone Number")
    expect(nameTextField.value).toBe("Deeksha")
    expect(phoneTextField.value).toBe("6316817890")
  })

  it("renders an enabled button", () => {
    onChangeName.mockImplementation(() => true)
    render(
      <UserInfo
        onClickOrder={onClickOrder}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        disableOrder={false}
        fullName={fullName}
        phone={phone}
      />
    )
    const orderButton = screen.getByRole("button")
    expect(orderButton).not.toBeDisabled()

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "6316817890" },
    })
    screen.debug()

    // expect(screen.getByText("6316817890")).toBeInTheDocument()
  })
})
