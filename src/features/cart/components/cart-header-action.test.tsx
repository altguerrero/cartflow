/**
 * @vitest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CartHeaderAction } from "@/features/cart/components/cart-header-action";
import { CartProvider } from "@/features/cart/context/cart-context";

function renderCartHeaderAction() {
  return render(
    <CartProvider>
      <CartHeaderAction />
    </CartProvider>,
  );
}

describe("CartHeaderAction", () => {
  it("opens and closes the cart drawer from the header trigger", async () => {
    const user = userEvent.setup();

    renderCartHeaderAction();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Open cart with 0 items" }),
      ).not.toBeNull();
    });

    await user.click(
      screen.getByRole("button", { name: "Open cart with 0 items" }),
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Cart" })).not.toBeNull();
    });
    expect(
      screen
        .getByRole("button", { name: "Open cart with 0 items" })
        .getAttribute("aria-expanded"),
    ).toBe("true");

    await user.click(screen.getAllByLabelText("Close cart drawer")[1]);

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Cart" })).toBeNull();
    });
    expect(
      screen
        .getByRole("button", { name: "Open cart with 0 items" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });
});
